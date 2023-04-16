import { z } from "zod";

const WarehouseDTOSchmema = z.object({
  locality: z.string(),
  quantity: z.number().int(),
  type: z.string(),
});

const InventoryDTOSchema = z.object({
  quantity: z.number().optional(),
  warehouses: z.array(WarehouseDTOSchmema)
});

export const ProductDTOSchema = z.object({
  sku: z.number().int(),
  name: z.string(),
  inventory: InventoryDTOSchema,
  isMarketable: z.boolean().optional(),
});

export type ProductDTO = z.infer<typeof ProductDTOSchema>;
