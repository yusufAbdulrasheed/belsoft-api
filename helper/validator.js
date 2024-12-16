const { check } = require('express-validator')

// Registration Validator
exports.registerValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please provide a valid Email').isEmail().normalizeEmail({
    gmail_remove_dots: true
  }),
  check('password', 'Password is required').not().isEmpty()
]

// Login Validator
exports.loginValidator = [
  check('email', 'Provide a valid Email address').isEmail().normalizeEmail({
    gmail_remove_dots: true
  }),

  check('password', 'Password is required').not().isEmpty()
]
