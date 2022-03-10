"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger();
    const port = 3333;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }));
    await app.listen(port);
    logger.log(`Application listing on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map