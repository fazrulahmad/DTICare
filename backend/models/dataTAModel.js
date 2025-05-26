// backend/models/dataTAModel.js

const mongoose = require('mongoose');

const dataTASchema = new mongoose.Schema({
  nrp1: { type: String, required: true },
  nama1: { type: String, required: true },
  nrp2: { type: String, default: '' },
  nama2: { type: String, default: '' },
  nrp3: { type: String, default: '' },
  nama3: { type: String, default: ''},
  nrp4: { type: String, default: '' },
  nama4: { type: String, default: '' },
  nrp5: { type: String, default: '' },
  nama5: { type: String, default: '' },
  nama_pejabat: { type: String, required: true },
  nama_jabatan: { type: String, required: true },
  nama_institusi: { type: String, required: true },
  alamat: { type: String, required: true },
  tgl_mulai: { type: Date, required: true }, 
  tgl_selesai: { type: Date, required: true },
  kode: { type: String, required: true },
  nama_mk: { type: String, required: true },
  nama_dosen: { type: String, required: true },
  judul: { type: String, required: true },
  data_yang_diperlukan1: { type: String, required: true },
  data_yang_diperlukan2: { type: String, required: true },
  data_yang_diperlukan3: { type: String, required: true },
  data_yang_diperlukan4: { type: String, required: true },
  data_yang_diperlukan5: { type: String, required: true },
  catatan: { type: String, default: '' },
  tanggal_pengajuan: { type: Date, required: true },
  nama_pengaju: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('dataTA', dataTASchema);
