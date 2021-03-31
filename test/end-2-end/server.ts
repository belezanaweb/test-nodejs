import * as supertest from 'supertest';
import { TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';

export default async function load(module: TestingModule) {
  const app = module.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.init();
  return supertest.agent(app.getHttpServer());
}
