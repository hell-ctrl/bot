const { getMessageText } = require("../utils/message");
const CommandHandler = require("../utils/CommandHandler");

async function messagesUpsert(sock, { messages }) {
  const messageInfo = messages[0];

  if (!messageInfo.message  || !messageInfo.pushName) return;

  const textOfMessage = getMessageText(messageInfo);
  const messageFrom = messageInfo.key.remoteJid;
  const quoted = messageInfo;
  const isCommand = textOfMessage.startsWith("/");
  const command = isCommand ? textOfMessage.slice(1).split(/ +/).shift().toLowerCase() : null;

 if (isCommand) {
     const commandHandler = new CommandHandler({ sock, messageInfo, messageFrom, quoted });

     commandHandler.execute(command);
  }
}

module.exports = messagesUpsert;
