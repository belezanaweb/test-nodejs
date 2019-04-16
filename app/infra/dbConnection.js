var mysql = require('mysql');

function createDBConnection(){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'estudo'
    });
}

module.exports = function(){
    return createDBConnection;
}