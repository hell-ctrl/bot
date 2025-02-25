module.exports = {
  name: "ping",
  description: "Velocidade do bot.",
  run: ({ sock, messageFrom, quoted }) => {
    sock.sendMessage(messageFrom, { text: "pong" }, { quoted });
  },
};
