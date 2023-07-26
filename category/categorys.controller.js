const express = require('express');
const router = express.Router();
const validateRequest = require('_middleware/validate-request');
const Joi = require('joi');

const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const categoryService = require('./category.service');

// routes
router.get('/',  getAll);
router.get('/:type/:pattern',  getCategoryByType);
router.post('/', authorize(Role.Admin),  create);
router.get('/:id', getById);
router.put('/:id', authorize(), update);

module.exports = router;

function getAll(req, res, next) {
    categoryService.getAll()
        .then(categorys => res.json(categorys))
        .catch(next);
}

function getCategoryByType(req, res, next) {
    categoryService.getCategoryByType(req.params)
        .then(categorys => res.json(categorys))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        category: Joi.string().required(),
        childCategory: Joi.string().optional(),
        childSubCategory: Joi.string().optional()
       
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    
    categoryService.create(req.body)
        .then(category => res.json(category))
        .catch(next);
}

function getById(req, res, next) {
    
    categoryService.getById(req.params.id)
        .then(category => category ? res.json(category) : res.sendStatus(404))
        .catch(next);
}

// function updateSchema(req, res, next) {
//     const schema = {
//         category: Joi.string().required(),
//         subCategory: Joi.array().optional()
//     };

//     validateRequest(req, next, schema);
// }

function update(req, res, next) {
    // users can update their own account and admins can update any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    categoryService.update(req.params.id, req.body)
        .then(category => res.json(category))
        .catch(next);
}
