const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "fak",
    aliases: ["fuck"],
    version: "1.1",
    author: "your name",
    countDown: 20,
    role: 2,
    shortDescription: "NSFW image edit",
    longDescription: "",
    category: "nsfw",
    guide: "{pn} @mention"
  },

  onStart: async function ({ message, event }) {
    const mention = Object.keys(event.mentions);
    
    if (mention.length === 0) {
      return message.reply("يرجى الإشارة إلى شخص ما (@mention)");
    }

    let one, two;
    if (mention.length === 1) {
      one = event.senderID;
      two = mention[0];
    } else {
      one = mention[1];
      two = mention[0];
    }

    const pathImg = path.join(__dirname, `cache_fak_${Date.now()}.png`);

    try {
      await generateImage(one, two, pathImg);
      
      const replyMsg = mention.length === 1 ? "「 Harder daddy 🥵💦 」" : "";
      
      await message.reply({ 
        body: replyMsg, 
        attachment: fs.createReadStream(pathImg) 
      });

      // حذف الملف المؤقت بعد الإرسال للحفاظ على المساحة
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
      message.reply("حدث خطأ أثناء إنشاء الصورة. قد تكون المشكلة من رابط الصورة أو جلب الآفاتار.");
    }
  }
};

async function generateImage(one, two, outputPath) {
  // استخدام رابط عام لجلب صور البروفايل دون الحاجة لتمرير access_token منتهي الصلاحية
  const urlOne = `https://graph.facebook.com/${one}/picture?height=512&width=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const urlTwo = `https://graph.facebook.com/${two}/picture?height=512&width=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

  const [avone, avtwo, background] = await Promise.all([
    jimp.read(urlOne),
    jimp.read(urlTwo),
    jimp.read("https://i.ibb.co/YpR7Bpv/image.jpg")
  ]);

  avone.circle();
  avtwo.circle();

  background
    .resize(639, 480)
    .composite(avone.resize(90, 90), 23, 320)
    .composite(avtwo.resize(100, 100), 110, 60);

  await background.writeAsync(outputPath);
}
