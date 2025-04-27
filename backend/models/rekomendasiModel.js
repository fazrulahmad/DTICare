const mongoose = require('mongoose');

const RekomendasiSchema = new mongoose.Schema({
  nrp: { type: String, required: true },
  nama: { type: String, required: true },
  prodi: { type: String, required: true },
  fakultas: { type: String, required: true },
  semester: { type: String, required: true },
  ipk: { type: String, required: true },
  jumlahSKS: { type: String, required: true },
  namaKegiatan: { type: String, required: true },
  penyelenggaraKegiatan: { type: String, required: true },
  lokasiKegiatan: { type: String, required: true },
  linkFilePendukung: { type: String, required: true },
  tanggalPengajuan: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Rekomendasi', RekomendasiSchema);
