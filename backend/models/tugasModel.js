const mongoose = require('mongoose');

const RekomendasiSchema = new mongoose.Schema({
  nrp: { type: String, required: true },
  nama: { type: String, required: true },
  prodi: { type: String, required: true },
  namaKegiatan: { type: String, required: true },
  penyelenggaraKegiatan: { type: String, required: true },
  lokasiKegiatan: { type: String, required: true },
  linkFilePendukung: { type: String, required: true },
});

module.exports = mongoose.model('Rekomendasi', RekomendasiSchema);
