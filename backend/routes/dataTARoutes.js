const express = require('express');
const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const DataTA = require('../models/dataTAModel.js');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const formData = req.body;

    // Simpan ke database
    const newData = new DataTA(formData);
    await newData.save();

    // Buka template
    const content = fs.readFileSync(path.resolve(__dirname, '../templates/FormDataTA.docx'), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true
    });

    // Isi template dengan data
    doc.setData(formData);
    doc.render();

    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Buat path untuk file sementara
    const outputPath = path.resolve(__dirname, `../generated/Surat_DataTA_${Date.now()}.docx`);
    fs.writeFileSync(outputPath, buffer);

    // Kirim file sebagai download
    res.download(outputPath, 'Surat_Pengantar_Data_TA.docx', (err) => {
      if (err) console.error('Download error:', err);
      // Hapus file setelah dikirim
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error('Gagal proses surat:', err);
    res.status(500).json({ message: 'Gagal memproses surat.' });
  }
});

module.exports = router;
