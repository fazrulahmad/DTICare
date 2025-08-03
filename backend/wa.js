const { 
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion 
} = require('@whiskeysockets/baileys');
const pino = require('pino');

let sockInstance = null;
let isReady = false;

/**
 * Fungsi utama untuk menghubungkan bot ke WhatsApp menggunakan Baileys
 */
const connectWA = async () => {
  try {
    console.log('🔄 Attempting to connect to WhatsApp...');

    // Gunakan file penyimpanan multi-file
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`📦 Using WA version ${version.join('.')}, isLatest: ${isLatest}`);

    const sock = makeWASocket({
      auth: state,
      version,
      printQRInTerminal: true,
      logger: pino({ level: 'silent' }),
      browser: ['Ubuntu', 'Chrome', '22.04.4'],
      connectTimeoutMs: 60000,
      keepAliveIntervalMs: 10000,
      markOnlineOnConnect: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        console.log('📱 Silakan scan QR code di atas untuk login WhatsApp');
      }

      switch (connection) {
        case 'close':
          isReady = false;
          sockInstance = null;
          const reason = lastDisconnect?.error?.output?.statusCode;
          console.log('❌ WhatsApp disconnected. Reason:', reason);

          if (reason === DisconnectReason.loggedOut) {
            console.log('🔒 Anda telah logout. Hapus folder auth_info dan scan ulang QR.');
            return;
          }

          console.log('🔄 Mencoba koneksi ulang dalam 5 detik...');
          setTimeout(connectWA, 5000);
          break;

        case 'open':
          isReady = true;
          console.log('✅ WhatsApp bot connected successfully!');
          break;

        case 'connecting':
          console.log('⏳ Connecting to WhatsApp...');
          isReady = false;
          break;
      }
    });

    sock.ev.on('connection.error', (error) => {
      console.error('❌ Connection error:', error);
    });

    sockInstance = sock;
  } catch (error) {
    console.error('❌ Failed to connect to WhatsApp:', error.message);
    console.log('🔄 Retrying connection in 10 seconds...');
    setTimeout(connectWA, 10000);
  }
};

/**
 * Getter untuk socket instance WhatsApp
 */
const getSocket = () => sockInstance;

/**
 * Mengecek apakah WhatsApp socket sudah siap
 */
const isSocketReady = () => isReady;

// Pastikan koneksi ditutup dengan rapi saat proses dihentikan
process.on('SIGINT', () => {
  if (sockInstance) {
    console.log('🛑 Shutting down WhatsApp connection...');
    sockInstance.end();
  }
  process.exit(0);
});

module.exports = { connectWA, getSocket, isSocketReady };
