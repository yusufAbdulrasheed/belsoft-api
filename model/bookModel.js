const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title:{
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength:[150, 'Title cannot exceed 150 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  genre:{
    type: [String],
    default: []
  },
  publishedYear :{
    type: Number,
    min: [1000, 'Year must be a valid four-digit number'],
    max: [new Date().getFullYear()]
  },

  copiesAvailable: {
    type: Number, 
    default: 0,
    min: 0
  },

  description: {
    type: String,
    trim: true
  },

  addedAt: {
    type: Date,
    default: Date.now
  },

  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  borrowedAt:{
    type: Date,
    default: null
  },

  dueDate:{
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Book', bookSchema)