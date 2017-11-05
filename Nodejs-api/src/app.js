'use strict'

const express = require('express');
const bodyParser = require('body-parser');

//Express é o que permite usar o modelo mvc
const app = express();

//Preparando as rotas
const router = express.Router();

// Carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));   

//
app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;