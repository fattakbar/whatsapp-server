const { apiKeys } = require('../config/whitelist');

const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ success: false, error: "API Key diperlukan" });
    }

    if (!apiKeys.includes(apiKey)) {
        return res.status(403).json({ success: false, error: "API Key tidak valid" });
    }

    next();
};

module.exports = authenticateApiKey;