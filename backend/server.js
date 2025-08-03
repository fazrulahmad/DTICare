const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const peminjamanRoutes = require('./routes/peminjamanRoutes');
const peminjamanBarangRoutes = require('./routes/PeminjamanBarangRoutes');
const tugasRoutes = require('./routes/tugasRoutes');
const dataTARoutes = require('./routes/dataTARoutes');
const dataKPRoutes = require('./routes/KPRoutes');

const { connectWA } = require('./wa');
const startWASubscriber = require('./waSubscriber');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/peminjaman-barang', peminjamanBarangRoutes);
app.use('/api/tugas', tugasRoutes);
app.use('/api/dataTA', dataTARoutes);
app.use('/api/dataKP', dataKPRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ 
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected!');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 Available endpoints:`);
    console.log(`   - /api/peminjaman (Peminjaman Ruangan)`);
    console.log(`   - /api/peminjaman-barang (Peminjaman Barang)`);
    console.log(`   - /api/tugas (Surat Tugas)`);
    console.log(`   - /api/dataTA (Data TA)`);
    console.log(`   - /api/dataKP (Data KP)`);
    console.log(`   - /api/health (Health Check)`);
  });
  connectWA();
  startWASubscriber();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});