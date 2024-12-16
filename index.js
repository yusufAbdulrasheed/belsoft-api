const express = require('express')
const mongoose = require('mongoose')
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()
const PORT = process.env.SERVER_PORT || 6666

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use('/api', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)

// Database connection
const mongoURI = process.env.MONGO_DB

mongoose.connect(mongoURI)
  .then(() =>{
    console.log('Database Connected Successfully 🥳🥳🥳🥳🥳🥳 ')
    app.listen(PORT, () =>{
      console.log(`Server listening on ${PORT} 🔒🔒🔒🔒🔒🔒🔒`)
    })
  })

  .catch((err) =>{
    console.log('There was an error connecting to the database, 😮😮😮😮😮😮', err)
  })