const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var skuSchema = new Schema({
  size: {
    type: String,
    default: 'L'
  },
  quantity:{
    type: Number,
    default: 10
  },
  inStock: {
    type: Boolean,
    default: true
  }
  
});

var variantSchema = new Schema({
  color: {
    type: String,
    default: 'red'
  },
  image: {
    type: Array,
    default:[]
  },
  skus: {
    type: [skuSchema],
  }
});

let ProductSchema = new Schema({
  verified: Date,
  image: {
    type: Object
  },
  name: {
    type: String
  },
  category: {
    type: String
  },
  description: {
    type: String,
    default: 'Lorem ipsum'
  },
  variants: {
    type: [variantSchema]
  },
  
  price: {
    type: Number,
    default:234
  },
  discountId: {
    type: String
  },
  deletedAt: {
    type: String
  }
}, {
  versionKey: false
}, {
  strict: false
}, {
  timestamps: {
    createdAt: 'createdAt', // Use `created_at` to store the created date
    updatedAt: 'updatedAt' // and `updated_at` to store the last updated date
  }
}, {
  collection: 'product'
})
module.exports = mongoose.model('Product', ProductSchema)