/**
 * Data Model Interfaces
 */

import { Product, getProduct } from "./product.interface";

/**
 * In-Memory Store
 */

let products: Product[] = [
  {
    sku: 43264,
    name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
    inventory: {
      warehouses: [
        {
          locality: "SP",
          quantity: 12,
          type: "ECOMMERCE",
        },
        {
          locality: "MOEMA",
          quantity: 3,
          type: "PHYSICAL_STORE",
        },
      ],
    },
  },
  {
    sku: 43265,
    name: "L'Oréal Professionnel Expert Vitamino Color A.OX Powerdose - Ampola Capilar 10ml",
    inventory: {
      warehouses: [
        {
          locality: "GO",
          quantity: 5,
          type: "ECOMMERCE",
        },
        {
          locality: "SP",
          quantity: 6,
          type: "PHYSICAL_STORE",
        },
      ],
    },
  },
];

/**
 * Service Methods
 */

export const findAll = async (): Promise<Product[] | undefined> =>
  products.map((product) => getProduct(product)!);

export const find = async (sku: number): Promise<Product | undefined> =>
  getProduct(products.find((p) => p.sku === sku)!);

export const create = async (newProduct: Product): Promise<Product | null> => {
  const product = products.find((p) => p.sku === newProduct.sku);
  if (!product) {
    products.push(newProduct);
    return newProduct;
  }
  return null;
};

export const update = async (
  sku: number,
  productUpdate: Product
): Promise<Product | undefined> => {
  const index = products.findIndex((p) => p.sku === sku);
  if (index) {
    products[index] = productUpdate;

    return getProduct(productUpdate);
  }
};

export const remove = async (sku: number): Promise<undefined | void> => {
  const product = await find(sku);

  if (product) {
    products = Object.values(products).filter((p) => p.sku !== sku);
  }
};
