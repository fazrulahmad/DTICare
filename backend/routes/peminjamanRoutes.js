const express = require('express');
const router = express.Router();
const peminjaman = require('../models/peminjamanModel.js');

// Submit peminjaman
router.post('/', async (req, res) => {
  try {
    const newpeminjaman = new peminjaman(req.body);
    await newpeminjaman.save();
    res.status(201).json(newpeminjaman);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get semua peminjaman
router.get('/', async (req, res) => {
  try {
    const peminjamanList = await peminjaman.find();
    res.json(peminjamanList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
