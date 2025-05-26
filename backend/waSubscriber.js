const fs = require('fs');
const mqtt = require('./mqttClient');
const { getSocket, isSocketReady } = require('./wa');

const initSubscriber = () => {
  mqtt.on('message', async (topic, message) => {
    if (topic !== 'wa/send') return;

    let payload;
    try {
      payload = JSON.parse(message.toString());
    } catch (err) {
      console.error('❌ Failed to parse MQTT payload:', err);
      return;
    }

    const sock = getSocket();

    if (!sock || !isSocketReady()) {
      console.error('❌ WA socket tidak aktif. Tidak dapat mengirim pesan.');
      return;
    }

    const number = process.env.WA_DEFAULT_NUMBER;
    const jid = `${number}@s.whatsapp.net`;

    try {
      if (payload.path && payload.filename) {
        if (!fs.existsSync(payload.path)) {
          console.error('❌ File not found:', payload.path);
          return;
        }

        const buffer = fs.readFileSync(payload.path);
        await sock.sendMessage(jid, {
          document: buffer,
          mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          fileName: payload.filename,
        });
        console.log(`📄 Dokumen dikirim ke ${number}`);
      } else if (payload.message) {
        await sock.sendMessage(jid, { text: payload.message });
        console.log(`💬 Pesan teks dikirim ke ${number}`);
      } else {
        console.warn('⚠️ Payload tidak valid.');
      }
    } catch (err) {
      console.error('❌ Gagal kirim pesan:', err);
    }
  });

  mqtt.subscribe('wa/send', () => {
    console.log('📡 Subscribed to topic: wa/send');
  });
};

module.exports = initSubscriber;
