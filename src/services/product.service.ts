import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductRepository } from "../shared/repositories/product.repository";
import { ProductEntity } from "../shared/entities/product.entity";
import { alreadyExists, notFound } from "../shared/utils/error.message";
import { UpdateProductDto } from "../shared/dtos/update.productdto";

@Injectable()
export class ProductService {
    private repository = new ProductRepository()

    async createProduct(data: ProductEntity) {        
        const productExists = await this.repository.existsProduct(data.sku)

        if(productExists.length) {
            throw new ConflictException(alreadyExists('product'))
        }

        const response = await this.repository.createProduct(data)
        return response;    
    }
    
    async findProduct(sku: number) {
        const response = await this.repository.findProduct(sku)
        
        if(response.length == 0){
            throw new NotFoundException(notFound('product'))
        }

        return response;
    }

    async updateProduct(sku: number ,data: UpdateProductDto) {
        const productExists = await this.repository.existsProduct(sku)
        
        if(productExists.length == 0){
            throw new NotFoundException(notFound('product'))
        }

        return this.repository.updateProduct({ sku: sku, ...data })
    }

    async deleteProduct(sku: number) {
        return this.repository.deleteProduct(sku)
    }
}