const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const DataKP = require('../models/KPModel.js'); 

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const formData = req.body;

    // Simpan ke database MongoDB
    const newData = new DataKP(formData);
    await newData.save();

    // Buka file template form_KP.docx
    const content = fs.readFileSync(
      path.resolve(__dirname, '../templates/formKP.docx'),
      'binary'
    );

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });

    // Isi template Word dengan data dari form
    doc.setData(formData);

    try {
      doc.render();
    } catch (error) {
      console.error('Template rendering error:', error);
      return res.status(500).json({ message: 'Gagal memproses template Word' });
    }

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    const fileName = `Surat_Pengajuan_KP_${Date.now()}.docx`;
    const outputPath = path.resolve(__dirname, `../generated/Surat_KP${Date.now}.docx`);
    fs.writeFileSync(outputPath, buffer);

    // Kirim file ke frontend dan hapus setelah dikirim
    res.download(outputPath, 'Surat_Pengajuan_KP.docx', (err) => {
      if (err) console.error('Download error:', err);
      fs.unlinkSync(outputPath); // hapus file sementara
    });
  } catch (err) {
    console.error('Gagal proses surat:', err);
    res.status(500).json({ message: 'Gagal memproses surat KP' });
  }
});

module.exports = router;
