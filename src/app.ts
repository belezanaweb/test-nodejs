import express from "express";
import "dotenv/config";

import { handlingErrors } from "@shared/middleware/handlingErrors";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);
app.use(handlingErrors);

export { app };
