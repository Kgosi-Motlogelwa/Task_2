import { config } from 'dotenv';

config();

export const {
  PORT,
  NODE_ENV,
  MONGODB_PASSWORD,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN,
  IN_PROD = NODE_ENV === 'production',
  BASE_URL,
} = process.env;
