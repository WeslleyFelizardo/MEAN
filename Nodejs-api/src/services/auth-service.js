'use strict';

const jwt = require('jsonwebtoken');

//Método que gerar um token com base nos datas que irá ser incluido no token
exports.generateToken = async (data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
};

//Método que recebe um token e decodifica o token e retorna os dados que estão codificado dentro do token
// Exemplo de retorno: email, name, id... 
exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT_KEY);

    return data;
};

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                next();
            }
        });
    }
}

// Inteceptador usado no controller para pegar o token verificar se o mesmo foi gerado por
// um login de perfil admin
exports.isAdmin = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token inválido'
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(401).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
}