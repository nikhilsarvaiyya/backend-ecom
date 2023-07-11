
const db = require('_helpers/db');


module.exports = {
    getAll, 
};



async function getAll() {
    const products = await db.Product.find();
    return products.map(x => basicDetails(x));
}

function basicDetails(product) {
    const { id, name, image, price } = product;
    return { id, name, image, price };
}
