const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let subCategorySchema = new Schema({
  type: String
});
let CategorySchema = new Schema({
  category: {
    type: String
  },
  subCategory: { 
    type: Array, 
    ref: "Category" 
  },
}, {
  collection: 'categories'
})
module.exports = mongoose.model('Category', CategorySchema)