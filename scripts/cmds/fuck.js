const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "fak",
    aliases: ["fuck"],
    version: "1.2",
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

      // تنظيف الملف بعد الإرسال
      if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
      }
    } catch (error) {
      console.error("Fak Command Error:", error);
      if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
      message.reply("فشل جلب أفتار المستخدمين أو رابط الخلفية غير شغال حالياً.");
    }
  }
};

async function generateImage(one, two, outputPath) {
  // استخدام رابط أفتار Facebook المباشر بدون Access Token
  const avatarUrl1 = `https://graph.facebook.com/${one}/picture?height=512&width=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const avatarUrl2 = `https://graph.facebook.com/${two}/picture?height=512&width=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  
  // رابط القالب (الخلفية)
  const templateUrl = "https://i.ibb.co/YpR7Bpv/image.jpg";

  // جلب العناصر مع معالجة الأخطاء لكل عنصر على حدة
  const getJimpImage = async (url) => {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    return await jimp.read(Buffer.from(res.data));
  };

  const [avone, avtwo, background] = await Promise.all([
    getJimpImage(avatarUrl1),
    getJimpImage(avatarUrl2),
    getJimpImage(templateUrl)
  ]);

  avone.circle();
  avtwo.circle();

  background
    .resize(639, 480)
    .composite(avone.resize(90, 90), 23, 320)
    .composite(avtwo.resize(100, 100), 110, 60);

  await background.writeAsync(outputPath);
}
