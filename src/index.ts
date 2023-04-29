import routerV1 from "./application/v1/route"
import AppFactory from "./infrastructure/factories/AppFactory"

(async () => {
  const app = await AppFactory.make(routerV1);
  await app.listen();
})();
