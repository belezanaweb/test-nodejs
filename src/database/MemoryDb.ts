import logger from '../utils/logger';

const collections: { [key: string]: unknown } = {};

export default class MemoryDb {
  get(name: string): unknown | Error {
    if (!collections[name]) {
      const errMsg = `Entry ${name} doesn't exist.`;
      logger.warn(errMsg);

      throw new Error(errMsg);
    }

    return collections[name];
  }

  set(name: string, payload: unknown): void {
    logger.debug(`Entry ${name} created.`);
    collections[name] = payload;
  }

  addCollection(collectionName: string): void {
    logger.debug(`Adding collection ${collectionName}`);
    this.set(collectionName, []);
  }
}
