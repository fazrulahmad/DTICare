const express = require('express');
const router = express.Router();
const Rekomendasi = require('../models/tugasModel');

// Endpoint untuk mengirim form rekomendasi
router.post('/', async (req, res) => {
  try {
    const rekomendasi = new Rekomendasi(req.body);
    await rekomendasi.save();
    res.status(201).json({ message: 'Form surat tugas berhasil disimpan!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menyimpan form rekomendasi.' });
  }
});

// Endpoint untuk melihat semua form rekomendasi
router.get('/', async (req, res) => {
  try {
    const rekomendasi = await Rekomendasi.find();
    res.status(200).json(rekomendasi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data surat tugas.' });
  }
});

module.exports = router;
