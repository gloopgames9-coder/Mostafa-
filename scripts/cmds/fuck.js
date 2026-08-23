```js
const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

module.exports = {
  config: {
    name: "fak",
    aliases: ["fuck"],
    version: "3.0",
    author: "Neoaz ゐ",
    countDown: 20,
    role: 2,
    shortDescription: "Generate image",
    longDescription: "Generate image using user avatars",
    category: "fun",
    guide: {
      en: "{pn} @tag"
    }
  },

  onStart: async function ({ event, message, usersData }) {
    try {
      const mentions = Object.keys(event.mentions || {});

      console.log("========== FAK DEBUG ==========");
      console.log("Mentions:", mentions);
      console.log("Sender:", event.senderID);

      if (mentions.length === 0) {
        return message.reply("Please mention someone");
      }

      let one;
      let two;

      if (mentions.length === 1) {
        one = event.senderID;
        two = mentions[0];
      } else {
        one = mentions[1];
        two = mentions[0];
      }

      console.log("User 1:", one);
      console.log("User 2:", two);

      // =========================
      // GET AVATAR URLS
      // =========================

      const avatarOneUrl = await usersData.getAvatarUrl(one);
      console.log("Avatar 1:", avatarOneUrl);

      const avatarTwoUrl = await usersData.getAvatarUrl(two);
      console.log("Avatar 2:", avatarTwoUrl);

      if (!avatarOneUrl || !avatarTwoUrl) {
        throw new Error("Failed to get avatar URL");
      }

      // =========================
      // LOAD IMAGES
      // =========================

      console.log("Loading avatar 1...");
      const avatarOne = await loadImage(avatarOneUrl);

      console.log("Loading avatar 2...");
      const avatarTwo = await loadImage(avatarTwoUrl);

      console.log("Loading template...");

      const templateUrl =
        "https://i.ibb.co/YpR7Bpv/image.jpg";

      const baseImage = await loadImage(templateUrl);

      console.log(
        "Template size:",
        baseImage.width,
        "x",
        baseImage.height
      );

      // =========================
      // CANVAS
      // =========================

      const canvas = createCanvas(
        baseImage.width,
        baseImage.height
      );

      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        baseImage,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // =========================
      // CIRCLE AVATAR
      // =========================

      function drawCircleAvatar(
        avatar,
        x,
        y,
        size
      ) {
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

      console.log("Drawing avatars...");

      drawCircleAvatar(
        avatarOne,
        23,
        320,
        90
      );

      drawCircleAvatar(
        avatarTwo,
        110,
        60,
        100
      );

      // =========================
      // SAVE
      // =========================

      const tmpDir = path.join(
        __dirname,
        "tmp"
      );

      await fs.ensureDir(tmpDir);

      const filePath = path.join(
        tmpDir,
        `fak_${Date.now()}.png`
      );

      console.log(
        "Saving:",
        filePath
      );

      const buffer = canvas.toBuffer(
        "image/png"
      );

      await fs.writeFile(
        filePath,
        buffer
      );

      console.log("Image saved successfully!");

      // =========================
      // SEND
      // =========================

      await message.reply({
        body: "「 Harder daddy 🥵💦 」",
        attachment: fs.createReadStream(
          filePath
        )
      });

      console.log("Image sent!");

      // =========================
      // DELETE
      // =========================

      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(
            "Temporary file deleted."
          );
        }
      }, 5000);

    } catch (error) {

      console.error(
        "========== FAK ERROR =========="
      );

      console.error(error);

      console.error(
        "Message:",
        error?.message
      );

      console.error(
        "Stack:",
        error?.stack
      );

      console.error(
        "================================"
      );

      return message.reply(
        "❌ FAK Error: " +
        (error?.message || "Unknown error")
      );
    }
  }
};
```
