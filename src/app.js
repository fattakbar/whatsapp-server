const express = require('express');
const cors = require('cors');
const path = require('path');
const { port } = require('./config/appConfig');
const { sendOtpController } = require('./controllers/whatsappController');
const authenticateApiKey = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/send-otp', authenticateApiKey, sendOtpController);

app.use(errorHandler);

const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, () => {
    console.log(`Server berjalan di ${host}:${port}`);
});
