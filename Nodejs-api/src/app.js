'use strict'

const express = require('express');
const bodyParser = require('body-parser');

//Express é o que permite usar o modelo mvc
const app = express();

//Preparando as rotas
const router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));   


//Criando uma rota
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.1'
    });
});


const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

const put = router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        codigo: id,
        item: req.body,
        message: 'Objeto atualizado com sucesso'
    });
});

const del = router.delete('/', (req, res, next) => {
    res.status(200).send({
        message: 'Objeto removido com sucesso'
    })
});

//
app.use('/', route);
app.use('/products', create);
app.use('/products', put);
app.use('/products', del);

module.exports = app;