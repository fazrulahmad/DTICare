const express = require('express');
const router = express.Router();
const Peminjaman = require('../models/peminjamanModel');
const Rekomendasi = require('../models/rekomendasiModel');

// GET semua status surat
router.get('/', async (req, res) => {
  try {
    const peminjaman = await Peminjaman.find();
    const rekomendasi = await Rekomendasi.find();

    const semuaStatus = [
      ...peminjaman.map(item => ({
        id: item._id,
        tipe: 'Peminjaman Ruangan',
        nama: item.nama,
        nrp: item.nrp,
        status: item.status,
        tanggalPengajuan: item.tanggalPengajuan
      })),
      ...rekomendasi.map(item => ({
        id: item._id,
        tipe: 'Surat Rekomendasi',
        nama: item.nama,
        nrp: item.nrp,
        status: item.status,
        tanggalPengajuan: item.tanggalPengajuan
      }))
    ];

    res.json(semuaStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data status.' });
  }
});

// GET status berdasarkan NRP
router.get('/:nrp', async (req, res) => {
  const { nrp } = req.params;
  try {
    const peminjaman = await Peminjaman.find({ nrp });
    const rekomendasi = await Rekomendasi.find({ nrp });

    const statusMahasiswa = [
      ...peminjaman.map(item => ({
        id: item._id,
        tipe: 'Peminjaman Ruangan',
        nama: item.nama,
        nrp: item.nrp,
        status: item.status,
        tanggalPengajuan: item.tanggalPengajuan
      })),
      ...rekomendasi.map(item => ({
        id: item._id,
        tipe: 'Surat Rekomendasi',
        nama: item.nama,
        nrp: item.nrp,
        status: item.status,
        tanggalPengajuan: item.tanggalPengajuan
      }))
    ];

    res.json(statusMahasiswa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil status mahasiswa.' });
  }
});

// PUT update status surat berdasarkan ID dan tipe
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { tipe, status } = req.body;

  try {
    let updated;
    if (tipe === 'Peminjaman Ruangan') {
      updated = await Peminjaman.findByIdAndUpdate(id, { status }, { new: true });
    } else if (tipe === 'Surat Rekomendasi') {
      updated = await Rekomendasi.findByIdAndUpdate(id, { status }, { new: true });
    } else {
      return res.status(400).json({ message: 'Tipe surat tidak dikenali.' });
    }

    if (!updated) {
      return res.status(404).json({ message: 'Data tidak ditemukan.' });
    }

    res.json({ message: 'Status berhasil diperbarui.', data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memperbarui status surat.' });
  }
});

module.exports = router;
