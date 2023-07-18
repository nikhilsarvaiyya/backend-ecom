const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let CategorySchema = new Schema({
  category: {
    type: String
  },
  subCategory: {
    type: String
  }
}, {
  collection: 'categories'
})
module.exports = mongoose.model('Category', CategorySchema)