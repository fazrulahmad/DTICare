const mongoose = require('mongoose');

const PeminjamanSchema = new mongoose.Schema({
  nomorSurat: { type: String }, // boleh kosong kalau bukan dari HMIT
  namaKegiatan: { type: String, required: true },
  hariTanggal: { type: String, required: true },
  pukul: { type: String, required: true },
  tempat: { type: String, required: true },
  nrp: { type: String, required: true },
  namaPengaju: { type: String, required: true },
  nomorHp: { type: String, required: true },
  tanggalPengajuan: { type: Date, default: Date.now }, // kapan form diajukan
  status: { type: String, default: 'Pending' }, // default status: Pending
  filePdf: { type: Buffer },                    // isi file PDF sebagai binary buffer
  contentType: { type: String }                 // tipe konten, misalnya 'application/pdf'
});

module.exports = mongoose.model('Peminjaman', PeminjamanSchema);
