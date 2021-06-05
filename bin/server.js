const app = require('../src/app');
const port = normalizaPort('3000');

const http = require('http');

function normalizaPort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

var server = http.createServer(app);

server.listen(port, function () {
    console.log(`app listening on port ${port}`)
})