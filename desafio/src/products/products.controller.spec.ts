import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  createProductDtoListMock,
  createProductDtoMock,
  productTypeMock,
} from './mocks/mocks';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Success', () => {
    it('should create a new product', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(createProductDtoMock);

      await controller.create(createProductDtoMock);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createProductDtoMock);
    });

    it('should get all products', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(createProductDtoListMock);

      const response = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(response).toEqual(createProductDtoListMock);
    });

    it('should get one product given a SKU', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(productTypeMock);

      const response = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(response).toEqual(productTypeMock);
    });

    it('should update a product given a SKU', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(createProductDtoMock);

      const response = await controller.update('1', createProductDtoMock);

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenLastCalledWith(1, createProductDtoMock);
      expect(response).toEqual(createProductDtoMock);
    });

    it('should delete a product given a SKU', async () => {
      const deleteMock = jest.fn();
      jest.spyOn(service, 'remove').mockImplementationOnce(deleteMock);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('Exceptions', () => {
    it('should throw conflictException when trying to save a duplicated SKU', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new ConflictException('Duplicated SKU'));

      const response = controller.create(createProductDtoMock);

      expect(response).rejects.toThrow(ConflictException);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createProductDtoMock);
    });

    it('should throw notFoundException when trying to get an unexisting SKU', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('SKU not found'));

      const response = controller.findOne('1');

      expect(response).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw notFoundException when trying to update an unexisting SKU', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException('SKU not found'));

      const response = controller.update('1', createProductDtoMock);

      expect(response).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(1, createProductDtoMock);
    });

    it('should throw notFoundException when trying to delete an unexisting SKU', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException('SKU not found'));

      const response = controller.remove('1');

      expect(response).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
