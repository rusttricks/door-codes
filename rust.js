const BOT_TOKEN = "8656569964:AAGagGRH2abs29HJ7F3l4Wz8UL0viT_hgs8";
const CHAT_ID = "-5270455382";

async function sendVisitorInfo() {
    try {
        // Получаем страну и IP-инфо
        const geo = await fetch("https://ipwho.is/").then(r => r.json());

        // Определяем устройство
        const ua = navigator.userAgent;
        let device = "Desktop";

        if (/mobile/i.test(ua)) device = "Mobile";
        if (/tablet|ipad/i.test(ua)) device = "Tablet";

        const message = `
🚨 New Visitor

🕒 Time: ${new Date().toLocaleString()}

${geo.flag?.emoji || "🏳"} Country: ${geo.country || "Unknown"}

📱 Device: ${device}
🌐 Language: ${navigator.language}

🔗 Page: ${window.location.href}

🖥 User Agent:
${ua}
`;

        await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message
                })
            }
        );

    } catch (err) {
        console.log("Telegram notify error:", err);
    }
}

sendVisitorInfo();
