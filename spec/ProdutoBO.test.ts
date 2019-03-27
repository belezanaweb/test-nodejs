//Teste das regras de negocio da aplicação
import ProductBO from '../src/bo/ProductBO';
import ProductException from '../src/exceptions/ProductException';
import { 
    productCheckFlagMarketableTrue , 
    productCheckFlagMarketableFalse , 
    calculateInventoryQuantity , 
    calculateInventoryQuantityEmpty,
    productUndefined 
} from './ProdutoMock';

describe("[*] PRODUTOS", () => {
    let productBO : ProductBO;
    beforeEach(() =>{
        productBO = new ProductBO();
    })

    describe("validateIsMarketableFlag", () => {

        test('Flag deve retornar true', async () =>{
            expect( productBO.validateIsMarketableFlag(productCheckFlagMarketableTrue)).toBe(true);
        });

        test('Flag deve retornar false', async () =>{
            expect( productBO.validateIsMarketableFlag(productCheckFlagMarketableFalse)).toBe(false);
        });

        test('Deve retornar exception quando inventory não estiver definido', async () =>{
            expect( () => productBO.validateIsMarketableFlag(calculateInventoryQuantityEmpty)).toThrowError(ProductException.E08);
        });

    });


    describe("calculateInventoryQuantity", () => {

        test('Deve retornar 50', async () =>{
            expect( productBO.calculateInventoryQuantity(calculateInventoryQuantity)).toBe(50);
        });

        test('Deve retornar exception quando warehouses vazio', async () =>{
            expect( () => productBO.calculateInventoryQuantity(calculateInventoryQuantityEmpty)).toThrowError(ProductException.E05);
        });

    });

    
    describe("validateSKU", () => {

        test('Nao deve retornar nada', async () =>{
            expect( productBO.validateSKU(productUndefined) ).toBeUndefined();
        });

        test('Deve retornar exception quando produto ja existir', async () =>{
            expect( () => productBO.validateSKU(productCheckFlagMarketableTrue)).toThrowError(ProductException.E04);
        });

    });

    

});