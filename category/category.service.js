
const db = require('_helpers/db');

module.exports = {
    create,
    update,
    getAll,
    getCategoryByType,
    getById,
    delete: _delete
};

const convertInTree = (xs, id = null) => xs
.filter (x => x.parentId == id )
.map(xs => basicDetails(xs))
.map ((x) => ({...x, children: convertInTree (xs, x.id)}))

async function getAll() {
    const categorys = await db.Category.find();
    return convertInTree(categorys);
}

async function getCategoryByType(params) {
    const category = await db.Category.find({category:params.type});
    if(params?.pattern == 'tree'){
        return convertInTree(category)
    } else{
        return category.map(x => basicDetails(x));
    } 
}

async function getById(id) {
    const category = await getCategory(id);
    return basicDetails(category);
}

async function create(params) {
    // validate
    // if (await db.Category.findOne({ category: params.category })) {
    //     throw 'Category "' + params.category + '" is already Available';
    // }

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
    if (params.category && category.name !== params.category && await db.Category.findOne({ name: params.category })) {
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
    
    const { id, name,category, parentId, level } = cat;
    return { id, name,category, parentId, level };
}

async function getCategory(id) {
    if (!db.isValidId(id)) throw 'Category not found';
    const category = await db.Category.findById(id);
    if (!category) throw 'Category not found';
    return category;
}

