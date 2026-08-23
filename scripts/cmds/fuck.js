```js
const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "fak",
    aliases: ["fuck"],
    version: "2.0",
    author: "Neoaz ゐ",
    countDown: 20,
    role: 2,
    shortDescription: "Generate image with tagged users",
    longDescription: "Generate an image using the avatars of mentioned users",
    category: "fun",
    guide: {
      en: "{pn} @tag"
    }
  },

  onStart: async function ({ event, message, usersData }) {
    const mentions = Object.keys(event.mentions || {});

    if (mentions.length === 0) {
      return message.reply("Please mention someone");
    }

    try {
      let one;
      let two;

      if (mentions.length === 1) {
        one = event.senderID;
        two = mentions[0];
      } else {
        one = mentions[1];
        two = mentions[0];
      }

      // Get avatar URLs from GoatBot
      const [avatarOneUrl, avatarTwoUrl] = await Promise.all([
        usersData.getAvatarUrl(one),
        usersData.getAvatarUrl(two)
      ]);

      // Load avatars + template
      const [avatarOne, avatarTwo, baseImage] = await Promise.all([
        loadImage(avatarOneUrl),
        loadImage(avatarTwoUrl),
        loadImage("https://i.ibb.co/YpR7Bpv/image.jpg")
      ]);

      // Create canvas using template size
      const canvas = createCanvas(baseImage.width, baseImage.height);
      const ctx = canvas.getContext("2d");

      // Draw template
      ctx.drawImage(
        baseImage,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Draw circular avatar
      function drawCircleAvatar(avatar, x, y, size) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(
          x + size / 2,
          y + size / 2,
          size / 2,
          0,
          Math.PI * 2
        );

        ctx.closePath();
        ctx.clip();

        ctx.drawImage(
          avatar,
          x,
          y,
          size,
          size
        );

        ctx.restore();
      }

      // Same positions as the old Jimp code
      drawCircleAvatar(avatarOne, 23, 320, 90);
      drawCircleAvatar(avatarTwo, 110, 60, 100);

      // Temporary directory
      const tmpDir = path.join(__dirname, "tmp");
      await fs.ensureDir(tmpDir);

      const filePath = path.join(
        tmpDir,
        `${one}_${two}_${Date.now()}.png`
      );

      // Save image
      await fs.writeFile(
        filePath,
        canvas.toBuffer("image/png")
      );

      // Send image
      await message.reply({
        body: mentions.length === 1
          ? "「 Harder daddy 🥵💦 」"
          : "",
        attachment: fs.createReadStream(filePath)
      });

      // Delete file after 5 seconds
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }, 5000);

    } catch (error) {
      console.error("❌ FAK ERROR:", error);

      return message.reply(
        "❌ Failed to generate the image.\n\n" +
        (error.message || "Unknown error")
      );
    }
  }
};
```
