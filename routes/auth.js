const express = require('express')
const router = express.Router()
const { login, register } =require('../controllers/authController')


// /auth/register
router.post('/register', register)
// /auth/login
router.post('/login', login )

module.exports =router