onStart: async function ({ message, args, prefix }) {
 const allCommands = global.GoatBot.commands;
 const categories = {};

 const emojiMap = {
  ai: "➥",
  "ai-generated": "➥",
  "ai-image": "➥",
  group: "➥",
  system: "➥",
  fun: "➥",
  owner: "➥",
  config: "➥",
  economy: "➥",
  media: "➥",
  "18+": "➥",
  utility: "➥",
  info: "➥",
  image: "➥",
  game: "➥",
  admin: "➥",
  rank: "➥",
  boxchat: "➥",
  others: "➥",
  other: "➥",
  charting: "➥",
  "contacts admin": "➥",
  custom: "➥",
  entertainment: "➥",
  love: "➥",
  market: "➥",
  music: "➥",
  religion: "➥",
  search: "➥",
  software: "➥",
  tools: "➥",
  tts: "➥",
  uploader: "➥",
  wiki: "➥"
 };

 const categoryNames = {
  admin: "الإدارة",
  ai: "الذكاء الاصطناعي",
  "ai-generated": "مولد بالذكاء الاصطناعي",
  "ai-image": "صور الذكاء الاصطناعي",
  boxchat: "إدارة المجموعة",
  charting: "المخططات",
  config: "الإعدادات",
  "contacts admin": "إدارة التواصل",
  custom: "التخصيص",
  economy: "الاقتصاد",
  entertainment: "الترفيه",
  fun: "التسلية",
  game: "الألعاب",
  group: "المجموعة",
  image: "الصور",
  info: "المعلومات",
  love: "الحب",
  market: "المتجر",
  media: "الوسائط",
  music: "الموسيقى",
  "18+": "للكبار",
  other: "أخرى",
  others: "أخرى",
  owner: "المالك",
  rank: "الرتب",
  religion: "الدين",
  search: "البحث",
  software: "البرامج",
  system: "النظام",
  tools: "الأدوات",
  tts: "تحويل النص إلى صوت",
  uploader: "رفع الملفات",
  utility: "أدوات مساعدة",
  wiki: "الموسوعة"
 };

 const cleanCategoryName = (text) => {
  if (!text) return "others";

  return text
   .normalize("NFKD")
   .replace(/[^\w\s-]/g, "")
   .replace(/\s+/g, " ")
   .trim()
   .toLowerCase();
 };

 for (const [name, cmd] of allCommands) {
  const cat = cleanCategoryName(cmd.config.category);

  if (!categories[cat])
   categories[cat] = [];

  categories[cat].push(cmd.config.name);
 }

 if (args[0]) {
  const query = args[0].toLowerCase();

  const cmd =
   allCommands.get(query) ||
   [...allCommands.values()].find(
    (c) => (c.config.aliases || []).includes(query)
   );

  if (!cmd)
   return message.reply(❌ الأمر "${query}" غير موجود.);

  const {
   name,
   version,
   author,
   guide,
   category,
   shortDescription,
   longDescription,
   aliases
  } = cmd.config;

  const desc =
   typeof longDescription === "string"
    ? longDescription
    : longDescription?.en ||
      shortDescription?.en ||
      shortDescription ||
      "لا يوجد وصف لهذا الأمر";

  const usage =
   typeof guide === "string"
    ? guide.replace(/{pn}/g, prefix)
    : guide?.en?.replace(/{pn}/g, prefix) ||
      ${prefix}${name};

  const requiredRole =
   cmd.config.role !== undefined
    ? cmd.config.role
    : 0;

  const categoryKey = cleanCategoryName(category);

  const translatedCategory =
   categoryNames[categoryKey] ||
   category ||
   "غير مصنف";

  return message.reply(
   ☠️ 𝗠𝗔𝗟𝗨𝗠𝗔𝗧 𝗔𝗟𝗔𝗠𝗥 ☠️\n\n +
   ➥ الاسم: ${name}\n +
   ➥ القسم: ${translatedCategory}\n +
   ➥ الوصف: ${desc}\n +
   ➥ الاختصارات: ${aliases?.length ? aliases.join(", ") : "لا يوجد"}\n +
   ➥ الاستخدام: ${usage}\n +
   ➥ الصلاحية: ${requiredRole}\n +
   ➥ المطور: ${author}\n +
   ➥ الإصدار: ${version}
  );
 }

 const formatCommands = (cmds) =>
  cmds
   .sort()
   .map((cmd) => × ${cmd});

 let msg =
  ━━━☠️ 𝗡𝗲𝗼𝗞𝗘𝗫 𝗔𝗜 ☠️━━━\n;

 const sortedCategories =
  Object.keys(categories).sort();

 for (const cat of sortedCategories) {
  const emoji =
   emojiMap[cat] || "➥";

  const categoryTitle =
   categoryNames[cat] || cat;

  msg +=
   \n╭──『 ${categoryTitle} 』\n;

  msg +=
   ${formatCommands(categories[cat]).join(" ")}\n;

  msg +=
   ╰────────────◊\n;
 }

 msg +=
  \n➥ الاستخدام: ${prefix}help [اسم الأمر] لعرض التفاصيل\n +
  ➥ الاستخدام: ${prefix}callad للتواصل مع مشرفي البوت '_';

 return message.reply(msg);
	 }		for (const cat of sortedCategories) {
			const emoji = emojiMap[cat] || "➥";
			msg += `\n╭──『 ${cat.toUpperCase()} 』\n`; 
			msg += `${formatCommands(categories[cat]).join(' ')}\n`; 
			msg += `╰────────────◊\n`;
		}
		msg += `\n➥ Use: ${prefix}help [command name] for details\n➥Use: ${prefix}callad to talk with bot admins '_'`;

		return message.reply(msg);
	}
};
