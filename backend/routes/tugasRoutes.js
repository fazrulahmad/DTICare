const express = require('express');
const router = express.Router();
const Rekomendasi = require('../models/tugasModel');
const mqttClient = require('../mqttClient');

router.post('/', async (req, res) => {
try {
const data = req.body;
// Simpan ke DB
const rekomendasi = new Rekomendasi(data);
await rekomendasi.save();

// Format pesan teks
const message = `
📄 Permohonan Surat Tugas

👤 Nama: ${data.nama}
🎓 NRP: ${data.nrp}
🏫 Prodi: ${data.prodi}

📌 Nama Kegiatan: ${data.namaKegiatan}
🏢 Penyelenggara: ${data.penyelenggaraKegiatan}
📍 Lokasi: ${data.lokasiKegiatan}
📎 Link File Pendukung: ${data.linkFilePendukung || 'Tidak ada'}
`;
// Kirim ke WhatsApp via MQTT
mqttClient.publish('wa/send', JSON.stringify({
  number: process.env.WA_DEFAULT_NUMBER,
  message,
}));

res.status(201).json({ message: 'Form surat tugas berhasil disimpan dan dikirim ke WhatsApp!' });
} catch (error) {
  console.error('❌ Gagal proses surat tugas:', error);
  res.status(500).json({ message: 'Gagal menyimpan form surat tugas.' });
  }
  });
  
  module.exports = router;
