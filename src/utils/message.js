function getMessageText(messageInfo) {
  return (
    Object.values({
      conversation: messageInfo?.message?.conversation,
      imageMessage: messageInfo?.message?.imageMessage?.caption,
      videoMessage: messageInfo?.message?.videoMessage?.caption,
      extendedTextMessage: messageInfo?.message?.extendedTextMessage?.text
    }).find((value) => value?.trim()) || ""
  );
}

module.exports = {
  getMessageText,
};
