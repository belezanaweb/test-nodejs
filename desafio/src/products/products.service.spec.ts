import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import * as fs from 'fs';
import * as path from 'path';
import {
  createProductDtoListMock,
  createProductDtoMock,
  productTypeMock,
} from './mocks/mocks';
import { Buffer } from 'buffer';
import { ConflictException, NotFoundException } from '@nestjs/common';

jest.mock('fs');
jest.mock('path');

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);

    jest
      .spyOn(fs, 'readFileSync')
      .mockResolvedValue(Buffer.from('[{}]') as never);

    jest.spyOn(fs, 'writeFileSync').mockResolvedValueOnce(undefined as never);

    jest.spyOn(path, 'resolve').mockReturnValueOnce('./any_path');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Success', () => {
    it('should create a new product', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(createProductDtoMock);

      const response = await service.create(createProductDtoMock);

      expect(response).toEqual(createProductDtoMock);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createProductDtoMock);
    });

    it('should return all products', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(createProductDtoListMock);

      const response = await service.findAll();

      expect(response).toEqual(createProductDtoListMock);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return a single product given a SKU', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(productTypeMock);

      const response = await service.findOne(1);

      expect(response).toEqual(productTypeMock);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(response.inventory.quantity).toEqual(3);
      expect(response.isMarketable).toBeTruthy();
    });

    it('should update a product given a SKU', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce(createProductDtoMock);

      const response = await service.update(1, createProductDtoMock);

      expect(response).toEqual(createProductDtoMock);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(1, createProductDtoMock);
    });

    it('should delete a product given a SKU', async () => {
      const deleteMock = jest.fn();
      jest.spyOn(service, 'remove').mockImplementationOnce(deleteMock);

      await service.remove(1);

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('Exceptions', () => {
    it('should throw conflictException when trying to save a duplicated SKU', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValueOnce(new ConflictException('Duplicated SKU'));

      const response = service.create(createProductDtoMock);

      expect(response).rejects.toThrow(ConflictException);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(createProductDtoMock);
    });

    it('should throw notFoundException when trying to get an unexisting SKU', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('SKU not found'));

      const response = service.findOne(1);

      expect(response).rejects.toThrow(NotFoundException);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw notFoundException when trying to update an unexisting SKU', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException('SKU not found'));

      const response = service.update(1, createProductDtoMock);

      expect(response).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(1, createProductDtoMock);
    });

    it('should throw notFoundException when trying to delete an unexisting SKU', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException('SKU not found'));

      const response = service.remove(1);

      expect(response).rejects.toThrow(NotFoundException);
      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
