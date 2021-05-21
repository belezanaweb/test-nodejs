import express, { Request, Response } from "express";
import * as ProductService from "./product.service";
import { Product } from "./product.interface";

export const getAll = async (req: Request, res: Response) => {
  try {
    const products: Product[] | undefined = await ProductService.findAll();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const getById = async (req: Request, res: Response) => {
  const sku: number = parseInt(req.params.sku, 10);
  try {
    const product: Product | undefined = await ProductService.find(sku);
    if (product) {
      return res.status(200).send(product);
    }
    res.status(404).send("Product not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const newProduct = await ProductService.create(product);
    if (!newProduct) {
      return res.status(422).send("Product already exists");
    }

    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const update = async (req: Request, res: Response) => {
  const sku: number = parseInt(req.params.sku, 10);
  try {
    const productUpdate: Product = req.body;
    const updatedProduct = await ProductService.update(sku, productUpdate);
    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    }
    res.status(404).send("Product not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const sku: number = parseInt(req.params.sku, 10);
    await ProductService.remove(sku);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
