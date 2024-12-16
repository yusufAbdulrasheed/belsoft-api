const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const authController = require ('../controllers/authController')
const { registerValidator, loginValidator } = require('../helper/validator')


// Registration and Login Routes
router.post('/register',registerValidator, authController.registerUser)
router.post('/login',loginValidator, authController.loginUser)
router.post('/logout',auth, authController.logoutUser)
 
module.exports=router