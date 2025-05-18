const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const DataTA = require('../models/dataTAModel.js');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const formData = req.body;

    // Simpan ke DB
    const newData = new DataTA(formData);
    await newData.save();

    // Load template
    const templatePath = path.resolve(__dirname, '../templates/FormDataTA.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Bersihkan data
    const cleanFormData = { ...formData };
    if (Array.isArray(formData.mahasiswa)) {
      cleanFormData.mahasiswa = formData.mahasiswa.filter(
        (m) => m.nama && m.nrp
      );
    }
    if (Array.isArray(formData.kebutuhanData)) {
      cleanFormData.kebutuhanData = formData.kebutuhanData.filter(
        (item) => item && item.trim() !== ''
      );
    }

    // Generate dokumen
    doc.setData(cleanFormData);
    doc.render();
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    const filename = `Surat_DataTA_${Date.now()}.docx`;
    const outputPath = path.resolve(__dirname, `../generated/${filename}`);
    fs.writeFileSync(outputPath, buffer);

    // Kirim ke Telegram
    const telegramForm = new FormData();
    telegramForm.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    telegramForm.append('document', fs.createReadStream(outputPath));

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      telegramForm,
      { headers: telegramForm.getHeaders() }
    );

    // Kirim ke WhatsApp
    const sock = req.app.get('waSocket'); // Ambil dari app context
    const fileBuffer = fs.readFileSync(outputPath);
    const nomor = formData.nomorWA || process.env.WA_DEFAULT_NUMBER; // Ambil dari input atau fallback

    if (sock && nomor) {
      await sock.sendMessage(`${nomor}@s.whatsapp.net`, {
        document: fileBuffer,
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileName: filename,
      });
    }

    // Kirim ke frontend
    res.download(outputPath, 'Surat_Pengantar_Data_TA.docx', (err) => {
      if (err) console.error('Download error:', err);
      fs.unlinkSync(outputPath); // Hapus file setelah dikirim
    });

  } catch (err) {
    console.error('Gagal proses surat:', err);
    res.status(500).json({ message: 'Gagal memproses surat.' });
  }
});

module.exports = router;
