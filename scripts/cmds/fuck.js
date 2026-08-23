const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "fak",
    aliases: ["fuck"],
    version: "1.0",
    author: "your name",
    countDown: 20,
    role: 2,
    shortDescription: "",
    longDescription: "",
    category: "nsfw",
    guide: "{pn}"
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length == 0) {
      return message.reply("Please mention someone");
    } else if (mention.length == 1) {
      const one = event.senderID;
      const two = mention[0];
      bal(one, two).then(ptth => {
        message.reply({ body: "「 Harder daddy 🥵💦 」", attachment: fs.createReadStream(ptth) });
      }).catch(error => {
        console.error(error);
        message.reply("Failed to generate the image.");
      });
    } else {
      const one = mention[1];
      const two = mention[0];
      bal(one, two).then(ptth => {
        message.reply({ body: "", attachment: fs.createReadStream(ptth) });
      }).catch(error => {
        console.error(error);
        message.reply("Failed to generate the image.");
      });
    }
  }
};

async function bal(one, two) {
  const avoneResponse = await axios.get(
  `https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=YOUR_TOKEN`,
  { responseType: "arraybuffer" }
);

const avone = await jimp.read(avoneResponse.data);
avone.circle();

const avtwoResponse = await axios.get(
  `https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=YOUR_TOKEN`,
  { responseType: "arraybuffer" }
);

const avtwo = await jimp.read(avtwoResponse.data);
avtwo.circle();

const imgResponse = await axios.get(
  "https://i.ibb.co/YpR7Bpv/image.jpg",
  { responseType: "arraybuffer" }
);

const img = await jimp.read(imgResponse.data);
  const pth = "fucked.png";
  

  img.resize(639, 480).composite(avone.resize(90, 90), 23, 320).composite(avtwo.resize(100, 100), 110, 60);

  await img.writeAsync(pth);
  return pth;
  }
