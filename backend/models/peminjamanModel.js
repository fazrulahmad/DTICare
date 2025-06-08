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
  gdriveLink: { type: String }, // link ke Google Drive (boleh kosong)

});

module.exports = mongoose.model('Peminjaman', PeminjamanSchema);
