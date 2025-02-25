const { getFileBufferFromWhatsapp, isQuotedImage, getMediaMessageContent, isQuotedVideo } = require("../utils/media");
const createSticker = require("../utils/createSticker");

module.exports = {
  name: "s",
  description: "Cria uma figurinha.",
  run: async ({ sock, messageFrom, messageInfo, quoted }) => {
    if (isQuotedImage(messageInfo) || isQuotedVideo(messageInfo)) {
      const media = getMediaMessageContent(messageInfo, "video");

      const mediaType = "seconds" in media ? "video" : "image";

      if (mediaType == "video" && media.seconds > 10) {
        return sock.sendMessage(messageFrom, {
          text: "⚠️ o vídeo precisa ser de no máximo 10s.",
        }, { quoted });
      }

      const mediaBuffer = await getFileBufferFromWhatsapp(media, mediaType);

      const stickerBuffer = await createSticker(mediaBuffer, {
        author: "nem te conto"
      })

      sock.sendMessage(messageFrom, { sticker: stickerBuffer }, { quoted })
    }
  },
};
