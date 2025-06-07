const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const DataKP = require('../models/KPModel.js');
const axios = require('axios');
const FormData = require('form-data');
const mqttClient = require('../mqttClient');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
try {
const formData = req.body;
// Simpan ke MongoDB
const newData = new DataKP(formData);
await newData.save();

// Buka template dokumen KP
const templatePath = path.resolve(__dirname, '../templates/formKP.docx');
const content = fs.readFileSync(templatePath, 'binary');
const zip = new PizZip(content);
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});

// Set data dan render dokumen
doc.setData(formData);
doc.render();
const buffer = doc.getZip().generate({ type: 'nodebuffer' });

const fileName = `Surat_Pengajuan_KP_${Date.now()}.docx`;
const outputPath = path.resolve(__dirname, `../generated/${fileName}`);
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

// Kirim ke WhatsApp via MQTT
mqttClient.publish('wa/send', JSON.stringify({
  filename: fileName,
  path: outputPath,
  number: process.env.WA_DEFAULT_NUMBER,
  message: '📎 Surat pengajuan KP dari mahasiswa telah dibuat.',
}));

// Kirim ke frontend & hapus setelah delay
res.download(outputPath, 'Surat_Pengajuan_KP.docx', (err) => {
  if (err) console.error('Download error:', err);

  // Hapus file setelah 10 detik
  setTimeout(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlink(outputPath, (unlinkErr) => {
        if (unlinkErr) console.error('Gagal menghapus file:', unlinkErr);
        else console.log('File KP berhasil dihapus.');
      });
    }
  }, 10000);
});
} catch (err) {
  console.error('❌ Gagal proses surat KP:', err);
  res.status(500).json({ message: 'Gagal memproses surat KP' });
  }
  });
  module.exports = router;

