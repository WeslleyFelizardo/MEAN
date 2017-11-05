'use strict'

//Importando os modulos necessario
const app = require('../src/app');
const http = require('http');
const debug = require('debug');

const port = normalizePort(process.env.PORT || '8100');
app.set('port', port);

//Criando o servidor
const server = http.createServer(app);

function normalizePort (value) {
    const port = parseInt(value, 10);

    if (isNaN(port))
        return value;

    if (port >= 0) 
        return port;

    return false;
}

server.listen(port);