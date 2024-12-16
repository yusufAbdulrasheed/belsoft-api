const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

// endpoints

router.post('/borrow/:bookId', auth, userController.borrowBook)
router.post('/return/:bookId', auth, userController.returnBook)
router.get('/getbooks', auth, userController.viewBooks)

module.exports = router