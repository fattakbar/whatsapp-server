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

        const expiryTime = new Date(Date.now() + 5 * 60 * 1000);
        const options = { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedExpiryTime = expiryTime.toLocaleTimeString('id-ID', options);

        await client.sendMessage(
            numberId._serialized,
            `*SILETON KABUPATEN AGAM*\n\nTerima kasih telah mendaftar di aplikasi SILETON. Berikut adalah kode verifikasi OTP Anda:\n\n*${otp}*\n\nKode ini hanya berlaku selama 5 menit. Kode akan kedaluwarsa pada pukul ${formattedExpiryTime} WIB.\n\n⚠️ *PERHATIAN:* Jangan beritahukan kode ini kepada siapa pun, termasuk pihak SILETON. Kami tidak akan pernah meminta kode OTP Anda.`
        );
        return { success: true, message: "OTP terkirim" };
    } catch (error) {
        console.error("Gagal mengirim OTP:", error.message);
        throw new Error("Gagal mengirim pesan: " + error.message);
    }
};

module.exports = { sendOtp };
