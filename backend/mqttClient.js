const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883'); // ubah ke IP broker jika di-hosting

client.on('connect', () => {
  console.log('✅ MQTT connected to broker');
});

client.on('error', (err) => {
  console.error('❌ MQTT connection error:', err);
});

module.exports = client;
