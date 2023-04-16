// Rota com função específica de distribuir a leitura do express e não ter necessidade de exportar todas rotas.

const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js") && !file.includes('.test.js')))
    .forEach(file => {
        pathFile = path.resolve(__dirname, file);
        require(pathFile)(app);
    });
}