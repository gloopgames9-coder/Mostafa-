onStart: async function ({ message, args, prefix }) {
    const allCommands = global.GoatBot.commands;
    const categories = {};

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

        if (!categories[cat]) {
            categories[cat] = [];
        }

        categories[cat].push(cmd.config.name);
    }

    // لو المستخدم كتب اسم أمر
    if (args[0]) {
        const query = args[0].toLowerCase();

        const cmd =
            allCommands.get(query) ||
            [...allCommands.values()].find(
                (c) => (c.config.aliases || []).includes(query)
            );

        if (!cmd) {
            return message.reply(
                `❌ الأمر "${query}" غير موجود.`
            );
        }

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
                  `${prefix}${name}`;

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
            `☠️ 𝗠𝗔𝗟𝗨𝗠𝗔𝗧 𝗔𝗟𝗔𝗠𝗥 ☠️

➥ الاسم: ${name}
➥ القسم: ${translatedCategory}
➥ الوصف: ${desc}
➥ الاختصارات: ${aliases?.length ? aliases.join(", ") : "لا يوجد"}
➥ الاستخدام: ${usage}
➥ الصلاحية: ${requiredRole}
➥ المطور: ${author || "غير معروف"}
➥ الإصدار: ${version || "1.0.0"}`
        );
    }

    // تنسيق الأوامر
    const formatCommands = (cmds) =>
        cmds
            .sort()
            .map((cmd) => `× ${cmd}`);

    let msg = `━━━☠️ 𝗡𝗲𝗼𝗞𝗘𝗫 𝗔𝗜 ☠️━━━\n`;

    const sortedCategories =
        Object.keys(categories).sort();

    for (const cat of sortedCategories) {
        const categoryTitle =
            categoryNames[cat] || cat;

        msg += `\n╭──『 ${categoryTitle} 』\n`;

        msg += `${formatCommands(categories[cat]).join(" ")}\n`;

        msg += `╰────────────◊\n`;
    }

    msg += `
➥ الاستخدام: ${prefix}help [اسم الأمر]
➥ الاستخدام: ${prefix}callad للتواصل مع مشرفي البوت '_'`;

    return message.reply(msg);
}
