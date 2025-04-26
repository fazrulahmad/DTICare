const express = require('express');
const router = express.Router();
const Surat = require('../models/peminjamanModel.js');

// Submit surat
router.post('/', async (req, res) => {
  try {
    const newSurat = new Surat(req.body);
    await newSurat.save();
    res.status(201).json(newSurat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get semua surat
router.get('/', async (req, res) => {
  try {
    const suratList = await Surat.find();
    res.json(suratList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
