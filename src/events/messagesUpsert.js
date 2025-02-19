function messagesUpsert({ messages }) {
  const messageInfo = messages[0];

  if (!messageInfo.message) return;

  console.log(messageInfo);
}

module.exports = messagesUpsert;
