const express = require('express');
const router = express.Router();
const peminjamanBarang = require('../models/peminjamanBarangModel.js');
const mqttClient = require('../mqttClient.js');

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    // Simpan ke database
    const newPeminjamanBarang = new peminjamanBarang(data);
    await newPeminjamanBarang.save();

    // Format pesan teks ke WhatsApp
    const message = `
📦 Permohonan Peminjaman Barang

📄 Nomor Surat HMIT: ${data.nomorSurat || 'Tidak ada'}
📣 Nama Kegiatan/Keperluan: ${data.namaKegiatan}
📅 Tanggal Peminjaman: ${data.tanggalPinjam}
📅 Tanggal Pengembalian: ${data.tanggalKembali}
🕒 Waktu Peminjaman: ${data.waktuPinjam}

📦 Barang yang Dipinjam:
${data.daftarBarang}

📍 Tempat Penggunaan: ${data.tempatPenggunaan}

👤 Nama Peminjam: ${data.namaPengaju}
🎓 NRP: ${data.nrp}
📞 Nomor HP: ${data.nomorHp}
👥 Penanggung Jawab: ${data.penanggungJawab}

📎 Link Google Drive Surat HMIT: ${data.gdriveLink || 'Tidak ada'}
✅ Menyetujui S&K: ${data.agreeTnC ? 'Ya' : 'Tidak'}

📨 Dikirim dari sistem peminjaman barang DTI
`;

    // Kirim ke WhatsApp via MQTT
    mqttClient.publish('wa/send', JSON.stringify({
      number: process.env.WA_DEFAULT_NUMBER,
      message,
    }));

    res.status(201).json({ 
      message: 'Form peminjaman barang berhasil disimpan dan dikirim ke WhatsApp!',
      data: newPeminjamanBarang
    });
  } catch (err) {
    console.error('❌ Gagal proses peminjaman barang:', err);
    res.status(500).json({ message: 'Gagal menyimpan form peminjaman barang.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const peminjamanBarangList = await peminjamanBarang.find().sort({ createdAt: -1 });
    res.json(peminjamanBarangList);
  } catch (err) {
    console.error('❌ Gagal mengambil data peminjaman barang:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET specific peminjaman barang by ID
router.get('/:id', async (req, res) => {
  try {
    const peminjamanBarangItem = await peminjamanBarang.findById(req.params.id);
    if (!peminjamanBarangItem) {
      return res.status(404).json({ message: 'Data peminjaman barang tidak ditemukan' });
    }
    res.json(peminjamanBarangItem);
  } catch (err) {
    console.error('❌ Gagal mengambil data peminjaman barang:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT update status peminjaman barang
router.put('/:id/status', async (req, res) => {
  try {
    const { status, catatan } = req.body;
    const updatedPeminjamanBarang = await peminjamanBarang.findByIdAndUpdate(
      req.params.id,
      { 
        status: status,
        catatan: catatan,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedPeminjamanBarang) {
      return res.status(404).json({ message: 'Data peminjaman barang tidak ditemukan' });
    }

    // Kirim notifikasi status update ke WhatsApp
    const statusMessage = `
📦 Update Status Peminjaman Barang

👤 Nama: ${updatedPeminjamanBarang.namaPengaju}
🎓 NRP: ${updatedPeminjamanBarang.nrp}
📣 Kegiatan: ${updatedPeminjamanBarang.namaKegiatan}

🔄 Status: ${status}
📝 Catatan: ${catatan || 'Tidak ada catatan'}

📅 Tanggal Peminjaman: ${updatedPeminjamanBarang.tanggalPinjam}
📅 Tanggal Pengembalian: ${updatedPeminjamanBarang.tanggalKembali}

📦 Barang:
${updatedPeminjamanBarang.daftarBarang}

📨 Update dari sistem peminjaman barang DTI
`;

    mqttClient.publish('wa/send', JSON.stringify({
      number: updatedPeminjamanBarang.nomorHp,
      message: statusMessage,
    }));

    res.json({ 
      message: 'Status peminjaman barang berhasil diupdate',
      data: updatedPeminjamanBarang
    });
  } catch (err) {
    console.error('❌ Gagal update status peminjaman barang:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE peminjaman barang
router.delete('/:id', async (req, res) => {
  try {
    const deletedPeminjamanBarang = await peminjamanBarang.findByIdAndDelete(req.params.id);
    if (!deletedPeminjamanBarang) {
      return res.status(404).json({ message: 'Data peminjaman barang tidak ditemukan' });
    }
    res.json({ 
      message: 'Data peminjaman barang berhasil dihapus',
      data: deletedPeminjamanBarang
    });
  } catch (err) {
    console.error('❌ Gagal menghapus data peminjaman barang:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;