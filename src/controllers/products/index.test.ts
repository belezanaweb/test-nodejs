import ProductController from './'
import { item } from './../../mock'

describe('ProductsController', () => {
  let controller = new ProductController();
  it('should remove properties quantity and isMarketable', () => {
    const result = controller._removeAttrs(item)
    expect(result.inventory).not.toHaveProperty('quantity')
    expect(result).not.toHaveProperty('isMarketable')

  })
  it('should inventory quantity with 15', () => {
    const result = controller._getQuantity(item.inventory)
    expect(result).toBe(15)

  })
  describe('_getIsMarketable', () => {
    it('should return 0 when quantity is 0', () => {
      const result = controller._getIsMarketable(0)
      expect(result).toBeFalsy()
    })
    it('should return 0 when quantity is 0', () => {
      const result = controller._getIsMarketable(10)
      expect(result).toBeTruthy()

    })
  })

 })
