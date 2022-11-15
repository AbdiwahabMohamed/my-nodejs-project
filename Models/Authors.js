const mongoose = require('mongoose')
const joi = require('joi')


const AuthorSchema = new mongoose.Schema( {
    fullName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },

    nationality: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 100
    },
    image: {
        type: String,
        default: 'default-avatar.png'
    },
}, {
    timestamps: true
})



const Author = mongoose.model('Author', AuthorSchema)
function validateCreateAuthor(obj) {
    const schema = joi.object({
      fullName: joi.string().trim().min(3).max(100).required(),
      nationality: joi.string().trim().min(3).max(100).required(),
      image: joi.string().trim().min(3).max(100).required(),
  });
  
  return schema.validate(obj)
  }
  
  function validateUpdateAuthor(obj) {
    const schema = joi.object({
        fullName: joi.string().trim().min(3).max(100),
        nationality: joi.string().trim().min(3).max(34),
        image: joi.string().trim().min(3).max(100),
  });
  
  return schema.validate(obj)
  }

module.exports = {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
}