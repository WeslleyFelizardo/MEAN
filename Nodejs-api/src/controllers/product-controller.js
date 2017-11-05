'use strict';

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        codigo: id,
        item: req.body,
        message: 'Objeto atualizado com sucesso'
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send({
        message: 'Objeto removido com sucesso'
    });
};