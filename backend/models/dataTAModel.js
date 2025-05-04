// backend/models/dataTAModel.js

const mongoose = require('mongoose');

const dataTASchema = new mongoose.Schema({
  nrp1: { type: String, required: true },
  nama1: { type: String, required: true },
  nama_pejabat: { type: String, required: true },
  nama_jabatan: { type: String, required: true },
  nama_institusi: { type: String, required: true },
  alamat: { type: String, required: true },
  tgl_mulai: { type: Date, required: true }, // Bisa pakai Date kalau ingin tipe date
  tgl_selesai: { type: Date, required: true },
  kode: { type: String, required: true },
  nama_mk: { type: String, required: true },
  nama_dosen: { type: String, required: true },
  judul: { type: String, required: true },
  data_yang_diperlukan1: { type: String, required: true },
  catatan: { type: String, default: '' },
  tanggal_pengajuan: { type: Date, required: true },
  nama_pengaju: { type: String, required: true },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('dataTA', dataTASchema);
