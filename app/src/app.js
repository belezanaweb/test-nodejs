import express from "express";
import productsRoutes from "./routes/productRoutes.js";
import mongoDb from "./infrastructure/database/mongoDb.js";

const app = express();
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(express.json());
app.use("/products", productsRoutes);

export default app;
