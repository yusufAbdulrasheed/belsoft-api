const Book = require('../model/bookModel')

// Function to add a new book
const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publishedYear,
      copiesAvailable,
      description,
    } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      copiesAvailable,
      description,
    })

    const savedBook = await newBook.save()

    return res.status(201).json({
      success: true,
      msg: 'Book added successfully!',
      data: savedBook,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({
      success: false,
      msg: 'Failed to add book',
      error: error.message,
    })
  }
}

// Function to view all books
const viewAllBooks = async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await Book.find()

    // Check if there are no books
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'No books found',
      })
    }

    // Respond with the list of books
    return res.status(200).json({
      success: true,
      msg: 'Books retrieved successfully!',
      data: books,
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      success: false,
      msg: 'Failed to retrieve books',
      error: error.message,
    })
  }
}

module.exports = {
  addBook,
  viewAllBooks,
}
