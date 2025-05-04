const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import semua route yang digunakan
const peminjamanRoutes = require('./routes/peminjamanRoutes.js');
const rekomendasiRoutes = require('./routes/rekomendasiRoutes.js');
const statusRoutes = require('./routes/statusRoutes.js');
const dataTARoutes = require('./routes/dataTARoutes.js');
const dataKPRoutes = require('./routes/KPRoutes.js'); // 👉 Tambahan route untuk KP

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/rekomendasi', rekomendasiRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/dataTA', dataTARoutes);
app.use('/api/dataKP', dataKPRoutes); // 👉 Endpoint pengajuan KP

// Fallback route untuk endpoint yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB Connected!');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
