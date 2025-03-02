const { default: makeWASocket, Browsers, fetchLatestBaileysVersion, useMultiFileAuthState } = require("baileys");
const pino = require("pino");
const NodeCache = require("node-cache");
const readline = require("readline");
const clc = require("cli-color");

const msgRetryCounterCache = new NodeCache();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function connectToWhatsApp() {
  let { state, saveCreds } = await useMultiFileAuthState("./src/connection/auth");
  let { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({level: "silent"}),
    auth: state,
    printQRInTerminal: false,
    mobile: false,
    browser: Browsers.ubuntu("Firefox"), 
    msgRetryCounterCache
  });

  if (!sock.authState.creds.registered) {
    const phoneNumber = await question(`\nDigite seu número do WhatsApp:\nEx: ${clc.bold("559885512460")}\n/> `);
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(`Seu código de conexão é: ${clc.bold(code)}\n`);
    console.log(`Abra seu WhatsApp, vá em ${clc.bold("Aparelhos Conectados > Conectar um novo Aparelho > Conectar usando Número.")}`)
  };

  sock.ev.on("creds.update", saveCreds);

  rl.close();

  return sock;
}

module.exports = connectToWhatsApp;
