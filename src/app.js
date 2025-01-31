const express = require('express');
const cors = require('cors');
const { port } = require('./config/appConfig');
const { sendOtpController } = require('./controllers/whatsappController');
const authenticateApiKey = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-otp', authenticateApiKey, sendOtpController);

app.use(errorHandler);

const portToListen = process.env.PORT || port;
app.listen(portToListen, '0.0.0.0', () => {
    console.log(`Server berjalan di port ${portToListen}`);
});
