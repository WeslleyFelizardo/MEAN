'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authservice = require('../services/auth-service');

router.post('/', authservice.isAdmin, controller.post);

router.put('/:id', authservice.isAdmin, controller.put);

router.delete('/:id', authservice.isAdmin, controller.delete);

router.get('/', controller.getAll);

router.get('/:slug', controller.getBySlug);

router.get('/admin/:id', authservice.isAdmin, controller.getById);

router.get('/tags/:tag', controller.getByTag);

module.exports = router;