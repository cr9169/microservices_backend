import { config } from "../../config";
import express from "express";
import { errorHandler } from "../../errorHandler";
import cors from 'cors';
import compositorRouter from "./router";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT: number = config.COMPOSITOR_SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use('/', compositorRouter);
app.use('/person', createProxyMiddleware({
  target: config.PERSON_API_BASE_URL,
  changeOrigin: true
}));

app.use('/group', createProxyMiddleware({
  target: config.GROUP_API_BASE_URL,
  changeOrigin: true
}));

app.use(errorHandler);

connect();

function connect() {
  app.listen(PORT, async () => {
    console.log("server is listening to port " + PORT);
  });
}

export default app;