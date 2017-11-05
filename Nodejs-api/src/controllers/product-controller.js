'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.post = (req, res, next) => {
    // Instanciando um objeto do produto já com os dados vindo no body da requisição
    var product = new Product(req.body);
    // Salvando o objeto no banco de dados de forma assincrona, retornando um promise
    product
    .save()
    .then(data => {
        res.status(201).send({message: 'Produto cadastrado com sucesso'});
    }).catch(error => {
        res.status(400).send({
            message: "Erro ao cadastrar um produto",
            data: error
        });
    });
    //res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    })
    .then(data => {
        res.status(200).send({message: 'Produto atualizado com suceso'});
    })
    .catch(error => {
        res.status(400).send({message: 'Erro ao atualizar o produto'});
    });
};

exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.params.id)
    .then(data => {
        res.status(200).send({message: "Produto removido com sucesso"});
    })
    .catch(error => {
        res.status(400).send({message: 'Error ao remover o produto'});
    });
};

exports.getAll = (req, res, next) => {
    // Buscando todos os produtos com o método find
    Product
    .find({ active: true }, 'title price slug') // O primeiro parametro é o filtro e o segundo é os campo que serão listados
    .then(data => {
        res.status(200).send(data);
    })
    .catch(error => {
        res.status(400).send(error);
    });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({ //FindOne traz apenas um objeto da collection
        slug: req.params.slug
    }, 'title price slug tags')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(error => {
        res.status(400).send(error);
    });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(error => {
        res.status(400).send(error)
    });
};

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'description price tags')
    .then(data => {
        res.status(200).send(data);
    })
    .catch(error => {
       res.status(400).send(error); 
    });
};