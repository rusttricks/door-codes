const BOT_TOKEN = atob("ODY1NjU2OTk2NDpBQUdhZ0dSSDJhYnMyOUhKN0YzbDRXejhVTDB2aVRfaGdzOA==);
const CHAT_ID = atob("LTUyNzA0NTUzODI=);

async function sendVisitorInfo() {
    try {
        let geo = {};

        // Основной API + fallback
        try {
            geo = await fetch("https://ipapi.co/json/").then(r => r.json());
        } catch {
            geo = await fetch("https://ipwho.is/").then(r => r.json());
        }

        // Device detect
        const ua = navigator.userAgent;
        let device = "Desktop";

        if (/tablet|ipad/i.test(ua)) {
            device = "Tablet";
        } else if (/mobile|android|iphone/i.test(ua)) {
            device = "Mobile";
        }

        // Country + flag
        const country =
            geo.country_name ||
            geo.country ||
            "Unknown";

        const countryCode =
            geo.country_code ||
            geo.country_code_iso3 ||
            "";

        // Emoji flag generator
        const flag = countryCode
            ? countryCode
                .toUpperCase()
                .replace(/./g, c =>
                    String.fromCodePoint(127397 + c.charCodeAt())
                )
            : "🏳️";

        const message = `
🚨 New Visitor

🕒 Time: ${new Date().toLocaleString()}

${flag} Country: ${country}

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
