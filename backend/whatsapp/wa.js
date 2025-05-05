// backend/whatsapp/wa.js
const { makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');

let sock;

async function startWA() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      qrcode.generate(qr, { small: true });
    }

    if (connection === 'open') {
      console.log('✅ WhatsApp terhubung!');
    } else if (connection === 'close') {
      console.log('❌ Koneksi terputus. Coba hubungkan ulang...');
      startWA();
    }
  });
}

function getSocket() {
  return sock;
}

module.exports = { startWA, getSocket };
