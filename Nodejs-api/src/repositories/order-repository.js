'use strict';

const moongose = require('mongoose');
const Order = moongose.model('Order');

exports.getAll = async () => {
    // Buscando todos os produtos com o método find
    return await Order // O primeiro parametro é o filtro e o segundo é os campo que serão listados
        .find({}, 'number status customer items')
        .populate('customer', 'name') // método populate preenche os objetos que foram referenciados no model
        .populate('items.product', 'title price');
};

exports.save = async (entity) => {
    // Instanciando um objeto do produto já com os dados vindo no body da requisição
    var order = new Order(entity);
    // Salvando o objeto no banco de dados de forma assincrona, retornando um promise
    await order.save();
};