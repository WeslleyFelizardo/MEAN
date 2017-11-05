'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAll = async () => {
    // Buscando todos os produtos com o método find
    return await Product // O primeiro parametro é o filtro e o segundo é os campo que serão listados
        .find({
            active: true,
        }, 'title price slug');
};

exports.getBySlug = async (slug) => {
    return await Product.findOne({ //FindOne traz apenas um objeto da collection
        slug: slug
    }, 'title price slug tags');
};

exports.getById = async (id) => {
    return await Product.findById(id);
};

exports.getByTag = async (tag) => {
    return await Product.find({
        tags: tag,
        active: true
    }, 'description price tags')
};

exports.save = async (entity) => {
    // Instanciando um objeto do produto já com os dados vindo no body da requisição
    var product = new Product(entity);
    // Salvando o objeto no banco de dados de forma assincrona, retornando um promise
    await product.save();
};

exports.update = async (id, entity) => {
    return await Product.findByIdAndUpdate(id, {
        $set: {
            title: entity.title,
            description: entity.description,
            price: entity.price
        }
    })
};

exports.delete = async (id) => {
    await Product.findOneAndRemove(id);
};