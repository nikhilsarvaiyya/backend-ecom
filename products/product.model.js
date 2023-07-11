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
  skus: {
    type: [skuSchema],
  }
});

let ProductSchema = new Schema({
  verified: Date,
  image: {
    type: Array,
    default:[]
  },
  name: {
    type: String
  },
  brand: {
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
  timestamps: true
}, {
  collection: 'product'
})
module.exports = mongoose.model('Product', ProductSchema)