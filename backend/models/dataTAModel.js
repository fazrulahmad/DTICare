const mongoose = require('mongoose');

const dataTASchema = new mongoose.Schema({
  nrp1: String,
  nama1: String,
  prodi: String,
  fakultas: String,
  semester: String,
  ipk: String,
  jumlah_sks: String,
  nama_mk: String,
  nama_dosen: String,
  judul: String,
  data_yang_diperlukan1: String,
  nama_institusi: String,
  alamat: String,
  tgl_mulai: String,
  tgl_selesai: String,
  catatan: String,
  tanggal_pengajuan: String,
  nama_pengaju: String
}, { timestamps: true });

module.exports = mongoose.model('dataTA', dataTASchema);
