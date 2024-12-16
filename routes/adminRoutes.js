const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const auth = require('../middleware/authMiddleware')


// EndPoint
router.post('/addBook', auth, adminController.addBook)

router.get('/viewBook', auth, adminController.viewAllBooks)

module.exports=router