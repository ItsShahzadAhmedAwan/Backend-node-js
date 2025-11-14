# Testing Guide for Book Review API

## Starting the Server

```bash
npm start
```

The server will start on http://localhost:8000

## Testing with Postman

### Step 1: Import the Collection
1. Open Postman
2. Click "Import" 
3. Select the `postman_collection.json` file
4. All endpoints will be imported

### Step 2: Test General User Endpoints (No Auth Required)

#### Task 1: Get All Books
- URL: `GET http://localhost:8000/api/books`
- Expected: List of 8 preloaded books

#### Task 2: Get Books by ISBN
- URL: `GET http://localhost:8000/api/books/isbn/978-0134685991`
- Expected: Single book object with Clean Code details

#### Task 3: Get Books by Author
- URL: `GET http://localhost:8000/api/books/author/Martin`
- Expected: 2 books (Clean Code by Robert C. Martin, Refactoring by Martin Fowler)

#### Task 4: Get Books by Title
- URL: `GET http://localhost:8000/api/books/title/Code`
- Expected: Multiple books with "Code" in title

#### Task 5: Get Book Reviews
- URL: `GET http://localhost:8000/api/books/978-0134685991/reviews`
- Expected: Book with empty reviews initially

### Step 3: Test Authentication Endpoints

#### Task 6: Register New User
- URL: `POST http://localhost:8000/api/auth/register`
- Body:
```json
{
  "username": "testuser123",
  "password": "password123",
  "email": "test@example.com"
}
```
- Expected: User created with ID

#### Task 7: Login
- URL: `POST http://localhost:8000/api/auth/login`
- Body:
```json
{
  "username": "testuser123",
  "password": "password123"
}
```
- Expected: Response with JWT token
- **IMPORTANT**: Copy the token for authenticated requests

### Step 4: Test Authenticated User Endpoints

#### Task 8: Add Review
1. Set up the request:
   - URL: `POST http://localhost:8000/api/books/978-0134685991/reviews`
   - Headers: 
     - `Authorization: Bearer <YOUR_TOKEN>`
     - `Content-Type: application/json`
   - Body:
```json
{
  "reviewText": "This is an excellent book on clean code principles!",
  "rating": 5
}
```
2. Send request
3. Expected: Review created with ID
4. **IMPORTANT**: Copy the review ID for next steps

#### Task 8: Modify Review
- URL: `PUT http://localhost:8000/api/books/978-0134685991/reviews/<REVIEW_ID>`
- Headers: `Authorization: Bearer <YOUR_TOKEN>`
- Body:
```json
{
  "reviewText": "Updated: This book is truly amazing!",
  "rating": 5
}
```
- Expected: Review updated

#### Task 9: Delete Review
- URL: `DELETE http://localhost:8000/api/books/978-0134685991/reviews/<REVIEW_ID>`
- Headers: `Authorization: Bearer <YOUR_TOKEN>`
- Expected: Review deleted

## Testing Node.js Async/Promises (Tasks 10-13)

After the server is running, run the test file in a new terminal:

```bash
npm test
```

This will execute:
- **Task 10**: Get all books using async/await with callback
- **Task 11**: Search by ISBN using Promises
- **Task 12**: Search by Author using Promises
- **Task 13**: Search by Title using Promises
- Plus user registration, login, and review operations

## Key Test Scenarios

### Scenario 1: Multiple Users Accessing Simultaneously
1. Open Postman in multiple windows/tabs
2. Have User A add a review
3. Have User B view the same book's reviews at the same time
4. Verify both operations complete without interference

### Scenario 2: User Authorization
1. User A logs in and adds a review
2. User B logs in
3. User B attempts to modify User A's review
4. Expected: 403 Forbidden error
5. User B can only modify their own reviews

### Scenario 3: Error Handling
- Try logging in with wrong password → 401 Unauthorized
- Try accessing review endpoints without token → 401 Unauthorized
- Try adding review with invalid rating (e.g., 10) → 400 Bad Request
- Try searching for non-existent book → 404 Not Found

## Expected Success Criteria

- ✓ All 14 tasks implemented
- ✓ JWT authentication working
- ✓ Session-based authentication working
- ✓ CRUD operations on reviews functional
- ✓ Async/Promises patterns demonstrated
- ✓ Multiple concurrent users supported
- ✓ All error cases handled gracefully

## Common Issues & Solutions

### Issue: Server won't start
**Solution**: 
- Ensure Node.js is installed: `node --version`
- Check port 8000 is available
- Check .env file is in root directory

### Issue: "Cannot find module"
**Solution**:
- Run `npm install` to install dependencies

### Issue: Token expired
**Solution**:
- Login again to get a new token
- Tokens expire after 1 hour

### Issue: "You can only modify your own reviews"
**Solution**:
- This is expected behavior
- Use the token of the review's author
- Or create a new review with your user account

## Performance Considerations

- In-memory storage: Data is lost on server restart
- For production, use a real database (MongoDB, PostgreSQL, etc.)
- Add rate limiting for production use
- Implement proper error logging

## Security Notes

- Never commit .env file to git
- Use strong JWT secrets in production
- Implement HTTPS in production
- Add CORS configuration if needed
- Validate all input data
- Use prepared statements if using databases

## Next Steps

1. ✓ Complete all 14 tasks
2. ✓ Test all endpoints with Postman
3. ✓ Document API with Swagger (optional enhancement)
4. ✓ Add database support (optional enhancement)
5. ✓ Deploy to production (Heroku, AWS, etc.)
6. ✓ Submit GitHub link for grading

---

**Ready for Peer Review!**
