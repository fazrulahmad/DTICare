const mongoose = require('mongoose');

const dataKPSchema = new mongoose.Schema({
  // Mahasiswa 1
  nrp1: { type: String, required: true },
  nama1: { type: String, required: true },
  email1: { type: String, required: true },
  nomer1: { type: String, required: true },
  sks1: { type: String, required: true },

  // Mahasiswa 2 (opsional)
  nrp2: { type: String, default: '' },
  nama2: { type: String, default: '' },
  email2: { type: String, default: '' },
  nomer2: { type: String, default: '' },
  sks2: { type: String, default: '' },

  // Mahasiswa 3 (opsional)
  nrp3: { type: String, default: '' },
  nama3: { type: String, default: '' },
  email3: { type: String, default: '' },
  nomer3: { type: String, default: '' },
  sks3: { type: String, default: '' },

  // Mahasiswa 4 (opsional)
  nrp4: { type: String, default: '' },
  nama4: { type: String, default: '' },
  email4: { type: String, default: '' },
  nomer4: { type: String, default: '' },
  sks4: { type: String, default: '' },

  // Institusi tujuan
  pejabat: { type: String, required: true },
  jabatan: { type: String, required: true },
  institusi: { type: String, required: true },
  alamat: { type: String, required: true },
  nomertelp: { type: String, required: true },

  // Periode & waktu
  rencanaperiode: { type: String, required: true },
  tanggalmulai: { type: String, required: true }, // string karena sudah diformat
  tanggalselesai: { type: String, required: true },

  // Info pengajuan
  catatan: { type: String, default: '' },
  haripengajuan: { type: String, required: true }, // string format dd/mm/yyyy
  nama_pengaju: { type: String, required: true },

  // Tambahan opsional
  image: { type: String, default: '' }

}, { timestamps: true });

module.exports = mongoose.model('dataKP', dataKPSchema);
