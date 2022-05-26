import { Router, Request, Response } from "express";
import { transformRecoverProduct } from "./helpers/transform-recover-product-helper";
import { LocalProductsRepositoryContainer } from "./repositories/local/local-products-repository";
import { DeleteProductUseCase } from "./use-cases/delete-product-use-case";
import { RecoverProductUseCase } from "./use-cases/recover-product-use-case";
import { SubmitProductUseCase } from "./use-cases/submit-product-use-case";
import { UpdateProductUseCase } from "./use-cases/update-product-use-case";

export const routes = Router();

routes.delete("/products/:sku", (req: Request, res: Response) => {
  const { sku } = req.params;
  const convertStringSkuToNumber = Number(sku);

  const localProductsRepository = LocalProductsRepositoryContainer;
  const deleteProductUseCase = new DeleteProductUseCase(
    localProductsRepository
  );

  try {
    deleteProductUseCase.execute(convertStringSkuToNumber);
    return res.status(201).send();
  } catch (error) {
    return res.status(500).send();
  }
});

routes.put("/products/:sku", async (req: Request, res: Response) => {
  const { sku, name, inventory } = req.body;
  const localProductsRepository = LocalProductsRepositoryContainer;
  const updateProductUseCase = new UpdateProductUseCase(
    localProductsRepository
  );

  try {
    const productUpdated = updateProductUseCase.execute({
      sku,
      name,
      inventory,
    });

    const transformedProductToAddExtraProperties = transformRecoverProduct(
      await productUpdated
    );

    return res.status(200).json(transformedProductToAddExtraProperties);
  } catch (error) {
    return res.status(404).json({ error });
  }
});

routes.get("/products/:sku", async (req: Request, res: Response) => {
  const { sku } = req.params;
  const convertStringSkuToNumber = Number(sku);
  const localProductsRepository = LocalProductsRepositoryContainer;
  const recoverProductUserCase = new RecoverProductUseCase(
    localProductsRepository
  );

  try {
    const product = await recoverProductUserCase.execute({
      sku: convertStringSkuToNumber,
    });

    const transformedProductToAddExtraProperties =
      transformRecoverProduct(product);

    return res.status(201).json(transformedProductToAddExtraProperties);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
});

routes.post("/products", async (req: Request, res: Response) => {
  const { sku, name, inventory } = req.body;

  const localProductsRepository = LocalProductsRepositoryContainer;
  const submitProductUseCase = new SubmitProductUseCase(
    localProductsRepository
  );

  try {
    await submitProductUseCase.execute({
      name,
      sku,
      inventory,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }

  return res.status(201).send();
});
