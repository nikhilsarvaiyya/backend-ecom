
const db = require('_helpers/db');

module.exports = {
    create,
    update,
    getAll, 
    getById,
    delete: _delete
};

async function getAll() {
    const categorys = await db.Category.find();
    return categorys.map(x => basicDetails(x));
}

async function getById(id) {
    const category = await getCategory(id);
    return basicDetails(category);
}

async function create(params) {
    // validate
    if (await db.Category.findOne({ category: params.category })) {
        throw 'Category "' + params.category + '" is already Available';
    }

    // if (params.subCategory !== null && await db.Category.findOne({ subCategory: params.subCategory })) {
    //     throw 'Sub Category "' + params.subCategory + '" is already Available';
    // }

    const category = new db.Category(params);
    //category.verified = Date.now();

    // save category
    await category.save();

    return basicDetails(category);
}

async function update(id, params) {
    const category = await getCategory(id);

    // validate (if email was changed)
    if (params.category && category.category !== params.category && await db.Category.findOne({ category: params.category })) {
        throw 'Name "' + params.category + '" is already taken';
    }

    // copy params to category and save
    Object.assign(category, params);
    //category.updated = Date.now();
    await category.save();

    return basicDetails(category);
}

async function _delete(id) {
    const category = await getCategory(id);
    await category.remove();
}

function basicDetails(cat) {
    const { id, category, subCategory } = cat;
    return { id, category, subCategory };
}

async function getCategory(id) {
    if (!db.isValidId(id)) throw 'Category not found';
    const category = await db.Category.findById(id);
    if (!category) throw 'Category not found';
    return category;
}
