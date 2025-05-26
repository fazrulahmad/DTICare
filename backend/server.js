const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const peminjamanRoutes = require('./routes/peminjamanRoutes');
const tugasRoutes = require('./routes/tugasRoutes');
const dataTARoutes = require('./routes/dataTARoutes');
const dataKPRoutes = require('./routes/KPRoutes');

const { connectWA } = require('./wa');
const startWASubscriber = require('./waSubscriber');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/tugas', tugasRoutes);
app.use('/api/dataTA', dataTARoutes);
app.use('/api/dataKP', dataKPRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected!');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  connectWA();
  startWASubscriber();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
