const mongoose = require('mongoose')
const joi = require('joi')

const BookSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxLength: 100
},
author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
},
description: { 
    type: String,
    required: true,
    trim: true,
    minlength: 5
},
price: { 
    type: Number,
    required: true,
    min: 0
},
cover: {
    type: String,
    required: true,
    enum: ['Soft cover', 'Hard cover']
}
}, 
    {timeStamps: true}
)

const Book = mongoose.model('Book', BookSchema)

function validateCreateBook(obj) {
    const schema = joi.object({
      title: joi.string().trim().min(3).max(100).required(),
      author: joi.string().required(),
      description: joi.string().trim().min(5).max(100).required(),
      price: joi.number().min(0).required(),
      cover: joi.string().valid('Soft cover', 'Hard cover').required(),
  });
  
  return schema.validate(obj)
  }
  
  
  function validateUpdateBook(obj) {
    const schema = joi.object({
        title: joi.string().trim().min(3).max(100).required(),
        author: joi.string().required(),
        description: joi.string().trim().min(5).max(100).required(),
        price: joi.number().min(0).required(),
        cover: joi.string().valid('Soft cover', 'Hard cover').required(),
    });
  
  return schema.validate(obj)
  }

module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook
}