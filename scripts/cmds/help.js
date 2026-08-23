const fs = require("fs-extra");
const path = require("path");
module.exports = {
 config: {
  name: "help",
  aliases: ["menu", "commands"],
  version: "4.8",
  author: "NeoKEX",
  shortDescription: "عرض كل الأوامر المتاحة",
  longDescription: "يعرض قائمة أوامر منظمة حسب الفئة بتصميم مميز.",
  category: "system",
  guide: "{pn}help [اسم الأمر]"
 },
onStart: async function ({ message, args, prefix }) {
 const allCommands = global.GoatBot.commands;
 const categories = {};
 const emojiMap = {
  ai: "➥", "ai-image": "➥", group: "➥", system: "➥",
  fun: "➥", owner: "➥", config: "➥", economy: "➥",
  media: "➥", "18+": "➥", tools: "➥", utility: "➥",
  info: "➥", image: "➥", game: "➥", admin: "➥",
  rank: "➥", boxchat: "➥", others: "➥"
 };
 const cleanCategoryName = (text) => {
  if (!text) return "others";
  return text
   .normalize("NFKD")
   .replace(/\[^\w\s-]/g, "")
   .replace(/\s+/g, " ")
   .trim()
   .toLowerCase();
 };
 for (const [name, cmd] of allCommands) {
  const cat = cleanCategoryName(cmd.config.category);
  if (!categories[cat]) categories[cat] = [];
  categories[cat].push(cmd.config.name);
 }
 if (args[0]) {
  const query = args[0].toLowerCase();
  const cmd =
   allCommands.get(query) ||
   [...allCommands.values()].find((c) => (c.config.aliases || []).includes(query));
  if (!cmd) return message.reply(`❌ الأمر "${query}" غير موجود.`);
  const {
   name,
   version,
   author,
   guide,
   category,
   shortDescription,
   longDescription,
   aliases,
   role 
  } = cmd.config;
  const desc =
   typeof longDescription === "string"
    ? longDescription
    : longDescription?.en || shortDescription?.en || shortDescription || "لا يوجد وصف";
  const usage =
   typeof guide === "string"
    ? guide.replace(/{pn}/g, prefix)
    : guide?.en?.replace(/{pn}/g, prefix) || `${prefix}${name}`;
     const requiredRole = cmd.config.role !== undefined ? cmd.config.role : 0; 
  return message.reply(
   `☠️ 𝗠𝗘𝗟𝗨𝗠𝗔𝗧 𝗔𝗟𝗔𝗠𝗥 ☠️\n\n` +
   `➥ الاسم: ${name}\n` +
   `➥ الفئة: ${category || "بدون تصنيف"}\n` +
   `➥ الوصف: ${desc}\n` +
   `➥ أسماء بديلة: ${aliases?.length ? aliases.join(", ") : "لا يوجد"}\n` +
   `➥ طريقة الاستخدام: ${usage}\n` +
   `➥ الصلاحية المطلوبة: ${requiredRole}\n` + 
   `➥ المطور: ${author}\n` +
   `➥ الإصدار: ${version}`
  );
 }
 const formatCommands = (cmds) =>
  cmds.sort().map((cmd) => `× ${cmd}`);
 let msg = `━━━☠️ 𝗡𝗲𝗼𝗞𝗘𝗫 𝗔𝗜 ☠️━━━\n`;
 const sortedCategories = Object.keys(categories).sort();
 for (const cat of sortedCategories) {
  const emoji = emojiMap[cat] || "➥";
  msg += `\n╭──『 ${cat.toUpperCase()} 』\n`; 
  msg += `${formatCommands(categories[cat]).join(' ')}\n`; 
  msg += `╰────────────◊\n`;
 }
 msg += `\n➥ استخدم: ${prefix}help [اسم الأمر] لمزيد من التفاصيل\n➥ استخدم: ${prefix}callad للتواصل مع إدمن البوت '_'`;
 return message.reply(msg);
}
};
