import dotenv from 'dotenv';
dotenv.config();

export const config = {
  SERVER_PORT: Number(process.env.SERVER_PORT) || 3001
}

export const uri = "mongodb://127.0.0.1:27017";