const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name : {
    type : String,
    required:true,
    unique: true
  },
  category : {
    type : String,
    required:true
  },
  parentId : {
    type: mongoose.Types.ObjectId,
    ref:'Category',
    default:null
  },
  level:{
    type:Number,
    enum: [1,2,3,4,5,6,7,8,9],
    required:true
  },
},{
  timestamps: {
    createdAt: 'createdAt', // Use `created_at` to store the created date
    updatedAt: 'updatedAt' // and `updated_at` to store the last updated date
  }
} ,
 {
  collection: 'categories'
})
module.exports = mongoose.model('Category', CategorySchema)