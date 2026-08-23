module.exports = {
    config: {
        name: "help",
        aliases: ["menu", "commands"],
        version: "5.0",
        author: "NeoKEX",
        shortDescription: "عرض جميع الأوامر",
        longDescription: "عرض جميع أوامر البوت بشكل منظم حسب الأقسام.",
        category: "system",
        guide: "{pn}help [اسم الأمر]"
    },

    onStart: async function ({ message, args, prefix }) {

        const allCommands = global.GoatBot.commands;
        const categories = {};

        // =========================
        // أسماء الأقسام بالعربي
        // =========================

        const categoryNames = {
            admin: "الإدارة",
            ai: "الذكاء الاصطناعي",
            "ai-generated": "مولدات الذكاء الاصطناعي",
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
            nsfw: "للكبار",
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

        // =========================
        // أسماء الأوامر بالعربي
        // =========================

        const commandNames = {

            // الإدارة
            delete: "حذف",

            // الذكاء الاصطناعي
            ai: "ذكاء",
            animate: "تحريك",
            edit: "تعديل",
            genx: "توليد",
            gpt: "جي بي تي",
            meta: "ميتا",
            pi: "باي",
            prompt: "برومبت",

            // مولدات الذكاء الاصطناعي
            nijix: "نيجيكس",

            // صور الذكاء الاصطناعي
            art: "رسم",
            dalle3: "دال إي",
            imagen4: "إيماجن",
            supanime: "سوب أنمي",

            // إدارة المجموعة
            adduser: "إضافة عضو",
            admin: "المشرفين",
            all: "الكل",
            antichangeinfobox: "منع تغيير معلومات المجموعة",
            autosetname: "الاسم التلقائي",
            badwords: "الكلمات الممنوعة",
            busy: "مشغول",
            count: "العدد",
            filteruser: "فلترة الأعضاء",
            gcinfo: "معلومات المجموعة",
            kick: "طرد",
            onlyadminbox: "للمشرفين فقط",
            refresh: "تحديث",
            rules: "القوانين",
            sendnoti: "إرسال إشعار",
            setname: "تغيير الاسم",
            theme: "المظهر",
            unsend: "حذف رسالة",
            warn: "تحذير",

            // المخططات
            bby: "بي بي واي",

            // الإعدادات
            prefix: "البادئة",
            setalias: "تغيير الاختصار",

            // التواصل
            callad: "التواصل مع الإدارة",

            // التخصيص
            setleave: "رسالة المغادرة",
            setwelcome: "رسالة الترحيب",
            shortcut: "اختصار",

            // الاقتصاد
            balancec: "الرصيد",
            bank: "البنك",

            // الترفيه
            anime: "أنمي",

            // التسلية
            anisearch: "بحث أنمي",
            bro: "برو",
            bro2: "برو 2",
            emojimix: "دمج الإيموجي",
            fakechat: "محادثة وهمية",
            pet: "الحيوان الأليف",
            punch: "لكمة",
            rps: "حجر ورق مقص",
            sala: "سالا",
            spank: "صفعة",

            // الألعاب
            coc: "كلاش",
            coinflip: "رمي العملة",
            colorpick: "اختيار اللون",
            daily: "اليومي",
            dhbc: "دي إتش بي سي",
            guessnumber: "تخمين الرقم",
            maze: "المتاهة",
            ttt: "إكس أو",

            // المجموعة
            autonick: "الاسم التلقائي",

            // الصور
            "4k": "تحسين 4K",
            "4o": "4O",
            aiphoto: "صورة بالذكاء الاصطناعي",
            avatar: "الصورة الشخصية",
            moon: "القمر",
            sorthelp: "ترتيب المساعدة",

            // المعلومات
            grouptag: "منشن المجموعة",
            setrole: "تعيين الرتبة",
            texttoimage: "تحويل النص لصورة",
            tid: "معرف المحادثة",
            uid: "معرف المستخدم",

            // الحب
            pair: "الثنائي",
            pair2: "الثنائي 2",

            // المتجر
            goatstore: "متجر Goat",

            // الوسائط
            autodl: "تحميل تلقائي",
            sing: "غناء",
            tiktok: "تيك توك",
            ytb: "يوتيوب",

            // الموسيقى
            lyrics: "كلمات الأغنية",

            // للكبار
            fak: "فاك",

            // أخرى
            weather: "الطقس",

            // المالك
            adminonly: "للمالك فقط",
            backupdata: "نسخ احتياطي",
            cmd: "الأوامر",
            developer: "المطور",
            eval: "تنفيذ كود",
            event: "الأحداث",
            getfbstate: "حالة فيسبوك",
            hubble: "هبل",
            ignoreonlyad: "تجاهل الإدارة فقط",
            ignoreonlyadbox: "تجاهل إدارة المجموعة",
            jsontomongodb: "JSON إلى MongoDB",
            jsontosqlite: "JSON إلى SQLite",
            loadconfig: "تحميل الإعدادات",
            notification: "الإشعارات",
            premium: "المميز",
            restart: "إعادة التشغيل",
            savetext: "حفظ النص",
            setavt: "تغيير الصورة",
            setlang: "تغيير اللغة",
            setrankup: "رسالة ترقية الرتبة",
            shell: "الأوامر الطرفية",
            spamban: "حظر السبام",
            thread: "المحادثة",
            update: "تحديث البوت",
            user: "المستخدم",
            whitelist: "القائمة البيضاء",

            // الرتب
            customrankcard: "بطاقة رتبة مخصصة",
            rank: "الرتبة",
            rankup: "ترقية الرتبة",

            // الدين
            ramadan: "رمضان",

            // البحث
            pin: "بحث Pinterest",

            // البرامج
            appstore: "متجر التطبيقات",

            // النظام
            account: "الحساب",
            file: "الملفات",
            fork: "Fork",
            help: "المساعدة",
            perf: "الأداء",
            stats: "الإحصائيات",
            uptime: "وقت التشغيل",

            // الأدوات
            screenshot: "لقطة شاشة",

            // تحويل النص لصوت
            say: "تحويل النص لصوت",

            // رفع الملفات
            imgbb: "رفع صورة",

            // الأدوات المساعدة
            accept: "قبول",
            acpme: "ACPME",
            cpanel: "لوحة التحكم",
            numlookup: "البحث عن رقم",
            pending: "الطلبات المعلقة",
            pfp: "الصورة الشخصية",
            rbg: "الخلفية",
            translate: "الترجمة",

            // الموسوعة
            emojimean: "معنى الإيموجي"
        };


        const arabicToCommand = {};

for (const [command, arabicName] of Object.entries(commandNames)) {
    arabicToCommand[arabicName.toLowerCase()] = command;
}
        // =========================
        // تنظيف اسم القسم
        // =========================

        const cleanCategoryName = (text) => {
            if (!text)
                return "others";

            return String(text)
                .normalize("NFKD")
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();
        };

        // =========================
        // تجميع الأوامر حسب القسم
        // =========================

        for (const [name, cmd] of allCommands) {

            if (!cmd || !cmd.config)
                continue;

            const cat =
                cleanCategoryName(cmd.config.category);

            if (!categories[cat])
                categories[cat] = [];

            categories[cat].push(
                cmd.config.name
            );
        }

        // =========================
        // عرض تفاصيل أمر معين
        // =========================

      if (args[0]) {

    let query = args[0].toLowerCase();

    // لو المستخدم كتب الاسم العربي
    if (arabicToCommand[query]) {
        query = arabicToCommand[query];
    }

    const cmd =
        allCommands.get(query) ||
        [...allCommands.values()].find(
            (c) =>
                (c.config.aliases || [])
                    .map(a => a.toLowerCase())
                    .includes(query)
        );

    if (!cmd) {
        return message.reply(
            `❌ الأمر "${args[0]}" غير موجود`
        );
    }

    // باقي الكود...
}

            if (!cmd) {
                return message.reply(
                    `❌ الأمر "${query}" غير موجود`
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
                    : longDescription?.ar ||
                      longDescription?.en ||
                      shortDescription?.ar ||
                      shortDescription?.en ||
                      shortDescription ||
                      "لا يوجد وصف لهذا الأمر";

            const usage =
                typeof guide === "string"
                    ? guide.replace(
                        /{pn}/g,
                        prefix
                    )
                    : guide?.ar?.replace(
                        /{pn}/g,
                        prefix
                    ) ||
                      guide?.en?.replace(
                        /{pn}/g,
                        prefix
                    ) ||
                      `${prefix}${name}`;

            const requiredRole =
                cmd.config.role !== undefined
                    ? cmd.config.role
                    : 0;

            const categoryKey =
                cleanCategoryName(category);

            const translatedCategory =
                categoryNames[categoryKey] ||
                category ||
                "غير مصنف";

            const displayName =
                commandNames[name] ||
                name;

            return message.reply(
                `☠️ 𝗠𝗔𝗟𝗨𝗠𝗔𝗧 𝗔𝗟𝗔𝗠𝗥 ☠️\n\n` +
                `➥ الاسم: ${displayName}\n` +
                `➥ الأمر: ${prefix}${name}\n` +
                `➥ القسم: ${translatedCategory}\n` +
                `➥ الوصف: ${desc}\n` +
                `➥ الاختصارات: ${
                    aliases?.length
                        ? aliases.join(", ")
                        : "لا يوجد"
                }\n` +
                `➥ الاستخدام: ${usage}\n` +
                `➥ الصلاحية: ${requiredRole}\n` +
                `➥ المطور: ${
                    author || "غير معروف"
                }\n` +
                `➥ الإصدار: ${
                    version || "غير معروف"
                }`
            );
        }

        // =========================
        // تنسيق أسماء الأوامر
        // =========================

        const formatCommands = (cmds) =>
            cmds
                .sort()
                .map(
                    (cmd) =>
                        `× ${
                            commandNames[cmd] || cmd
                        }`
                );

        // =========================
        // إنشاء القائمة
        // =========================

        let msg =
            `━━━☠️ 𝗡𝗲𝗼𝗞𝗘𝗫 𝗔𝗜 ☠️━━━\n` +
            `╰─ قائمة أوامر البوت ─╯\n`;

        const sortedCategories =
            Object.keys(categories).sort();

        for (const cat of sortedCategories) {

            const emoji = "➥";

            const categoryTitle =
                categoryNames[cat] || cat;

            msg +=
                `\n╭──『 ${emoji} ${categoryTitle} 』\n`;

            msg +=
                `${formatCommands(
                    categories[cat]
                ).join(" ")}\n`;

            msg +=
                `╰────────────◊\n`;
        }

        // =========================
        // نهاية القائمة
        // =========================

        msg +=
            `\n➥ الاستخدام: ${prefix}help [اسم الأمر]` +
            `\n➥ اكتب ${prefix}help ثم اسم الأمر لعرض التفاصيل` +
            `\n➥ للتواصل مع مشرفي البوت: ${prefix}callad`;

        return message.reply(msg);
    }
};
