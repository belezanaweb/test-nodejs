import TestingModule from './app.module.test';
import server from './server';

export default async (modules) => {
  const moduleRefs = Array.isArray(modules) ? modules : [modules];
  const moduleRef = await TestingModule(moduleRefs);
  return { server: await server(moduleRef), moduleRef };
};
