const express = require('express');
const router = express.Router();
const validateRequest = require('_middleware/validate-request');
const Joi = require('joi');

const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const productService = require('./product.service');

// routes

router.get('/',  getAll);
router.post('/', authorize(Role.Admin), createSchema, create);
router.get('/:id',  getById);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function getAll(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        image: Joi.array().optional().empty(Joi.array().length(0)).default([]),
        price: Joi.number().required(),
        category: Joi.string().required(),
        description: Joi.string().optional().empty('').default(''),
        variants: Joi.array().optional(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    productService.create(req.body)
        .then(product => res.json(product))
        .catch(next);
}

function getById(req, res, next) {
    
    productService.getById(req.params.id)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = {
        name: Joi.string().required(),
        image: Joi.array().optional().empty(Joi.array().length(0)).default([]),
        price: Joi.number().required(),
        category: Joi.string().required(),
        description: Joi.string().optional().empty('').default(''),
        variants: Joi.array().optional(),
    };

    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // users can update their own account and admins can update any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    productService.update(req.params.id, req.body)
        .then(product => res.json(product))
        .catch(next);
}
