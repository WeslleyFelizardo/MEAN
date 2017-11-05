'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const repository = require('../repositories/product-repository');

exports.post = async (req, res, next) => {
    try {
        await repository.save(req.body);
        res.status(200).send({ message: 'Cadastrado com sucesso' });
    } catch (error) {
        res.status(500).send({ message: error });
    }
    //res.status(201).send(req.body);
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Atualizado com sucesso' });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({message: 'Removido com sucesso'});
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getAll = async (req, res, next) => {
    try {
        let data = await repository.getAll();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};