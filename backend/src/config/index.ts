import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/tiffix',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  phonepe: {
    merchantId: process.env.PHONEPE_MERCHANT_ID,
    apiKey: process.env.PHONEPE_API_KEY
  }
}; 