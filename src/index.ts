/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { productsRouter } from "./product/product.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send("It's working!");
  } catch (e) {
    res.status(500).send(e.message);
  }
});
app.use("/api/belezanaweb/products", productsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

export default app;
