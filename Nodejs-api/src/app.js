'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Express é o que permite usar o modelo mvc
const app = express();

//Preparando as rotas
const router = express.Router();

// Conectar ao banco
mongoose.connect('mongodb://aprendendo-node:123@ds044709.mlab.com:44709/aprendendo-node');


// Carregar os models
const product = require('./models/product');

// Carregar as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));   

//
app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;