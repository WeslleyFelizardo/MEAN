'use strict';

// Importando o mongoose
const mongoose = require('mongoose');
// Pegando o schema
const Schema = mongoose.Schema;

// Criando um novo schema e criando as validações de cada um dos campos
const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: [true, 'Slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]
});

// Exportando o schema passando o nome do model e o objeto esquema
module.exports = mongoose.model('Product', schema);