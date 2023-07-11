const express = require('express');
const router = express.Router();

const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const productService = require('./product.service');

// routes

router.get('/', authorize(Role.Admin), getAll);


module.exports = router;

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}
