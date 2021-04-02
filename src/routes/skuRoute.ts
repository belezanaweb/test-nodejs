import { Request, Response } from 'express';
import { createController, indexController, specificController, editController, deleteController } from '../controllers/skuController';

export default [
    {
        path: `/`,
        method: 'get',
        handler: [
            (req: Request, res: Response) => {
                const result = indexController()
                res.status(result.status).send(result.body.message);
            },
        ],
    },
    {
        path: `/:skuId`,
        method: 'get',
        handler: [
            async (req: Request, res: Response) => {
                const response = specificController(Number(req.params.skuId))
                res.status(response.status).send(response.body.message);
            },
        ],
    },
    {
        path: `/create`,
        method: 'post',
        handler: [
            (req: Request, res: Response) => {
                const result = createController(req.body)
                res.status(result.status).send(result.body);
            },
        ],
    },
    {
        path: '/edit',
        method: 'put',
        handler: [
            (req: Request, res: Response) => {
                const result = editController(req.body)
                res.status(result.status).send(result.body);
            },
        ],
    },
    {
        path: `/delete/:skuId`,
        method: 'delete',
        handler: [
            async (req: Request, res: Response) => {
                const result = deleteController(Number(req.params.skuId))
                res.status(result.status).send(result.body);
            },
        ],
    },
]