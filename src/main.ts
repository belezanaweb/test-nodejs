import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiTags } from './shared/enums/api.tags';
import { sumary } from './shared/enums/sumary';
import * as SwaggerUI from 'swagger-ui-express'
import { routes } from './shared/enums/routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
      new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
      }),
  );

  const swaggerConfig = new DocumentBuilder()
  .setTitle(apiTags.BELEZA_NA_WEB)
  .setDescription(sumary.DOC)
  .setVersion('1.0')
  .build()
const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
SwaggerModule.setup(routes.DOCS, app, swaggerDocument)
app.use(sumary.DOC, SwaggerUI.serve, SwaggerUI.setup(swaggerDocument))

await app.listen(3000);
}
bootstrap();
