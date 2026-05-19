const BOT_TOKEN = atob(
"ODY1NjU2OTk2NDpBQUdySDRoNExZSFEtSUMtWDBCcWJvYTFOdnREOURzSlVKbw=="
);

const CHAT_ID = atob(
"LTUyNzA0NTUzODI="
);

async function sendVisitorInfo() {
    try {

        const geo = await fetch("https://ipapi.co/json/")
            .then(r => r.json());

        const ua = navigator.userAgent;

        let device = "Desktop";
        if (/tablet|ipad/i.test(ua)) {
            device = "Tablet";
        } else if (/mobile|android|iphone/i.test(ua)) {
            device = "Mobile";
        }

        const country =
            geo.country_name ||
            geo.country ||
            "Unknown";

        const countryCode =
            geo.country_code ||
            "";

        const flag = countryCode
            ? countryCode
                .toUpperCase()
                .replace(/./g, c =>
                    String.fromCodePoint(
                        127397 + c.charCodeAt()
                    )
                )
            : "🏳️";

        const message = `
🚨 New Visitor

🕒 Time: ${new Date().toLocaleString()}

${flag} Country: ${country}

📱 Device: ${device}
🌐 Language: ${navigator.language}

🔗 Page: ${window.location.href}
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
        console.log(err);
    }
}

sendVisitorInfo();
