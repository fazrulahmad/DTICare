const express = require('express');
const router = express.Router();
const peminjaman = require('../models/peminjamanModel.js');
const path = require('path');
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const libre = require('libreoffice-convert');

// Helper function untuk buat PDF dari .docx
async function generatePdfFromTemplate(data, templatePath) {
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  doc.setData(data);

  try {
    doc.render();
  } catch (err) {
    throw new Error('Error rendering document: ' + err.message);
  }

  const docxBuffer = doc.getZip().generate({ type: 'nodebuffer' });

  // Convert to PDF
  const pdfBuf = await new Promise((resolve, reject) => {
    libre.convert(docxBuffer, '.pdf', undefined, (err, done) => {
      if (err) reject(err);
      else resolve(done);
    });
  });

  return pdfBuf;
}

// Submit peminjaman + generate PDF
router.post('/', async (req, res) => {
  try {
    const { nama, nrp, tanggal, ruangan } = req.body;

    // Buat PDF dari template
    const templatePath = path.join(__dirname, '../templates/peminjaman_template.docx');
    const pdfBuffer = await generatePdfFromTemplate(
      { nama, nrp, tanggal, ruangan },
      templatePath
    );

    const newpeminjaman = new peminjaman({
      nama,
      nrp,
      tanggalPengajuan: tanggal,
      ruangan,
      tipe: 'Peminjaman Ruangan',
      status: false,
      filePdf: pdfBuffer,
      contentType: 'application/pdf'
    });

    await newpeminjaman.save();
    res.status(201).json({ message: 'Surat berhasil diajukan dan PDF disimpan.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get semua peminjaman
router.get('/', async (req, res) => {
  try {
    const peminjamanList = await peminjaman.find().select('-filePdf');
    res.json(peminjamanList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
