import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DATABASE_URL,

};