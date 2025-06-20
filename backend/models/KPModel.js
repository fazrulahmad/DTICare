const mongoose = require('mongoose');

const kpSchema = new mongoose.Schema({
  // Data Mahasiswa (4 mahasiswa)
  nrp1: { type: String, default: '' }, nama1: { type: String, default: '' }, email1: { type: String, default: '' }, nomer1: { type: String, default: '' }, sks1: { type: String, default: '' },
  nrp2: { type: String, default: '' }, nama2: { type: String, default: '' }, email2: { type: String, default: '' }, nomer2: { type: String, default: '' }, sks2: { type: String, default: '' },
  nrp3: { type: String, default: '' }, nama3: { type: String, default: '' }, email3: { type: String, default: '' }, nomer3: { type: String, default: '' }, sks3: { type: String, default: '' },
  nrp4: { type: String, default: '' }, nama4: { type: String, default: '' }, email4: { type: String, default: '' }, nomer4: { type: String, default: '' }, sks4: { type: String, default: '' },

  // Data Institusi Tujuan
  pejabat: { type: String, required: true },
  jabatan: { type: String, required: true },
  institusi: { type: String, required: true },
  alamat: { type: String, required: true },
  nomertelp: { type: String, default: '' },

  // Periode KP
  rencanaperiode: { type: String, default: '' },
  tanggalmulai: { type: Date, required: true },
  tanggalselesai: { type: Date, required: true },

  // Tanda Tangan Digital
  signature: {
    filename: { type: String, default: '' },
    originalName: { type: String, default: '' },
    path: { type: String, default: '' },
    size: { type: Number, default: '' },
    mimetype: { type: String, default: '' }
  },

  // Informasi Tambahan
  catatan: { type: String, default: '' },
  haripengajuan: { type: String, required: true }, // format dd/mm/yyyy seperti dari Vue
  nama_pengaju: { type: String, required: true },

  // Status pengajuan
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  // Metadata dokumen
  generated_document: {
    filename: { type: String, default: '' },
    path: { type: String, default: '' },
    created_at: { type: Date, default: Date.now }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual: List mahasiswa valid
kpSchema.virtual('mahasiswa_list').get(function () {
  const mahasiswa = [];
  for (let i = 1; i <= 4; i++) {
    const nrp = this[`nrp${i}`];
    const nama = this[`nama${i}`];
    if (nrp?.trim() && nama?.trim()) {
      mahasiswa.push({ no: i, nrp: nrp.trim(), nama: nama.trim() });
    }
  }
  return mahasiswa;
});

// Method: validasi minimal 1 mahasiswa
kpSchema.methods.validateMahasiswa = function () {
  return this.mahasiswa_list.length > 0;
};

// Pre-save middleware
kpSchema.pre('save', function (next) {
  if (!this.validateMahasiswa()) {
    return next(new Error('Minimal 1 mahasiswa harus diisi'));
  }
  if (!this.haripengajuan) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.haripengajuan = `${day}/${month}/${year}`;
  }
  next();
});

// Index untuk optimasi query
kpSchema.index({ nama_pengaju: 1, haripengajuan: -1 });
kpSchema.index({ status: 1 });
kpSchema.index({ createdAt: -1 });

module.exports = mongoose.model('dataKP', kpSchema);
