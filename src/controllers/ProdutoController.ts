import express from 'express';

export default class ProdutoController {

    public index (req: express.Request, res: express.Response) {
        res.json({ message: '/'}).status(200);
    }

    public create (req: express.Request, res: express.Response) {
        res.json({ message: '/create'}).status(200);
    }

    public read (req: express.Request, res: express.Response) {
        res.json({ message: '/read'}).status(200);
    }

    public update (req: express.Request, res: express.Response) {
        res.json({ message: '/update'}).status(200);
    }

    public delete (req: express.Request, res: express.Response) {
        res.json({ message: '/delete'}).status(200);
    }
}