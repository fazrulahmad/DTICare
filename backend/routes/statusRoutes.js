const express = require('express');
const router = express.Router();
const Peminjaman = require('../models/peminjamanModel');
const Rekomendasi = require('../models/rekomendasiModel');

// Helper function to build date filter
const buildDateFilter = (start, end) => {
  if (start && end) {
    return {
      tanggalPengajuan: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    };
  }
  return {};
};

// GET semua status surat (dengan optional filter tanggal)
router.get('/', async (req, res) => {
  const { start, end } = req.query;

  try {
    const dateFilter = buildDateFilter(start, end);

    const peminjaman = await Peminjaman.find(dateFilter);
    const rekomendasi = await Rekomendasi.find(dateFilter);

    const semuaStatus = [
      ...peminjaman.map(item => ({
        id: item._id,
        tipe: 'Peminjaman Ruangan',
        nama: item.namaPengaju,
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

// GET status berdasarkan NRP (dengan optional filter tanggal)
router.get('/:nrp', async (req, res) => {
  const { nrp } = req.params;
  const { start, end } = req.query;

  try {
    const dateFilter = buildDateFilter(start, end);

    const peminjaman = await Peminjaman.find({ nrp, ...dateFilter });
    const rekomendasi = await Rekomendasi.find({ nrp, ...dateFilter });

    const statusMahasiswa = [
      ...peminjaman.map(item => ({
        id: item._id,
        tipe: 'Peminjaman Ruangan',
        nama: item.namaPengaju,
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
