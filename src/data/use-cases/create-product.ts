import { IDbFindInventories } from '@/data/protocols/db-find-inventory-protocol'
import { IDbFindProductById } from '@/data/protocols/db-find-product-protocol'
import { IDbFindWarehouseByLocality } from '@/data/protocols/db-find-warehouse-protocol'
import { IDbInsertInventory } from '@/data/protocols/db-insert-inventory-protocol'
import { IDbInsertProduct } from '@/data/protocols/db-insert-product-protocol'
import { IDbInsertWarehouse } from '@/data/protocols/db-insert-warehouse-protocol'
import { GenericBussinessError } from '@/domain/bussiness-errors/generic-bussiness-error'
import { IProductModel } from '@/domain/models/product-model'
import { ICreateProduct, NsCreateProduct } from '@/domain/protocols/create-product-protocol'

export class CreateProduct implements ICreateProduct {
  constructor (
    private readonly productRepo: IDbFindProductById & IDbInsertProduct,
    private readonly warehouseRepo: IDbFindWarehouseByLocality & IDbInsertWarehouse,
    private readonly inventoryRepo: IDbFindInventories & IDbInsertInventory
  ) {}

  async create (params: NsCreateProduct.Input): Promise<IProductModel> {
    const existingProduct = await this.productRepo.findById(params.sku)
    if (existingProduct) {
      throw new GenericBussinessError(`Já existe um Produto com o Código SKU ${params.sku} cadastrado.`)
    }

    await this.productRepo.insert({ productCode: params.sku, name: params.name })

    for (const item of params.inventory.warehouses) {
      const existingWarehouse = await this.warehouseRepo.findByLocality(item.locality)
      if (existingWarehouse) {
        await this.warehouseRepo.insert({ locality: item.locality, type: item.type })
      }
      await this.inventoryRepo.insert({ quantity: item.quantity, productCode: params.sku, warehouseCode: 1 })
    }

    const result = await this.productRepo.findById(params.sku)
    if (!result) {
      throw new GenericBussinessError(`Não foi possivel inserir o Produto com o Código SKU ${params.sku}.`)
    }

    return result
  }
}
