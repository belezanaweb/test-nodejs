import { Router } from "../Controller";

const routerV1 = async (): Promise<Router> => {
  return {
    prefix: '/product/v1',
    controllers: []
  }
}

export default routerV1;
