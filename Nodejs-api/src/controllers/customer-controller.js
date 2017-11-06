'use strict';

const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authservice = require('../services/auth-service');

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
        await repository.save({
            name: req.body.email,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY), //Criptografando a senha com md5
            roles: ["user"]
        });
        res.status(200).send({message: 'Cadastrado com sucesso'});
    } catch (error) {
        res.status(500).send({message: 'Erro na requisição'});
    }

};

exports.authenticate = async (req, res, next) => {
    try {
        let data = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!data) {
            res.status(401).send({message: 'Email ou senha inválidos'});
            return;
        }

        res.status(200).send({
            token: await authservice.generateToken({
                email: data.email,
                name: data.name,
                id: data._id,
                roles: data.roles
            })
        });
    
    } catch (error) {
        res.status(500).send({
            message: 'Erro na requisição'
        });
    }
};