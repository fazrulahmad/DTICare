// publisher.js
const mqtt = require('./mqttClient');

const payload = {
  number: '6289601622941', // ubah ke nomor tujuan (format internasional tanpa +)
  message: 'Hello, this is a test message sent from publisher.js via MQTT!'
};

mqtt.publish('wa/send', JSON.stringify(payload), {}, (err) => {
  if (err) {
    console.error('❌ Failed to publish payload:', err);
  } else {
    console.log('✅ Payload published to topic wa/send:', payload);
  }
});
