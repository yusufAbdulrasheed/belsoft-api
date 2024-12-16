const Book = require('../model/bookModel')

// Borrow a Book
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.params
    const userId = req.user.id

    // Find the book by ID
    const book = await Book.findById(bookId)

    if (!book) {
      return res.status(404).json({
        success: false,
        msg: 'Book not found',
      })
    }

    // Check if the book is already borrowed
    if (book.borrowedBy) {
      return res.status(400).json({
        success: false,
        msg: 'Book is already borrowed',
      })
    }

    // Check if copies are available
    if (book.copiesAvailable < 1) {
      return res.status(400).json({
        success: false,
        msg: 'No copies available for this book',
      })
    }

    // Update book details
    book.borrowedBy = userId
    book.borrowedAt = new Date()
    book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 2 weeks from now
    book.copiesAvailable -= 1
    await book.save()

    return res.status(200).json({
      success: true,
      msg: 'Book borrowed successfully',
      data: book,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    })
  }
}

// Return a Book
const returnBook = async (req, res) => {
  try {
    const { bookId } = req.params
    const userId = req.user.id

    // Find the book by ID
    const book = await Book.findById(bookId)
    if (!book) {
      return res.status(404).json({
        success: false,
        msg: 'Book not found',
      })
    }

    // Check if the book was borrowed by this user
    if (book.borrowedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        msg: 'You did not borrow this book',
      })
    }

    // Update book details
    book.borrowedBy = null
    book.borrowedAt = null
    book.dueDate = null
    book.copiesAvailable += 1
    await book.save()

    return res.status(200).json({
      success: true,
      msg: 'Book returned successfully',
      data: book,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    })
  }
}

// View All Books
const viewBooks = async (req, res) => {
  try {
    const books = await Book.find()

    return res.status(200).json({
      success: true,
      data: books,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    })
  }
}

module.exports = {
  borrowBook,
  returnBook,
  viewBooks,
}
