const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Name cannot exceed 50 characters']
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
  },
  role:{
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
})

module.exports = mongoose.model('User', userSchema)