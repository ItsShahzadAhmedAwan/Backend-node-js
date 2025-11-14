# Online Book Review Application

A RESTful API built with Node.js and Express.js for managing books, reviews, and user authentication.

## Features

- **General User Access**: Browse all books, search by ISBN/Author/Title, and read reviews
- **User Authentication**: Register and login with JWT and Session-based authentication
- **Review Management**: Add, modify, and delete book reviews (authenticated users only)
- **Async/Promises**: Demonstrates multiple async patterns for operations
- **Multiple Concurrent Users**: Support for simultaneous access and operations

## Project Structure

```
Backend-node-js/
├── server.js              # Main Express server
├── asyncUtilities.js      # Async/Promises utility functions (Tasks 10-13)
├── test.js               # Test file for async operations
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables
└── README.md             # This file
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ItsShahzadAhmedAwan/Backend-node-js.git
cd Backend-node-js
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:8000`

## API Endpoints

### General User Endpoints (No Authentication Required)

#### Task 1: Get all books
```
GET /api/books
```
Returns list of all available books.

**Example Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "isbn": "978-0134685991",
      "author": "Robert C. Martin",
      "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
      "year": 2008
    }
  ]
}
```

#### Task 2: Get books by ISBN
```
GET /api/books/isbn/:isbn
```

**Example:**
```
GET /api/books/isbn/978-0134685991
```

#### Task 3: Get all books by Author
```
GET /api/books/author/:author
```

**Example:**
```
GET /api/books/author/Martin
```

#### Task 4: Get all books by Title
```
GET /api/books/title/:title
```

**Example:**
```
GET /api/books/title/Code
```

#### Task 5: Get book reviews
```
GET /api/books/:isbn/reviews
```

**Example:**
```
GET /api/books/978-0134685991/reviews
```

### Authentication Endpoints

#### Task 6: Register New User
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123",
  "email": "john@example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Task 7: Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": 1,
    "username": "john_doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Registered User Endpoints (Authentication Required)

#### Task 8: Add a new review
```
POST /api/books/:isbn/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "reviewText": "Great book on clean code practices!",
  "rating": 5
}
```

#### Task 8: Modify a review
```
PUT /api/books/:isbn/reviews/:reviewId
Authorization: Bearer <token>
Content-Type: application/json

{
  "reviewText": "Updated review text",
  "rating": 4
}
```

#### Task 9: Delete a review
```
DELETE /api/books/:isbn/reviews/:reviewId
Authorization: Bearer <token>
```

### Async/Promises Operations (Node.js Program)

#### Task 10: Get all books - Using async/await with callback
```javascript
const { getAllBooksAsync } = require('./asyncUtilities');

getAllBooksAsync((error, books) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Books:', books);
  }
});
```

#### Task 11: Search by ISBN - Using Promises
```javascript
const { searchByIsbnPromise } = require('./asyncUtilities');

searchByIsbnPromise('978-0134685991')
  .then(book => console.log('Book:', book))
  .catch(error => console.error('Error:', error));
```

#### Task 12: Search by Author - Using Promises
```javascript
const { searchByAuthorPromise } = require('./asyncUtilities');

searchByAuthorPromise('Martin')
  .then(books => console.log('Books:', books))
  .catch(error => console.error('Error:', error));
```

#### Task 13: Search by Title - Using Promises
```javascript
const { searchByTitlePromise } = require('./asyncUtilities');

searchByTitlePromise('Code')
  .then(books => console.log('Books:', books))
  .catch(error => console.error('Error:', error));
```

## Testing with Postman

1. Import the API endpoints into Postman
2. For unauthenticated requests, simply send GET requests to the book endpoints
3. For authenticated requests:
   - First, register a user at POST /api/auth/register
   - Then, login at POST /api/auth/login to get a JWT token
   - Use the token in the Authorization header: `Bearer <token>`
   - Add/modify/delete reviews with the authenticated endpoints

## Running Tests

Execute the test file to see all async/promises operations in action:

```bash
npm test
```

This will:
1. Get all books using async/await with callback
2. Search by ISBN using Promises
3. Search by Author using Promises
4. Search by Title using Promises
5. Register a new user
6. Login the user
7. Add a book review
8. Retrieve book reviews
9. Update a review
10. Delete a review

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=8000
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here
NODE_ENV=development
```

## Preloaded Books

The application comes with 8 preloaded books:

1. Clean Code - Robert C. Martin
2. Design Patterns - Gang of Four
3. The Art of Computer Programming - Donald E. Knuth
4. You Don't Know JS Yet: Get Started - Kyle Simpson
5. JavaScript: The Good Parts - Douglas Crockford
6. Refactoring - Martin Fowler
7. C# Player's Guide - Jon Skeet
8. The Pragmatic Programmer: Your Journey to Mastery - Andrew Hunt, David Thomas

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Session-based authentication support
- Authorization checks on user-specific operations

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **express-session**: Session management
- **axios**: HTTP client
- **dotenv**: Environment variables

## Tasks Summary

| Task | Points | Status |
|------|--------|--------|
| Get all books | 2 | ✓ |
| Get books by ISBN | 2 | ✓ |
| Get books by Author | 2 | ✓ |
| Get books by Title | 2 | ✓ |
| Get book reviews | 2 | ✓ |
| Register new user | 3 | ✓ |
| Login registered user | 3 | ✓ |
| Add/Modify review | 2 | ✓ |
| Delete review | 2 | ✓ |
| Get all books (async/await) | 2 | ✓ |
| Search by ISBN (Promises) | 2 | ✓ |
| Search by Author (Promises) | 2 | ✓ |
| Search by Title (Promises) | 2 | ✓ |
| Project GitHub Link | 2 | ✓ |
| **TOTAL** | **30** | ✓ |

## Author

Your Name

## License

ISC

## GitHub Repository

[Backend-node-js](https://github.com/ItsShahzadAhmedAwan/Backend-node-js)
