const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');

let sockInstance = null;
let isReady = false;

const connectWA = async () => {
  try {
    console.log('🔄 Attempting to connect to WhatsApp...');
    
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const { version, isLatest } = await fetchLatestBaileysVersion();
    
    console.log(`Using WA v${version.join('.')}, isLatest: ${isLatest}`);

    const sock = makeWASocket({
      auth: state,
      version,
      printQRInTerminal: true,
      logger: pino({ level: 'silent' }), // Mengurangi log verbose
      browser: ['Ubuntu', 'Chrome', '22.04.4'],
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 0,
      keepAliveIntervalMs: 10000,
      generateHighQualityLinkPreview: true,
      syncFullHistory: false,
      markOnlineOnConnect: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        console.log('📱 Scan QR code above to login');
      }
      
      if (connection === 'close') {
        const reason = lastDisconnect?.error?.output?.statusCode;
        isReady = false;
        sockInstance = null;
        console.log('❌ WA Disconnected. Reason:', reason);
        
        // Handle different disconnect reasons
        if (reason === DisconnectReason.badSession) {
          console.log('🗑️ Bad session file, deleting and restarting...');
          // Optional: Delete auth_info folder and restart
          setTimeout(connectWA, 5000);
        } else if (reason === DisconnectReason.connectionClosed) {
          console.log('🔄 Connection closed, reconnecting...');
          setTimeout(connectWA, 3000);
        } else if (reason === DisconnectReason.connectionLost) {
          console.log('📡 Connection lost, reconnecting...');
          setTimeout(connectWA, 3000);
        } else if (reason === DisconnectReason.connectionReplaced) {
          console.log('🔄 Connection replaced, reconnecting...');
          setTimeout(connectWA, 3000);
        } else if (reason === DisconnectReason.loggedOut) {
          console.log('🔒 Device logged out, please delete auth_info folder and rescan QR.');
          return; // Don't reconnect
        } else if (reason === DisconnectReason.restartRequired) {
          console.log('🔄 Restart required, reconnecting...');
          setTimeout(connectWA, 2000);
        } else if (reason === DisconnectReason.timedOut) {
          console.log('⏱️ Connection timed out, reconnecting...');
          setTimeout(connectWA, 5000);
        } else {
          console.log('🔄 Unknown disconnect reason, attempting reconnect...');
          setTimeout(connectWA, 5000);
        }
      } else if (connection === 'connecting') {
        console.log('🔄 Connecting to WhatsApp...');
        isReady = false;
      } else if (connection === 'open') {
        isReady = true;
        console.log('✅ WhatsApp bot connected successfully!');
        console.log('📱 Bot is ready to send messages');
      }
    });

    // Handle incoming messages (optional)
    sock.ev.on('messages.upsert', ({ messages }) => {
      const msg = messages[0];
      if (!msg.key.fromMe && msg.message) {
        console.log('📨 Received message:', msg.message.conversation || 'Media message');
      }
    });

    // Handle connection errors
    sock.ev.on('connection.error', (error) => {
      console.error('❌ Connection error:', error);
    });

    sockInstance = sock;
    return sock;
  } catch (err) {
    console.error('❌ Failed to connect WhatsApp:', err.message);
    console.log('🔄 Retrying connection in 10 seconds...');
    setTimeout(connectWA, 10000);
  }
};

const getSocket = () => sockInstance;
const isSocketReady = () => isReady;

// Graceful shutdown
process.on('SIGINT', () => {
  if (sockInstance) {
    console.log('🛑 Shutting down WhatsApp connection...');
    sockInstance.end();
  }
  process.exit(0);
});

module.exports = { connectWA, getSocket, isSocketReady };