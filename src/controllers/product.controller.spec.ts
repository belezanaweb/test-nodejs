import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
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


describe('ProductController', () => {
    let controller: ProductController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
        }).compile();
  
        controller = app.get<ProductController>(ProductController);
    });

    describe('ProductsList', () => {
        it('should return a product with skuId sended"', async () => {
            const spy = jest.spyOn(controller, 'findProduct').mockResolvedValue(productResponse)
            const product = await controller.findProduct(productPayload.sku)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(productPayload.sku)
            expect(product).toEqual(productResponse)
        });

        it('should return a notFound exception and statusCode 404"', async () => {
           try {
               await controller.findProduct(productPayload.sku)
           } catch (error) {
               expect(error.status).toBe(404)
               expect(error.response.message).toBe(notFound('product'))
               expect(error.response.statusCode).toBe(404)
           }
        });
    });

    describe('ProductCreate', () => {
        it('should return a product created"', async () => {
            const spy = jest.spyOn(controller, 'createProduct').mockResolvedValue(productCreatedResponse)
            const product = await controller.createProduct(productPayload)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(productPayload)
            expect(product).toEqual(productCreatedResponse)
        });
  
        it('should return a alreadyExists exception and statusCode 409"', async () => {
           await controller.createProduct(productPayload)
           try {
               await controller.createProduct(productPayload)
           } catch (error) {
               expect(error.status).toBe(409)
               expect(error.response.message).toBe(alreadyExists('product'))
               expect(error.response.statusCode).toBe(409)
           }
        });
    });

    describe('updateProduct', () => {
        it('should return a product updated"', async () => {
            const spy = jest.spyOn(controller, 'updateProduct').mockResolvedValue(productUpdatedResponse)
            const product = await controller.updateProduct(productUpdatePayload, skuToUpdate)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(productUpdatePayload, skuToUpdate)
            expect(product).toEqual(productUpdatedResponse)
        });
    
        it('should return a notFound exception and statusCode 404"', async () => {
           try {
               await controller.updateProduct(productUpdatePayload, skuToUpdate)
           } catch (error) {
               expect(error.status).toBe(404)
               expect(error.response.message).toBe(notFound('product'))
               expect(error.response.statusCode).toBe(404)
           }
        });
    });  

    describe('deleteProduct', () => {
        it('should delete a product and receive undefined response"', async () => {
            const spy = jest.spyOn(controller, 'deleteProduct').mockResolvedValue()
            const product = await controller.deleteProduct(skuToDelete)
    
            expect(spy).toHaveBeenCalled()
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(skuToDelete)
            expect(product).toBe(undefined)
        });
    
        it('should return a notFound exception and statusCode 404"', async () => {
           try {
               await controller.deleteProduct(skuToDelete)
           } catch (error) {
               expect(error.status).toBe(404)
               expect(error.response.message).toBe(notFound('product'))
               expect(error.response.statusCode).toBe(404)
           }
        });
    });      
});
