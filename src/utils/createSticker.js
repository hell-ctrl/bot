const fs = require("fs");
const { promisify } = require("util");
const execAsync = promisify(require("child_process").exec);
const addStickerMetaData = require("./addStickerMetaData.js");

async function createSticker(buffer, options) {
  const randomId = `${Math.random().toString(36).substring(2, 10)}`;

  const tempFolderPath = "./src/temp/";
  const inputFile = `${tempFolderPath}${randomId}.webp`;
  const outputFile = `${tempFolderPath}sticker_${randomId}.webp`;

  fs.writeFileSync(inputFile, buffer);

  await execAsync(`ffmpeg -i ${inputFile} -c:v libwebp -filter:v fps=fps=15 -loop 0 -an -lossless 1 -preset default -s 200:200 ${outputFile}`);

  const mediaWithMetaDataPath = await addStickerMetaData(outputFile, {
    packname: options.pack,
    author: options.author
  });
  const stickerBuffer = fs.readFileSync(mediaWithMetaDataPath);

  fs.unlinkSync(inputFile);
  fs.unlinkSync(outputFile);
  fs.unlinkSync(`${tempFolderPath}nsticker.webp`);

  return stickerBuffer;
};

module.exports = createSticker;
