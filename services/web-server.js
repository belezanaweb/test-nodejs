const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');

let httpServer;

function initialize() {

    return new Promise((resolve, reject) => {

        const app = express();
        
        app.use(cors());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());

        httpServer = http.createServer(app);
        app.use('/api', router);

        httpServer.listen(webServerConfig.port, err => {

            if (err) {
                reject(err);
                return;
            }

            console.log(`Web server listening on localhost:${webServerConfig.port}`);

            resolve();
        });
    });
}

function close() {

    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;