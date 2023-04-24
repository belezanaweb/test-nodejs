export interface IStorageProvider<K, V> {
  get(key: K): Promise<V | null>
  save(key: K, item: V): Promise<void>
  remove(key: K): Promise<boolean>
}
