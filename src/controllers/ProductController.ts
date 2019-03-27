import express from 'express';
import ProductService from '../services/ProductService';

export default class ProductController {
    //TODO: dependency injection

    public index (req: express.Request, res: express.Response) {
        console.log(req);
        res.json({ message: '/'}).status(200);
    }

    public create (req: express.Request, res: express.Response) {
        try {
            const produtoService = new ProductService();
            const produtoSalvo = produtoService.save(req.body);
            res.status(200).json(produtoSalvo);

        } catch (error) {
            res.status(500).json({message: error.message });
        }
        
    }

    public read (req: express.Request, res: express.Response) {
        try {
            const produtoService = new ProductService();
            const sku = req.params.sku;
            const produto = produtoService.find(Number(sku));
            res.status(200).json(produto);
        } catch (error) {
            res.status(500).json({message: error.message });
        }
      
    }

    public update (req: express.Request, res: express.Response) {
        try {
            const produtoService = new ProductService();
            const sku = req.params.sku;
            const data = req.body;
            const produtoAtualizado = produtoService.update(Number(sku), data);
            res.status(200).json(produtoAtualizado);
        } catch (error) {
            res.status(500).json({message: error.message });
        }
    }

    public delete (req: express.Request, res: express.Response) {
        try {
            const produtoService = new ProductService();
            const sku = req.params.sku;
            const produtoDeletado = produtoService.delete(Number(sku));
            res.status(200).json(produtoDeletado);
        } catch (error) {
            res.status(500).json({message: error.message });
        }
       
    }
}