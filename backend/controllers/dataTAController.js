const fs = require('fs');
const path = require('path');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const libre = require('libreoffice-convert');
const Surat = require('../models/Surat');

exports.generateSurveiSurat = async (req, res) => {
  const data = req.body;

  try {
    // Simpan ke MongoDB
    const newSurat = new Surat(data);
    await newSurat.save();

    // Load template .docx
    const content = fs.readFileSync(path.resolve(__dirname, 'DTICare\backend\src\Form data survei.docx'), 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    doc.setData(data);
    doc.render();

    const buf = doc.getZip().generate({ type: 'nodebuffer' });

    // Simpan .docx
    const fileName = `Surat_${data.nrp1}_${Date.now()}`;
    const docxPath = path.resolve(__dirname, `../output/${fileName}.docx`);
    fs.writeFileSync(docxPath, buf);

    // Konversi ke PDF
    const pdfPath = path.resolve(__dirname, `../output/${fileName}.pdf`);
    libre.convert(buf, '.pdf', undefined, (err, done) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Gagal konversi PDF");
      }

      fs.writeFileSync(pdfPath, done);
      res.json({ message: 'Surat berhasil dibuat', file: `/output/${fileName}.pdf` });
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Terjadi kesalahan pada server");
  }
};
