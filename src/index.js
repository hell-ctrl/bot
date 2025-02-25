const connectToWhatsApp = require("./connection");
const connectionUpdate = require("./events/connectionUpdate");
const messagesUpsert = require("./events/messagesUpsert");

async function start() {
  const sock = await connectToWhatsApp();

  sock.ev.on("connection.update", update => connectionUpdate(update, start));
  sock.ev.on("messages.upsert", message => messagesUpsert(sock, message));
}

start();
