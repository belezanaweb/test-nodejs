import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../services/product.service';
import { 
        productCreatedResponse, 
        productPayload, 
        productResponse, 
        productUpdatePayload, 
        productUpdatedResponse, 
        skuToDelete, 
        skuToUpdate 
       } from '../../test/mocks/product.mock';
import { alreadyExists, notFound } from '../shared/utils/error.message';


describe('ProductService', () => {
    let service: ProductService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [ProductService],
        }).compile();
  
        service = app.get<ProductService>(ProductService);
    });

    describe('ProductsList', () => {
        it('should return a product with skuId sended"', async () => {
            const spy = jest.spyOn(service, 'findProduct').mockResolvedValue(productResponse)
            const product = await service.findProduct(productPayload.sku)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(productPayload.sku)
            expect(product).toEqual(productResponse)
        });

        it('should return a notFound exception and statusCode 404"', async () => {
           try {
               await service.findProduct(productPayload.sku)
           } catch (error) {
               expect(error.status).toBe(404)
               expect(error.response.message).toBe(notFound('product'))
               expect(error.response.statusCode).toBe(404)
           }
        });
    });

    describe('ProductCreate', () => {
        it('should return a product created"', async () => {
            const spy = jest.spyOn(service, 'createProduct').mockResolvedValue(productCreatedResponse)
            const product = await service.createProduct(productPayload)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(productPayload)
            expect(product).toEqual(productCreatedResponse)
        });
  
        it('should return a alreadyExists exception and statusCode 409"', async () => {
           await service.createProduct(productPayload)
           try {
               await service.createProduct(productPayload)
           } catch (error) {
               expect(error.status).toBe(409)
               expect(error.response.message).toBe(alreadyExists('product'))
               expect(error.response.statusCode).toBe(409)
           }
        });
    });

    describe('updateProduct', () => {
        it('should return a product updated"', async () => {
            const spy = jest.spyOn(service, 'updateProduct').mockResolvedValue(productUpdatedResponse)
            const product = await service.updateProduct(skuToUpdate, productUpdatePayload)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(skuToUpdate, productUpdatePayload)
            expect(product).toEqual(productUpdatedResponse)
        });
    
        it('should return a notFound exception and statusCode 404"', async () => {
           try {
               await service.updateProduct(skuToUpdate, productUpdatePayload)
           } catch (error) {
               expect(error.status).toBe(404)
               expect(error.response.message).toBe(notFound('product'))
               expect(error.response.statusCode).toBe(404)
           }
        });
    });  

    describe('deleteProduct', () => {
        it('should delete a product and receive undefined response"', async () => {
            const spy = jest.spyOn(service, 'deleteProduct').mockResolvedValue()
            const product = await service.deleteProduct(skuToDelete)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(skuToDelete)
            expect(product).toBe(undefined)
        });
    
        it('should return a notFound exception and statusCode 404"', async () => {
           try {
               await service.deleteProduct(skuToDelete)
           } catch (error) {
               expect(error.status).toBe(404)
               expect(error.response.message).toBe(notFound('product'))
               expect(error.response.statusCode).toBe(404)
           }
        });
    });      
});
