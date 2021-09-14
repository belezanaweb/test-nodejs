import express from "express";
import "express-async-errors";
import helmet from "helmet";
import { errorCustom } from "./middlewares/error-custom.middleware";
import { logRequest } from "./middlewares/log-request.middleware";
import { router } from "./routes/router.router";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(logRequest);
app.use('/', router);
app.use(errorCustom);


export { app };
