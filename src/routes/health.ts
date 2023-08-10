import { Router } from "express";
import health from "../controllers/health";

const routes = Router();

routes.get('/', health);

export default routes;
