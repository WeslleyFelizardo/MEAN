'use strict';

const moongose = require('mongoose');
const Customer = moongose.model('Customer');

exports.getAll = async () => {
    // Buscando todos os produtos com o método find
    return await Customer // O primeiro parametro é o filtro e o segundo é os campo que serão listados
        .find({});
};

exports.save = async (entity) => {
    // Instanciando um objeto do produto já com os dados vindo no body da requisição
    var customer = new Customer(entity);
    // Salvando o objeto no banco de dados de forma assincrona, retornando um promise
    await customer.save();
};


exports.authenticate = async (data) => {
    return await Customer.findOne({
        email: data.email,
        password: data.password
    });
};