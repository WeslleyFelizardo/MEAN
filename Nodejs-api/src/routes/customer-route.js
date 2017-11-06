'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.get('/', controller.getAll);
router.post('/', controller.save);
router.post('/authenticate', controller.authenticate);

module.exports = router;