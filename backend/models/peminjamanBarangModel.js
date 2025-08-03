const mongoose = require('mongoose');

const PeminjamanBarangSchema = new mongoose.Schema({
  nomorSurat: { type: String }, // boleh kosong kalau bukan dari HMIT
  namaKegiatan: { type: String, required: true }, // nama kegiatan/keperluan
  tanggalPinjam: { type: String, required: true }, // tanggal peminjaman
  tanggalKembali: { type: String, required: true }, // tanggal pengembalian
  waktuPinjam: { type: String, required: true }, // waktu peminjaman (contoh: 09:00 - 17:00)
  daftarBarang: { type: String, required: true }, // detail barang yang dipinjam
  tempatPenggunaan: { type: String, required: true }, // tempat penggunaan barang
  nrp: { type: String, required: true },
  namaPengaju: { type: String, required: true },
  nomorHp: { type: String, required: true },
  penanggungJawab: { type: String, required: true }, // penanggung jawab barang
  gdriveLink: { type: String }, // link ke Google Drive (boleh kosong)
  agreeTnC: { type: Boolean, required: true, default: false }, // persetujuan syarat dan ketentuan
  
  // Field tambahan untuk management
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'borrowed', 'returned', 'overdue'],
    default: 'pending' 
  },
  catatan: { type: String }, // catatan dari admin
  approvedBy: { type: String }, // admin yang menyetujui
  approvedAt: { type: Date }, // tanggal persetujuan
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Otomatis menambahkan createdAt dan updatedAt
});

// Index untuk pencarian yang lebih cepat
PeminjamanBarangSchema.index({ nrp: 1 });
PeminjamanBarangSchema.index({ status: 1 });
PeminjamanBarangSchema.index({ tanggalPinjam: 1 });
PeminjamanBarangSchema.index({ createdAt: -1 });

// Virtual untuk durasi peminjaman
PeminjamanBarangSchema.virtual('durasiPeminjaman').get(function() {
  if (this.tanggalPinjam && this.tanggalKembali) {
    const startDate = new Date(this.tanggalPinjam);
    const endDate = new Date(this.tanggalKembali);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  return 0;
});

// Virtual untuk status display
PeminjamanBarangSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    'pending': '⏳ Menunggu Persetujuan',
    'approved': '✅ Disetujui',
    'rejected': '❌ Ditolak',
    'borrowed': '📦 Sedang Dipinjam',
    'returned': '✅ Sudah Dikembalikan',
    'overdue': '⚠️ Terlambat'
  };
  return statusMap[this.status] || this.status;
});

// Method untuk update status
PeminjamanBarangSchema.methods.updateStatus = function(newStatus, adminName, catatan) {
  this.status = newStatus;
  this.catatan = catatan;
  this.updatedAt = new Date();
  
  if (newStatus === 'approved') {
    this.approvedBy = adminName;
    this.approvedAt = new Date();
  }
  
  return this.save();
};

// Static method untuk mencari berdasarkan NRP
PeminjamanBarangSchema.statics.findByNRP = function(nrp) {
  return this.find({ nrp: nrp }).sort({ createdAt: -1 });
};

// Static method untuk mencari berdasarkan status
PeminjamanBarangSchema.statics.findByStatus = function(status) {
  return this.find({ status: status }).sort({ createdAt: -1 });
};

// Static method untuk mencari peminjaman aktif
PeminjamanBarangSchema.statics.findActiveBorrows = function() {
  return this.find({ 
    status: { $in: ['approved', 'borrowed'] }
  }).sort({ tanggalPinjam: 1 });
};

// Pre-save middleware untuk update timestamp
PeminjamanBarangSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Pre-save middleware untuk validasi tanggal
PeminjamanBarangSchema.pre('save', function(next) {
  if (this.tanggalPinjam && this.tanggalKembali) {
    const startDate = new Date(this.tanggalPinjam);
    const endDate = new Date(this.tanggalKembali);
    
    if (endDate <= startDate) {
      return next(new Error('Tanggal pengembalian harus setelah tanggal peminjaman'));
    }
    
    // Validasi maksimal 7 hari
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 7) {
      return next(new Error('Maksimal peminjaman adalah 7 hari'));
    }
  }
  next();
});

module.exports = mongoose.model('PeminjamanBarang', PeminjamanBarangSchema);