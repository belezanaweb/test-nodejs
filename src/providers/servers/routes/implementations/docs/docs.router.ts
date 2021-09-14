import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./swagger.json";

const routerDocAPI = express.Router();

routerDocAPI.use('/api-docs', swaggerUI.serve);
routerDocAPI.get('/api-docs', swaggerUI.setup(swaggerDoc));

export { routerDocAPI }
