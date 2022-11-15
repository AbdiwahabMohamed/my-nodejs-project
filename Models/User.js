const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxLength: 100,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxLength: 100, 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false, 
    },
}, { timeStamps: true})


userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin },process.env.JWT_SECRET_KEY);
  }
  

const User = mongoose.model('User', userSchema)

function validateRegisterUser(obj) {
    const Schema = joi.object( {
        email: joi.string().trim().min(5).max(100).required().email(),
        userName: joi.string().trim().min(2).max(100).required(),
        password: joi.string().trim().min(6).required(),
        
    }) 
    return Schema.validate(obj)
}

function validateLoginUser(obj) {
    const Schema = joi.object( {
        email: joi.string().trim().min(5).max(100).required().email(),
        password: joi.string().trim().min(6).required(),
    }) 
    return Schema.validate(obj)
}

function validateUpdateUser(obj) {
    const Schema = joi.object( {
        email: joi.string().trim().min(5).max(100).email(),
        userName: joi.string().trim().min(2).max(100),
        password: joi.string().trim().min(6),
        
    }) 
    return Schema.validate(obj)
}

module.exports = {
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser,
}