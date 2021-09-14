import { ILog } from "./ilog";
import { WinstonLog } from "./winston";

const logger: ILog = new WinstonLog();

export { logger };
