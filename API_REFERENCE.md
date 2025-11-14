# Quick API Reference

## Base URL
```
http://localhost:8000/api
```

## Authentication
Use JWT tokens in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Public Endpoints (No Auth Required)

### Get All Books
```
GET /books
Response: { success: true, data: [...] }
```

### Get Book by ISBN
```
GET /books/isbn/978-0134685991
Response: { success: true, data: { isbn, author, title, year, reviews } }
```

### Get Books by Author
```
GET /books/author/Martin
Response: { success: true, data: [...] }
```

### Get Books by Title
```
GET /books/title/Code
Response: { success: true, data: [...] }
```

### Get Reviews
```
GET /books/978-0134685991/reviews
Response: { success: true, data: { isbn, title, reviews } }
```

---

## Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123",
  "email": "john@example.com"
}

Response: { success: true, data: { id, username, email } }
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123"
}

Response: { 
  success: true, 
  data: { userId, username, token } 
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <token>

Response: { success: true, message: "Logout successful" }
```

---

## Protected Endpoints (Auth Required)

### Add Review
```
POST /books/978-0134685991/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "reviewText": "Great book!",
  "rating": 5
}

Response: { 
  success: true, 
  data: { id, userId, username, reviewText, rating, createdAt } 
}
```

### Update Review
```
PUT /books/978-0134685991/reviews/1234567890
Authorization: Bearer <token>
Content-Type: application/json

{
  "reviewText": "Updated text",
  "rating": 4
}

Response: { 
  success: true, 
  data: { id, userId, username, reviewText, rating, updatedAt } 
}
```

### Delete Review
```
DELETE /books/978-0134685991/reviews/1234567890
Authorization: Bearer <token>

Response: { 
  success: true, 
  data: { deletedReviewId: 1234567890 } 
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Auth required/failed |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## Test Data

### Sample ISBNs
- 978-0134685991 (Clean Code)
- 978-0201633610 (Design Patterns)
- 978-0-13-595705-9 (The Art of Computer Programming)
- 978-1491927281 (You Don't Know JS Yet)
- 978-0596517748 (JavaScript: The Good Parts)
- 978-1491954493 (Refactoring)
- 978-1491927886 (C# Player's Guide)
- 978-0135957066 (The Pragmatic Programmer)

### Sample Search Terms
- Author: "Martin", "Crockford", "Simpson"
- Title: "Code", "JavaScript", "Programming"

### Test Login Credentials
```json
{
  "username": "testuser123",
  "password": "password123"
}
```

---

## Async/Promises Usage

### From Node.js Program (asyncUtilities.js)

```javascript
const utils = require('./asyncUtilities');

// Get all books with async/await
utils.getAllBooksAsync((error, books) => {
  if (error) console.error(error);
  else console.log(books);
});

// Search by ISBN with promises
utils.searchByIsbnPromise('978-0134685991')
  .then(book => console.log(book))
  .catch(error => console.error(error));

// Search by author with promises
utils.searchByAuthorPromise('Martin')
  .then(books => console.log(books))
  .catch(error => console.error(error));

// Search by title with promises
utils.searchByTitlePromise('Code')
  .then(books => console.log(books))
  .catch(error => console.error(error));

// Register user
utils.registerUser('username', 'password', 'email@example.com')
  .then(user => console.log(user))
  .catch(error => console.error(error));

// Login user
utils.loginUser('username', 'password')
  .then(result => console.log(result.token))
  .catch(error => console.error(error));

// Add review
utils.addReview('978-0134685991', 'Great!', 5, token)
  .then(review => console.log(review))
  .catch(error => console.error(error));
```

---

## Quick Test Flow

1. **Start Server**
   ```bash
   npm start
   ```

2. **Get All Books**
   ```bash
   curl http://localhost:8000/api/books
   ```

3. **Register User**
   ```bash
   curl -X POST http://localhost:8000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"test","password":"pass123","email":"test@example.com"}'
   ```

4. **Login**
   ```bash
   curl -X POST http://localhost:8000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"test","password":"pass123"}'
   ```

5. **Add Review** (use token from login)
   ```bash
   curl -X POST http://localhost:8000/api/books/978-0134685991/reviews \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{"reviewText":"Great!","rating":5}'
   ```

6. **Run Tests**
   ```bash
   npm test
   ```

---

## Important Notes

- Tokens expire after 1 hour
- Passwords are hashed with bcryptjs
- Reviews require valid rating (1-5)
- Users can only modify/delete their own reviews
- In-memory storage (data lost on restart)
- No database - suitable for testing/development only

---

**For more details, see README.md, TESTING_GUIDE.md, or PROJECT_COMPLETION_GUIDE.md**
