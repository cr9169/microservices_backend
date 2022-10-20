import { config, uri } from "../../config";
import express from "express";
import groupRoute from "./router";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { errorHandler } from "../../errorHandler";
import cors from 'cors';

const app = express();
const PORT: number = config.GROUP_SERVER_PORT;
const db = uri;

app.use(cors());
app.use(express.json());
app.use("/group", groupRoute);
app.use(errorHandler);
app.use((req, res) => res.status(404).send('Route not found!'));

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