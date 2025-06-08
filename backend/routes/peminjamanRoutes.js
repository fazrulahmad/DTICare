const express = require('express');
const router = express.Router();
const peminjaman = require('../models/peminjamanModel.js');
const mqttClient = require('../mqttClient');

router.post('/', async (req, res) => {
try {
const data = req.body;
// Simpan ke database
const newPeminjaman = new peminjaman(data);
await newPeminjaman.save();

// Format pesan teks ke WhatsApp
const message = `
📄 Permohonan Peminjaman Barang

📄 Nomor Surat HMIT: ${data.nomorSurat}
📣 Nama Kegiatan: ${data.namaKegiatan}
🏢 Hari/Tanggal: ${data.hariTanggal}
🕒 Pukul: ${data.pukul}\
📍 Tempat: ${data.tempat}

👤 Nama: ${data.namaPengaju}
🎓 NRP: ${data.nrp}
📞 Nomor HP: ${data.nomorHp}

📎 Link Google Drive Surat HMIT: ${data.gdriveLink || 'Tidak ada'}

📨 Dikirim dari sistem peminjaman ruangan
`;
// Kirim ke WhatsApp via MQTT
mqttClient.publish('wa/send', JSON.stringify({
  number: process.env.WA_DEFAULT_NUMBER,
  message,
}));

res.status(201).json({ message: 'Form peminjaman berhasil disimpan dan dikirim ke WhatsApp!' });
} catch (err) {
  console.error('❌ Gagal proses peminjaman:', err);
  res.status(500).json({ message: 'Gagal menyimpan form peminjaman.' });
  }
  });
  
  router.get('/', async (req, res) => {
  try {
  const peminjamanList = await peminjaman.find();
  res.json(peminjamanList);
  } catch (err) {
  res.status(500).json({ message: err.message });
  }
  });
  
  module.exports = router;