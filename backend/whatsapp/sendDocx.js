// backend/whatsapp/sendDocx.js
const { getSocket } = require('./wa');
const fs = require('fs');
const mime = require('mime-types');

async function sendDocxToWA(number, filePath) {
  const sock = getSocket();
  if (!sock) throw new Error('WhatsApp belum terhubung.');

  const fileBuffer = fs.readFileSync(filePath);
  const mimeType = mime.lookup(filePath);

  const jid = number.includes('@s.whatsapp.net') ? number : `${number}@s.whatsapp.net`;

  await sock.sendMessage(jid, {
    document: fileBuffer,
    fileName: 'Surat_KP.docx',
    mimetype: mimeType,
  });

  console.log(`📤 File terkirim ke ${number}`);
}

module.exports = sendDocxToWA;
