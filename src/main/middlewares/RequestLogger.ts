import {
    Request,
    Response,
} from 'express';
import morgan, {
    Options,
} from 'morgan';

import { Logger } from '../../shared';

const MORGAN_OPTIONS = {
    skip:  (req: Request) => req.originalUrl === '/' || req.originalUrl.includes('/docs'),
    stream: {
        write: (message: string) => Logger.http(message),
    },
} as Options<Request, Response>;

export default morgan('dev', MORGAN_OPTIONS);
