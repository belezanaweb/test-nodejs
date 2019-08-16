import 'reflect-metadata';

import { agent } from 'supertest';

import { Server } from './../../src/server';

describe('Health Resource', () => {
  it('Should return OK', async () => {
    const response = await agent(new Server().app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});
