import MemoryDb from './../../src/database/MemoryDb';

describe('MemoryDB', () => {
  let db: MemoryDb;

  beforeEach((): void => {
    db = new MemoryDb();
  });

  it('should create a collection', () => {
    const collection = 'test';
    db.addCollection(collection);
    expect(db.get(collection)).toStrictEqual([]);
  });

  it('should persist data', () => {
    const key = 'someKey';
    const data = { sku: 12345, name: 'Some name' };
    db.set(key, data);
    expect(db.get(key)).toBe(data);
  });

  it('should throw an error when collection not defined', () => {
    const collection = 'notFound';
    try {
      db.get(collection);
    } catch (err) {
      expect(err.message).toBe(`Entry ${collection} doesn't exist.`);
    }
  });
});
