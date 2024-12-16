# Library Management API

## Overview
This is a simple API for managing a library's books, enabling users to borrow and return books. It provides the ability to view all books and interact with book records, such as borrowing and returning books. This API is built using **Node.js**, **Express**, and **MongoDB**.

## Table of Contents
- [Library Management API](#library-management-api)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [API Endpoints](#api-endpoints)
    - [1. **Add a Book**](#1-add-a-book)
    - [2. **Borrow a Book**](#2-borrow-a-book)
    - [3. **Return a Book**](#3-return-a-book)
    - [4. **View All Books**](#4-view-all-books)
  - [Authentication](#authentication)
    - [Steps to authenticate:](#steps-to-authenticate)
  - [Model Structure](#model-structure)
  - [Error Handling](#error-handling)
    - [error response:](#error-response)



## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yusufAbdulrasheed/belsoft-api.git
   ```

2. Navigate into the project folder:
   ```bash
   cd Belsoft API
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Run the server:
   ```bash
   npm start
   ```

The API will now be running on `http://localhost:6666`.


## API Endpoints

### 1. **Add a Book**
- **Endpoint**: `POST /api/admin/addBook`
- **Description**: Add a book to the library management system.
- **Headers**:
  - `Authorization`: `Bearer <your_jwt_token>`
- **Response**:
  - `200 OK`: Book added successfully
  - `404 Not Found`: Failed to add Book
- **Request Example**:
  ```json
      {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "publishedYear": 1925,
      "copiesAvailable": 5,
      "description": "A novel set in the Jazz Age about wealth, love, and the American Dream."
    }
  ```
- **Response**:
  ```json
    {
      "success": true,
      "msg": "Book added successfully!",
     "data": {
     "_id": "64abcdef1234567890fedcba",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "publishedYear": 1925,
      "copiesAvailable": 5,
      "description": "A novel set in the Jazz Age about wealth, love, and the American Dream.",
      "addedAt": "2024-12-15T10:00:00.000Z",
      "borrowedBy": null,
      "borrowedAt": null,
      "dueDate": null
    }
  }

  ```   

### 2. **Borrow a Book**
- **Endpoint**: `POST /borrow/:bookId`
- **Description**: Borrow a book from the library.
- **Parameters**:
  - `bookId` (URL parameter): The ID of the book to borrow.
- **Headers**:
  - `Authorization`: `Bearer <your_jwt_token>`
- **Response**:
  - `200 OK`: Book borrowed successfully
  - `404 Not Found`: Book not found
  - `400 Bad Request`: Book is already borrowed or no copies available
- **Example**:
  ```json
  {
    "success": true,
    "msg": "Book borrowed successfully",
    "data": {
      "title": "The Great Book",
      "author": "John Doe",
      "genre": ["Fiction", "Mystery"],
      "copiesAvailable": 2,
      "borrowedBy": "userId",
      "dueDate": "2024-12-30T00:00:00.000Z"
    }
  }
  ```

### 3. **Return a Book**
- **Endpoint**: `POST /return/:bookId`
- **Description**: Return a borrowed book to the library.
- **Parameters**:
  - `bookId` (URL parameter): The ID of the book to return.
- **Headers**:
  - `Authorization`: `Bearer <your_jwt_token>`
- **Response**:
  - `200 OK`: Book returned successfully
  - `404 Not Found`: Book not found
  - `403 Forbidden`: You did not borrow this book
- **Example**:
  ```json
  {
    "success": true,
    "msg": "Book returned successfully",
    "data": {
      "title": "The Great Book",
      "author": "John Doe",
      "genre": ["Fiction", "Mystery"],
      "copiesAvailable": 3
    }
  }
  ```

### 4. **View All Books**
- **Endpoint**: `GET /books`
- **Description**: View a list of all books in the library.
- **Headers**:
  - `Authorization`: `Bearer <your_jwt_token>`
- **Response**:
  - `200 OK`: List of all books
  - `500 Internal Server Error`: If an error occurs
- **Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "title": "The Great Book",
        "author": "John Doe",
        "genre": ["Fiction", "Mystery"],
        "copiesAvailable": 3
      },
      {
        "title": "The Sequel",
        "author": "Jane Smith",
        "genre": ["Fiction", "Adventure"],
        "copiesAvailable": 2
      }
    ]
  }
  ```



## Authentication

To access the API, you must be authenticated. The API uses JWT (JSON Web Tokens) for authentication.

### Steps to authenticate:
1. Register/Login (not covered in this API directly but assume a registration API exists).
2. Obtain a JWT token.
3. Include the token in the `Authorization` header when making requests.

Example header for a request:
```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```


## Model Structure

The **Book** model consists of the following fields:
- **title**: The title of the book (String, required).
- **author**: The author of the book (String, required).
- **genre**: An array of genres (Array of Strings, required).
- **copiesAvailable**: The number of available copies (Number, required).
- **borrowedBy**: The ID of the user who has borrowed the book (ObjectId, optional).
- **borrowedAt**: The date when the book was borrowed (Date, optional).
- **dueDate**: The due date for returning the book (Date, optional).



## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of a request:
- **200 OK**: The request was successful.
- **400 Bad Request**: Invalid request (e.g., missing parameters or wrong data type).
- **401 Unauthorized**: Authentication is required or failed.
- **403 Forbidden**: The user does not have permission to perform the action.
- **404 Not Found**: The requested resource does not exist.
- **500 Internal Server Error**: An unexpected error occurred on the server.

### error response:
```json
{
  "success": false,
  "msg": "Book not found"
}
```



