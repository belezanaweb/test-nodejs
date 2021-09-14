import "reflect-metadata";
import { ConnectionSQLite } from "./providers/databases/sqlite/connection";
import { logger } from "./providers/logs";
import { app } from "./providers/servers";

ConnectionSQLite.Builder();
app.listen(3000, () => logger.info('Server is running...'));
