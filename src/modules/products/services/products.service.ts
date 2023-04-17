import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProductResponseDto } from "../dtos/ProductResponse.dto";
import { IProductRepository } from "../repositories/IProductRepository";
import { ErrorsEnum } from "../../../shared/enum/errors.enum";
import { ProductRequest } from "../dtos/ProductRequest.dto";
import { ProductDeletedDto } from "../dtos/ProductDeleted.dto";
import { IProductWarehouseRepository } from "../repositories/IProductWarehouseRepository";

@Injectable()
export class ProductsService {
  constructor(
    @Inject("IProductRepository")
    private readonly productRepository: IProductRepository,
    @Inject("IProductWarehouseRepository")
    private readonly productWarehouseRepository: IProductWarehouseRepository
  ) {}

  async create(dto: ProductRequest): Promise<ProductResponseDto> {
    const exists = await this.productRepository.findBySku(dto.sku);

    if (exists) throw new BadRequestException(ErrorsEnum.PRODUCT_DUPLICATED);

    const product = await this.productRepository.create(dto);

    product.warehouses = await this.productWarehouseRepository.createMany(
      product.sku,
      dto.inventory.warehouses
    );

    return new ProductResponseDto(product);
  }

  async findProduct(sku: number): Promise<ProductResponseDto> {
    const product = await this._findProductBySku(sku);

    return new ProductResponseDto(product);
  }

  async update(sku: number, dto: ProductRequest): Promise<ProductResponseDto> {
    await this._findProductBySku(sku);

    const updated = await this.productRepository.update(dto);

    await this.productWarehouseRepository.delete(sku);

    if (dto.inventory.warehouses)
      updated.warehouses = await this.productWarehouseRepository.createMany(
        sku,
        dto.inventory.warehouses
      );

    return new ProductResponseDto(updated);
  }

  async delete(sku: number): Promise<ProductDeletedDto> {
    await this._findProductBySku(sku);

    await this.productWarehouseRepository.delete(sku);

    await this.productRepository.delete(sku);

    return new ProductDeletedDto("Product deleted");
  }

  private async _findProductBySku(sku: number) {
    const product = await this.productRepository.findBySku(sku);

    if (!product) throw new NotFoundException(ErrorsEnum.PRODUCT_NOT_FOUND);

    return product;
  }
}
