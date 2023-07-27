
const db = require('_helpers/db');


module.exports = {
    create,
    update,
    getAll, 
    getById,
    delete: _delete
};



async function getAll() {
    const products = await db.Product.find().populate({
        path: 'category',
        model: 'Category',
        populate: [{
            path: 'parentId',
            model: 'Category',
            populate: [{
                path: 'parentId',
                model: 'Category',
                populate: [{
                    path: 'parentId',
                    model: 'Category',
                    populate: [{
                        path: 'parentId',
                        model: 'Category',
                        populate: [{
                            path: 'parentId',
                            model: 'Category'
                        }],
                    }],
                }],
             }]
        }]
    });
    return products.map(x => basicDetails(x));
}

async function getById(id) {
    const product = await getProduct(id);
    return basicDetails(product);
}

async function create(params) {
    // validate
    if (await db.Product.findOne({ name: params.name })) {
        throw 'Name "' + params.name + '" is already registered';
    }

    const product = new db.Product(params);
    product.verified = Date.now();

    // save product
    await product.save();

    return basicDetails(product);
}

async function update(id, params) {
    const product = await getProduct(id);
    console.log("aaaaaaaaaaaaa",product)
    // validate (if email was changed)
    if (params.name && product.name !== params.name && await db.Product.findOne({ name: params.name })) {
        throw 'Name "' + params.name + '" is already taken';
    }
    console.log("params",params)
    // copy params to product and save
    Object.assign(product, params);
    //product.updated = Date.now();
    await product.save();

    return basicDetails(product);
}

async function _delete(id) {
    const product = await getProduct(id);
    await product.remove();
}

function basicDetails(product) {
    const { id, name, image, price,description,variants,category } = product;
    return { id, name, image, price,description,variants,category };
}

async function getProduct(id) {
    if (!db.isValidId(id)) throw 'Product not found';
    const product = await db.Product.findById(id); 
    if (!product) throw 'Product not found';
    return product;
}
