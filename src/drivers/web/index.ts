import express from "express";
import routes from "src/drivers/web/routes";

export async function startWeb() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", routes);
  app.listen(3000, () => console.log("Application running at 3000"));
}
