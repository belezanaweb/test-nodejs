import { AppError } from "@shared/errors/appError";
import { ProductsError } from "@shared/errors/ProductsError";

import ProductsRepository from "../Products.repository";
import { ProductsService } from "../Products.service";
import { ProductMock } from "./mocks/product.mock";

describe("ProductService", () => {
  let productsRepository: ProductsRepository;
  let productsService: ProductsService;

  beforeEach(() => {
    productsRepository = new ProductsRepository();
    productsService = new ProductsService(productsRepository);
  });

  describe("Search", () => {
    it("Should be get collection", () => {
      jest.spyOn(productsRepository, "all").mockReturnValue([ProductMock]);

      expect(productsService.get()).toMatchObject([ProductMock]);
    });

    it("Should be get one", () => {
      jest.spyOn(productsRepository, "findOne").mockReturnValue(ProductMock);

      const sum = ProductMock.inventory.warehouses.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);

      expect(productsService.findOne(ProductMock.sku)).toMatchObject({
        ...ProductMock,
        inventory: {
          ...ProductMock.inventory,
          quantity: sum,
        },
        isMarketable: !!sum,
      });
    });
  });

  describe("Create", () => {
    it("Should be create product", () => {
      jest.spyOn(productsRepository, "findOne").mockReturnValue(null);
      jest.spyOn(productsRepository, "create").mockReturnValue(ProductMock);

      expect(productsService.create(ProductMock)).toMatchObject(ProductMock);
    });
  });
  describe("Update", () => {
    it("Should be update product", () => {
      const putData = { ...ProductMock, name: "teste2" };
      jest.spyOn(productsRepository, "findOne").mockReturnValue(ProductMock);
      jest.spyOn(productsRepository, "update").mockReturnValue(putData);

      expect(productsService.update(ProductMock.sku, putData)).toMatchObject(
        putData
      );
    });
  });

  describe("Delete", () => {
    it("Should be delete product", () => {
      jest.spyOn(productsRepository, "findOne").mockReturnValue(ProductMock);
      jest.spyOn(productsRepository, "delete").mockReturnValue(true);

      expect(productsService.delete(ProductMock.sku)).toEqual(true);
    });
  });
});
