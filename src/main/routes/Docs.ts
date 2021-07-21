import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {
    description,
    name,
    version,
} from '../../../package.json';

const host = process.env.APP_HOST || '0.0.0.0';
const port = process.env.APP_PORT || 3000;

const config = {
    apis: [
        '**/src/**/*.*',
    ],
    definition: {
        basePath: '/',
        host: `${host}:${port}`,
        info: {
            contact: {
                email: process.env.EMAIL_SUPPORT,
                name: 'Support',
            },
            description,
            title: name,
            version,
        },
        openapi: '3.0.3',
    },
};

export default [
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSDoc(config)),
];
