const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const DataTA = require('../models/dataTAModel.js');

const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config(); // Load token dan chat ID dari .env

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const formData = req.body;

    // Simpan ke database
    const newData = new DataTA(formData);
    await newData.save();

    // Buka template
    const content = fs.readFileSync(
      path.resolve(__dirname, '../templates/FormDataTA.docx'),
      'binary'
    );
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Pembersihan field kosong
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

    // Isi data ke template
    doc.setData(cleanFormData);
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Path file sementara
    const outputPath = path.resolve(
      __dirname,
      `../generated/Surat_DataTA_${Date.now()}.docx`
    );
    fs.writeFileSync(outputPath, buffer);

    // === Kirim file ke Telegram ===
    const telegramForm = new FormData();
    telegramForm.append('chat_id', process.env.TELEGRAM_CHAT_ID);
    telegramForm.append('document', fs.createReadStream(outputPath));

    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
      telegramForm,
      {
        headers: telegramForm.getHeaders(),
      }
    );

    // === Kirim file ke user frontend ===
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
