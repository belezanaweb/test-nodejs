import { MemoryProvider } from '@infra/StorageProvider/MemoryProvider/MemoryProvider'

describe('MemoryProvider', () => {
  const map = new Map<string, any>()
  const provider = new MemoryProvider<string, any>(map)

  const item = { test: 'value ' }

  beforeEach(() => {
    map.clear()
  })

  test('should save item', async () => {
    await expect(provider.save('test', item)).resolves.not.toThrow()
    expect(map.size).toBe(1)
  })

  test('should retrieve item', async () => {
    await provider.save('test', item)

    await expect(provider.get('test')).resolves.toEqual(item)
  })

  test('should return a copy of the saved item', async () => {
    await provider.save('test', item)

    const savedItem = await provider.get('test')

    expect(savedItem).toEqual(item)
    expect(savedItem).not.toBe(item)
  })

  test('should not remove an item if it does not exists', async () => {
    const response = await provider.remove('test')

    expect(response).toBe(false)
  })

  test('should remove an existing item', async () => {
    await provider.save('test', item)

    const response = await provider.remove('test')

    expect(response).toBe(true)
    expect(map.size).toBe(0)
  })
})
