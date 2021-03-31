import { Test } from '@nestjs/testing';

export default async (modules) =>
  await Test.createTestingModule({
    imports: [...modules],
  }).compile();
