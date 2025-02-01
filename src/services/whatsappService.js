const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    executablePath: '/usr/bin/chromium-browser',
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('Scan QR Code untuk login:');
    require('qrcode-terminal').generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp bot siap!');
});

client.initialize();

const sendOtp = async (phone, otp) => {
    try {
        let phoneNumber = phone;
        if (!phoneNumber.includes('@c.us')) {
            phoneNumber = `${phoneNumber}@c.us`;
        }

        const numberId = await client.getNumberId(phoneNumber);

        if (!numberId) {
            throw new Error("Nomor tidak valid atau tidak terdaftar di WhatsApp");
        }

        await client.sendMessage(numberId._serialized, `Kode OTP Anda: ${otp}`);
        return { success: true, message: "OTP terkirim" };
    } catch (error) {
        console.error("Gagal mengirim OTP:", error.message);
        throw new Error("Gagal mengirim pesan: " + error.message);
    }
};

module.exports = { sendOtp };
