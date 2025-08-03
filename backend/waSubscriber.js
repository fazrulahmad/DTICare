  const fs = require('fs');
  const mqtt = require('./mqttClient');
  const { getSocket, isSocketReady } = require('./wa');

  const initSubscriber = () => {
    mqtt.on('message', async (topic, message) => {
      if (topic !== 'wa/send') return;

      let payload;
      try {
        payload = JSON.parse(message.toString());
        console.log('📨 Received MQTT message:', payload);
      } catch (err) {
        console.error('❌ Failed to parse MQTT payload:', err);
        return;
      }

      const sock = getSocket();

      if (!sock || !isSocketReady()) {
        console.error('❌ WA socket tidak aktif. Tidak dapat mengirim pesan.');
        console.log('ℹ️ Pastikan WhatsApp sudah terhubung dan QR code sudah di-scan');
        return;
      }

      const number = process.env.WA_DEFAULT_NUMBER;

      if (!number) {
        console.error('❌ WA_DEFAULT_NUMBER tidak ditemukan di .env');
        return;
      }

      // Format nomor WhatsApp
      let formattedNumber = number;
      if (!formattedNumber.startsWith('62')) {
        if (formattedNumber.startsWith('08')) {
          formattedNumber = '62' + formattedNumber.substring(1);
        }
      }

      const jid = `${formattedNumber}@s.whatsapp.net`;
      console.log(`📱 Sending to JID: ${jid}`);

      try {
        // Kirim dokumen
        if (payload.path && payload.filename) {
          if (!fs.existsSync(payload.path)) {
            console.error('❌ File not found:', payload.path);
            return;
          }

          const buffer = fs.readFileSync(payload.path);
          const fileStats = fs.statSync(payload.path);

          console.log(`📄 Sending document: ${payload.filename} (${fileStats.size} bytes)`);

          await sock.sendMessage(jid, {
            document: buffer,
            mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            fileName: payload.filename,
            caption: payload.caption || undefined,
          });

          console.log(`✅ Dokumen berhasil dikirim ke ${formattedNumber}`);

        // Kirim pesan teks
        } else if (payload.message) {
          console.log(`💬 Sending text message: ${payload.message}`);
          console.log('🧪 Socket status:', isSocketReady(), !!sock.sendMessage);

          await sock.sendMessage(jid, {
            text: payload.message
          });

          console.log(`✅ Pesan teks berhasil dikirim ke ${formattedNumber}`);

        // Kirim gambar
        } else if (payload.image) {
          if (!fs.existsSync(payload.image)) {
            console.error('❌ Image file not found:', payload.image);
            return;
          }

          const imageBuffer = fs.readFileSync(payload.image);

          await sock.sendMessage(jid, {
            image: imageBuffer,
            caption: payload.caption || undefined,
          });

          console.log(`🖼️ Gambar berhasil dikirim ke ${formattedNumber}`);

        } else {
          console.warn('⚠️ Payload tidak valid. Harus memiliki message, path+filename, atau image');
          console.log('📝 Contoh format valid:');
          console.log('   - Text: {"message": "Hello World"}');
          console.log('   - Document: {"path": "./file.docx", "filename": "file.docx"}');
          console.log('   - Image: {"image": "./image.jpg", "caption": "Caption opsional"}');
          console.log('📦 Payload saat ini:', payload);
        }

      } catch (err) {
        console.error('❌ Gagal kirim pesan WhatsApp:', err.message);

        if (err.message.includes('not-authorized')) {
          console.log('🔐 Error: Bot tidak memiliki autoritas. Login ulang diperlukan.');
        } else if (err.message.includes('rate-overlimit')) {
          console.log('🚫 Error: Terlalu banyak pengiriman. Coba beberapa saat lagi.');
        } else if (err.message.includes('recipient-not-found')) {
          console.log('👤 Error: Nomor tujuan tidak terdaftar di WhatsApp.');
        }
      }
    });

    mqtt.on('connect', () => {
      mqtt.subscribe('wa/send', (err) => {
        if (err) {
          console.error('❌ Failed to subscribe to wa/send:', err);
        } else {
          console.log('✅ Successfully subscribed to topic: wa/send');
        }
      });
    });

    mqtt.on('error', (error) => {
      console.error('❌ MQTT Error:', error);
    });

    console.log('📡 MQTT WhatsApp subscriber initialized');
  };

  module.exports = initSubscriber;

  initSubscriber();