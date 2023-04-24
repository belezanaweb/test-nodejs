import { IStorageProvider } from '@infra/StorageProvider/types'

export class MemoryProvider<K extends string | number, V>
  implements IStorageProvider<K, V>
{
  constructor(private storage = new Map<K, V>()) {}

  async get(key: K): Promise<V | null> {
    const item = this.storage.get(key)

    return item ? structuredClone(item) : null
  }

  async save(key: K, item: V): Promise<void> {
    this.storage.set(key, structuredClone(item))
  }

  async remove(key: K): Promise<boolean> {
    return this.storage.delete(key)
  }
}
