const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const fs = require('fs');
const P = require('pino');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');

// Import routes
const peminjamanRoutes = require('./routes/peminjamanRoutes.js');
const tugasRoutes = require('./routes/tugasRoutes.js');
const dataTARoutes = require('./routes/dataTARoutes.js');
const dataKPRoutes = require('./routes/KPRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/tugas', tugasRoutes);
app.use('/api/dataTA', dataTARoutes);
app.use('/api/dataKP', dataKPRoutes);

// === WhatsApp Bot Connection ===
let sockGlobal; // supaya bisa diakses di route lain (jika perlu)

const connectWA = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info'); // ini akan membuat folder
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'silent' }),
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('📴 WhatsApp disconnected. Reconnect?', shouldReconnect);
      if (shouldReconnect) connectWA();
    } else if (connection === 'open') {
      console.log('✅ WhatsApp bot connected!');
    }
  });

  sockGlobal = sock; // simpan untuk dipakai di route lain
};

app.set('waSocket', sockGlobal);

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan.' });
});

// === Start Server ===
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB Connected!');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  connectWA(); // Mulai koneksi WA setelah database terkoneksi
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
