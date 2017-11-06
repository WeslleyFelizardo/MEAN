'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.getAll = async (req, res, next) => {

    try {
        let data = await repository.getAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({message: 'Erro na requisição'});
    }
};

exports.save = async (req, res, next) => {
    try {

        let token = req.headers['x-access-token'];

        let data = await authService.decodeToken(token);
        console.log(data);
        await repository.save({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(200).send({message: 'Cadastrado com sucesso'});
    } catch (error) {
        res.status(500).send({message: 'Erro na requisição'});
    }

};
