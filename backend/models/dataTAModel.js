// backend/models/dataTAModel.js

const mongoose = require('mongoose');

const dataTASchema = new mongoose.Schema({
  // Data Mahasiswa (5 mahasiswa, tidak semua wajib diisi)
  nrp1: { type: String, default: '' },
  nama1: { type: String, default: '' },
  nrp2: { type: String, default: '' },
  nama2: { type: String, default: '' },
  nrp3: { type: String, default: '' },
  nama3: { type: String, default: '' },
  nrp4: { type: String, default: '' },
  nama4: { type: String, default: '' },
  nrp5: { type: String, default: '' },
  nama5: { type: String, default: '' },

  // Data Institusi Tujuan (semua wajib)
  nama_pejabat: { type: String, required: true },
  nama_jabatan: { type: String, required: true },
  nama_institusi: { type: String, required: true },
  alamat: { type: String, required: true },

  // Rencana Pengambilan Data/Survei (semua wajib)
  tgl_mulai: { type: Date, required: true }, 
  tgl_selesai: { type: Date, required: true },

  // Mata Kuliah Terkait
  kode: { type: String, required: true },
  nama_mk: { type: String, required: true },
  nama_dosen: { type: String, required: true },
  judul: { type: String, default: '' }, // Tidak wajib, bisa diisi '-'

  // Data yang Diperlukan (5 data, tidak semua wajib)
  data_yang_diperlukan1: { type: String, default: '' },
  data_yang_diperlukan2: { type: String, default: '' },
  data_yang_diperlukan3: { type: String, default: '' },
  data_yang_diperlukan4: { type: String, default: '' },
  data_yang_diperlukan5: { type: String, default: '' },

  // Tanda Tangan Digital
  signature: {
    filename: { type: String, default: '' },
    originalName: { type: String, default: '' },
    path: { type: String, default: '' },
    size: { type: Number, default: 0 },
    mimetype: { type: String, default: '' }
  },

  // Informasi Tambahan
  catatan: { type: String, default: '' }, // Tidak wajib, bisa diisi '-'
  tanggal_pengajuan: { type: Date, required: true },
  nama_pengaju: { type: String, required: true },

  // Status pengajuan (untuk tracking)
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },

  // Metadata file yang dihasilkan
  generated_document: {
    filename: { type: String, default: '' },
    path: { type: String, default: '' },
    created_at: { type: Date, default: Date.now }
  }
}, { 
  timestamps: true,
  // Menambahkan virtual untuk mendapatkan list mahasiswa yang tidak kosong
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual untuk mendapatkan daftar mahasiswa yang valid (tidak kosong)
dataTASchema.virtual('mahasiswa_list').get(function() {
  const mahasiswa = [];
  for (let i = 1; i <= 5; i++) {
    const nrp = this[`nrp${i}`];
    const nama = this[`nama${i}`];
    if (nrp && nrp.trim() !== '' && nama && nama.trim() !== '') {
      mahasiswa.push({
        no: i,
        nrp: nrp.trim(),
        nama: nama.trim()
      });
    }
  }
  return mahasiswa;
});

// Virtual untuk mendapatkan daftar data yang diperlukan (tidak kosong)
dataTASchema.virtual('data_diperlukan_list').get(function() {
  const dataDiperlukan = [];
  for (let i = 1; i <= 5; i++) {
    const data = this[`data_yang_diperlukan${i}`];
    if (data && data.trim() !== '' && data.trim() !== '-') {
      dataDiperlukan.push({
        no: i,
        data: data.trim()
      });
    }
  }
  return dataDiperlukan;
});

// Method untuk validasi minimal 1 mahasiswa harus diisi
dataTASchema.methods.validateMahasiswa = function() {
  for (let i = 1; i <= 5; i++) {
    const nrp = this[`nrp${i}`];
    const nama = this[`nama${i}`];
    if (nrp && nrp.trim() !== '' && nama && nama.trim() !== '') {
      return true; // Minimal 1 mahasiswa valid
    }
  }
  return false;
};

// Method untuk validasi minimal 1 data yang diperlukan harus diisi
dataTASchema.methods.validateDataDiperlukan = function() {
  for (let i = 1; i <= 5; i++) {
    const data = this[`data_yang_diperlukan${i}`];
    if (data && data.trim() !== '' && data.trim() !== '-') {
      return true; // Minimal 1 data diperlukan valid
    }
  }
  return false;
};

// Pre-save middleware untuk validasi custom
dataTASchema.pre('save', function(next) {
  // Validasi minimal 1 mahasiswa
  if (!this.validateMahasiswa()) {
    return next(new Error('Minimal 1 mahasiswa harus diisi'));
  }

  // Validasi minimal 1 data yang diperlukan
  if (!this.validateDataDiperlukan()) {
    return next(new Error('Minimal 1 data yang diperlukan harus diisi'));
  }

  // Normalisasi tanggal pengajuan jika tidak diset
  if (!this.tanggal_pengajuan) {
    this.tanggal_pengajuan = new Date();
  }

  next();
});

// Index untuk optimasi query
dataTASchema.index({ nama_pengaju: 1, tanggal_pengajuan: -1 });
dataTASchema.index({ status: 1 });
dataTASchema.index({ createdAt: -1 });

module.exports = mongoose.model('dataTA', dataTASchema);