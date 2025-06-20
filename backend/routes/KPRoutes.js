const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const ImageModule = require('docxtemplater-image-module-free');
const moment = require('moment');
const DataKP = require('../models/KPModel.js');
const axios = require('axios');
const FormData = require('form-data');
const mqttClient = require('../mqttClient');
require('dotenv').config();

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/signatures_kp');
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
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File harus berupa gambar'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

function createImageModule() {
  return new ImageModule({
    centered: false,
    getImage: function(tagValue) {
      if (fs.existsSync(tagValue)) {
        return fs.readFileSync(tagValue);
      }
      return null;
    },
    getSize: function(img, tagValue) {
      return [76, 76];
    }
  });
}

router.post('/', upload.single('signature'), async (req, res) => {
  try {
    const formData = req.body;
    let signaturePath = null;

    if (req.file) {
      signaturePath = req.file.path;
      formData.signature_path = signaturePath;
    }

    const dataToSave = new DataKP({
      ...formData,
      signature: req.file ? {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
      } : {}
    });
    await dataToSave.save();

    const templatePath = path.resolve(__dirname, '../templates/formKP.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const imageModule = createImageModule();

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [imageModule]
    });

    const renderData = {
      ...formData,
      tanggalmulai: moment(dataToSave.tanggalmulai).format('DD MMMM YYYY'),
      tanggalselesai: moment(dataToSave.tanggalselesai).format('DD MMMM YYYY'),
      haripengajuan: dataToSave.haripengajuan,
      ttd: signaturePath && fs.existsSync(signaturePath) ? signaturePath : null
    };

    console.log('📝 Data yang akan dirender:', {
      ...renderData,
      ttd: renderData.ttd ? 'Path ke signature tersedia' : 'Tidak ada signature'
    });

    doc.setData(renderData);
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    const filename = `Surat_Pengajuan_KP_${Date.now()}.docx`;
    const outputPath = path.resolve(__dirname, `../generated/${filename}`);

    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }
    fs.writeFileSync(outputPath, buffer);

    try {
      const telegramForm = new FormData();
      telegramForm.append('chat_id', process.env.TELEGRAM_CHAT_ID);
      telegramForm.append('document', fs.createReadStream(outputPath));
      await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`, telegramForm, {
        headers: telegramForm.getHeaders()
      });
    } catch (telegramError) {
      console.error('❌ Gagal kirim ke Telegram:', telegramError.message);
    }

    try {
      mqttClient.publish('wa/send', JSON.stringify({
        filename,
        path: outputPath,
        number: process.env.WA_DEFAULT_NUMBER,
        message: '📎 Surat pengajuan KP dari mahasiswa telah dibuat.'
      }));
    } catch (mqttError) {
      console.error('❌ Gagal kirim MQTT:', mqttError.message);
    }

    res.download(outputPath, 'Surat_Pengajuan_KP.docx', (err) => {
      if (err) console.error('❌ Download error:', err);
      setTimeout(() => {
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        if (signaturePath && fs.existsSync(signaturePath)) fs.unlinkSync(signaturePath);
      }, 30000);
    });

  } catch (err) {
    console.error('❌ Gagal proses surat KP:', err);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('❌ Gagal menghapus signature file saat error:', unlinkErr);
      });
    }
    res.status(500).json({ message: 'Gagal memproses surat KP', error: err.message });
  }
});

module.exports = router;
