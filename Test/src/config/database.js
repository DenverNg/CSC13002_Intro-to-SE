const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3307,
    password: "123456",
    database: 'SEBANK',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});
module.exports = connection;
