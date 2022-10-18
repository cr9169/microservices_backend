import { config, uri } from "../../config";
import express from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { errorHandler } from "../../errorHandler";
import cors from 'cors';
import compositorRouter from "./router";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT: number = config.COMPOSITOR_SERVER_PORT;
const db = uri;

app.use(cors());
app.use(express.json());
app.use("/", compositorRouter);
app.use('/', createProxyMiddleware({
  target: config.PERSON_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: {'/person' : '/'}
}));
app.use('/', createProxyMiddleware({
  target: config.GROUP_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: {'/group' : '/'}
}));

app.use((req, res) => res.status(404).send('Route not found!'));
app.use(errorHandler);

connect();

function connect() {
  mongoose
    .connect(db + "/tsTask")
      .then(() => {
        console.log("Connected to db");
        app.listen(PORT, async () => {
            console.log("server is listening to port " + PORT);
        });
      })
      .catch(() => {
        throw createHttpError(501, "Unable to connect database");
      });
}

export default app;