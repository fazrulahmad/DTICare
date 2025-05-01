const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const peminjamanRoutes = require('./routes/peminjamanRoutes.js');
const rekomendasiRoutes = require('./routes/rekomendasiRoutes.js');
const statusRoutes = require('./routes/statusRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/rekomendasi', rekomendasiRoutes);
app.use('/api/status', statusRoutes); 

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err));
