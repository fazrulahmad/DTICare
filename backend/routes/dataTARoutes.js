const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const ImageModule = require('docxtemplater-image-module-free'); // Install: npm install docxtemplater-image-module-free
const DataTA = require('../models/dataTAModel');
const axios = require('axios');
const FormData = require('form-data');
const mqttClient = require('../mqttClient');
require('dotenv').config();

const router = express.Router();

// Konfigurasi multer untuk menyimpan file tanda tangan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/signatures');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `signature_${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    // Validasi tipe file
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa gambar'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Fungsi untuk mengkonfigurasi image module
function createImageModule() {
  return new ImageModule({
    centered: false,
    getImage: function(tagValue, tagName) {
      // tagValue berisi path ke file gambar
      if (fs.existsSync(tagValue)) {
        return fs.readFileSync(tagValue);
      }
      return null;
    },
    getSize: function(img, tagValue, tagName) {
      // Ukuran dalam pixels, sesuaikan dengan kebutuhan
      // 2cm x 3.62cm dengan resolusi 96 DPI
      return [76, 76]; // width, height dalam pixels
    }
  });
}

// Endpoint POST dengan upload file signature
router.post('/', upload.single('signature'), async (req, res) => {
  try {
    const formData = req.body;
    let signaturePath = null;

    // Tambahkan path signature ke formData jika ada
    if (req.file) {
      signaturePath = req.file.path;
      formData.signature_path = signaturePath;
    }

    // Simpan ke MongoDB
    const newData = new DataTA(formData);
    await newData.save();

    // Load template Word
    const templatePath = path.resolve(__dirname, '../templates/FormDataTA.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // Konfigurasi Docxtemplater dengan image module
    const imageModule = createImageModule();
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [imageModule]
    });

    // Siapkan data pengganti template
    const renderData = { ...formData };

    // Tambahkan path tanda tangan untuk placeholder {ttd}
    if (signaturePath && fs.existsSync(signaturePath)) {
      renderData.ttd = signaturePath; // Ini akan mengganti placeholder {%ttd} dengan gambar
    } else {
      renderData.ttd = null; // Jika tidak ada tanda tangan
    }

    console.log('📝 Data yang akan dirender:', {
      ...renderData,
      ttd: renderData.ttd ? 'Path ke signature tersedia' : 'Tidak ada signature'
    });

    // Render dokumen
    doc.setData(renderData);
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    const filename = `Surat_DataTA_${Date.now()}.docx`;
    const outputPath = path.resolve(__dirname, `../generated/${filename}`);
    
    // Pastikan folder generated ada
    const generatedDir = path.dirname(outputPath);
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, buffer);
    console.log('✅ Dokumen berhasil dibuat:', filename);

    // Kirim ke Telegram
    try {
      const telegramForm = new FormData();
      telegramForm.append('chat_id', process.env.TELEGRAM_CHAT_ID);
      telegramForm.append('document', fs.createReadStream(outputPath));
      await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
        telegramForm,
        { headers: telegramForm.getHeaders() }
      );
      console.log('✅ Dokumen berhasil dikirim ke Telegram');
    } catch (telegramError) {
      console.error('❌ Gagal kirim ke Telegram:', telegramError.message);
    }

    // Kirim ke WhatsApp via MQTT
    try {
      mqttClient.publish('wa/send', JSON.stringify({
        filename,
        path: outputPath,
        number: process.env.WA_DEFAULT_NUMBER,
        message: '📎 Dokumen Data Survei TA siap dikirim.'
      }));
      console.log('✅ Pesan MQTT berhasil dikirim');
    } catch (mqttError) {
      console.error('❌ Gagal kirim MQTT:', mqttError.message);
    }

    // Kirim ke frontend untuk diunduh
    res.download(outputPath, 'Surat_Pengantar_Data_TA.docx', (err) => {
      if (err) {
        console.error('❌ Download error:', err);
      } else {
        console.log('✅ File berhasil diunduh oleh user');
      }

      // Hapus file signature dan generated setelah 30 detik
      setTimeout(() => {
        // Hapus file generated
        if (fs.existsSync(outputPath)) {
          fs.unlink(outputPath, (unlinkErr) => {
            if (unlinkErr) console.error('❌ Gagal menghapus generated file:', unlinkErr);
            else console.log('✅ Generated file berhasil dihapus');
          });
        }
        
        // Hapus file signature
        if (signaturePath && fs.existsSync(signaturePath)) {
          fs.unlink(signaturePath, (unlinkErr) => {
            if (unlinkErr) console.error('❌ Gagal menghapus signature file:', unlinkErr);
            else console.log('✅ Signature file berhasil dihapus');
          });
        }
      }, 30000);
    });

  } catch (err) {
    console.error('❌ Gagal proses surat:', err);
    
    // Hapus file signature jika ada error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('❌ Gagal menghapus signature file saat error:', unlinkErr);
      });
    }
    
    res.status(500).json({ 
      message: 'Gagal memproses surat.',
      error: err.message 
    });
  }
});

// Endpoint untuk mendapatkan semua data (opsional)
router.get('/', async (req, res) => {
  try {
    const data = await DataTA.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error('❌ Gagal ambil data:', err);
    res.status(500).json({ message: 'Gagal mengambil data.' });
  }
});

module.exports = router;