const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const DataTA = require('../models/dataTAModel');
const axios = require('axios');
const FormData = require('form-data');
const mqttClient = require('../mqttClient');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const formData = req.body;
    const newData = new DataTA(formData);
    await newData.save();

    const templatePath = path.resolve(__dirname, '../templates/FormDataTA.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const cleanFormData = { ...formData };
    if (Array.isArray(formData.mahasiswa)) {
      cleanFormData.mahasiswa = formData.mahasiswa.filter(m => m.nama && m.nrp);
    }
    if (Array.isArray(formData.kebutuhanData)) {
      cleanFormData.kebutuhanData = formData.kebutuhanData.filter(item => item && item.trim() !== '');
    }

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

    // Kirim ke WhatsApp via MQTT
    mqttClient.publish('wa/send', JSON.stringify({
      filename,
      path: outputPath,
      number: process.env.WA_DEFAULT_NUMBER,
      message: 'Dokumen Data TA siap dikirim via WhatsApp'
    }));

    // Kirim file ke frontend dan hapus setelah selesai
    res.download(outputPath, 'Surat_Pengantar_Data_TA.docx', (err) => {
      if (err) {
        console.error('Download error:', err);
      } else {
        console.log('File berhasil diunduh oleh klien.');
      }

      // Tambahkan delay penghapusan untuk memastikan WhatsApp selesai mengakses
      setTimeout(() => {
        if (fs.existsSync(outputPath)) {
          fs.unlink(outputPath, (unlinkErr) => {
            if (unlinkErr) console.error('Gagal menghapus file:', unlinkErr);
            else console.log('File berhasil dihapus.');
          });
        }
      }, 10000); // 10 detik
    });
  } catch (err) {
    console.error('❌ Gagal proses surat:', err);
    res.status(500).json({ message: 'Gagal memproses surat.' });
  }
});

module.exports = router;
