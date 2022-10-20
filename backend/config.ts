import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PERSON_SERVER_PORT: Number(process.env.PERSON_SERVER_PORT) || 3001,
  GROUP_SERVER_PORT: Number(process.env.GROUP_SERVER_PORT) || 3002,
  COMPOSITOR_SERVER_PORT: Number(process.env.COMPOSITOR_SERVER_PORT) || 3003,
  PERSON_API_BASE_URL: `http://localhost:3001/`,
  GROUP_API_BASE_URL: `http://localhost:3002/`,
  COMPOSITOR_API_BASE_URL: `http://localhost:3003/`
}

export const uri = "mongodb://127.0.0.1:27017";