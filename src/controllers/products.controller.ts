import ProductsRepository from '../repositories/products-repository';
import ProductsService from '../services/products.service';

const productsRepository = new ProductsRepository();
const productsService = new ProductsService(productsRepository);

const create = (req: any, res: any)  => {
    try {
        const product =  productsService.create(req.body);
        return res.status(201).json(product);
    } catch (err: any) {
       return res.status(400).json({ error: err.message });
    }
}

const update = (req: any, res: any)  => {
    try {
        const sku: number = req.params.sku;
        const product =  productsService.update(sku,req.body);
        return res.status(200).json(product);
    } catch (err: any) {
       return res.status(404).json({ error: err.message });
    }
}

const remove = (req: any, res: any)  => {
    try {
        const sku: number = req.params.sku;
        productsService.delete(sku);
        return res.status(204).json();
    } catch (err: any) {
       return res.status(404).json({ error: err.message });
    }
}

const get = (req: any, res: any)  => {
    try {
        const sku: number = req.params.sku;
        const product = productsService.get(sku);
        return res.status(200).json(product);
    } catch (err: any) {
       return res.status(404).json({ error: err.message });
    }
}

export { create, update, remove, get }