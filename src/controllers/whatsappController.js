const { sendOtp } = require('../services/whatsappService');
const generateOtp = require('../utils/otpGenerator');

const sendOtpController = async (req, res, next) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, error: "Nomor telepon diperlukan" });
        }

        if (!/^\+?\d{10,15}$/.test(phone)) {
            return res.status(400).json({ success: false, error: "Format nomor telepon tidak valid" });
        }

        const otp = generateOtp();
        const result = await sendOtp(phone, otp);

        res.json({ success: true, otp, message: result.message });
    } catch (error) {
        next(error);
    }
};

module.exports = { sendOtpController };