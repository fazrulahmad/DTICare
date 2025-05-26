const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');

let sockInstance = null;
let isReady = false;

const connectWA = async () => {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");

    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        isReady = false;
        console.log('❌ WA Disconnected. Reason:', reason);

        if (reason !== DisconnectReason.loggedOut) {
          setTimeout(connectWA, 3000);
        } else {
          console.log('🔒 Logged out. Please delete auth_info and rescan QR.');
        }
      } else if (connection === 'open') {
        isReady = true;
        console.log('✅ WhatsApp bot connected!');
      }
    });

    sockInstance = sock;
    return sock;
  } catch (err) {
    console.error('❌ Failed to connect WhatsApp:', err);
  }
};

const getSocket = () => sockInstance;
const isSocketReady = () => isReady;

module.exports = { connectWA, getSocket, isSocketReady };
