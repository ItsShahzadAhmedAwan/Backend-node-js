/**
 * Test file for async/promises operations
 * This demonstrates Tasks 10-13
 */

const {
  getAllBooksAsync,
  searchByIsbnPromise,
  searchByAuthorPromise,
  searchByTitlePromise,
  registerUser,
  loginUser,
  getBookReviews,
  addReview,
  updateReview,
  deleteReview
} = require('./asyncUtilities');

// Main test runner
async function runTests() {
  try {
    console.log('========================================');
    console.log('BOOK REVIEW APPLICATION - ASYNC/PROMISES TEST');
    console.log('========================================');

    // Test 1: Get all books using async/await with callback
    console.log('\n--- Test 1: Getting all books ---');
    await new Promise((resolve) => {
      getAllBooksAsync((error, books) => {
        if (error) {
          console.error('Callback error:', error.message);
        } else {
          console.log('Callback received', books.length, 'books');
        }
        resolve();
      });
    });

    // Test 2: Search by ISBN using Promises
    console.log('\n--- Test 2: Searching by ISBN ---');
    try {
      const isbnResult = await searchByIsbnPromise('978-0134685991');
      console.log('Successfully found book by ISBN');
    } catch (error) {
      console.log('ISBN search failed:', error.message);
    }

    // Test 3: Search by Author using Promises
    console.log('\n--- Test 3: Searching by Author ---');
    try {
      const authorResult = await searchByAuthorPromise('Martin');
      console.log('Successfully found books by author');
    } catch (error) {
      console.log('Author search failed:', error.message);
    }

    // Test 4: Search by Title using Promises
    console.log('\n--- Test 4: Searching by Title ---');
    try {
      const titleResult = await searchByTitlePromise('Code');
      console.log('Successfully found books by title');
    } catch (error) {
      console.log('Title search failed:', error.message);
    }

    // Test 5: Register and Login
    console.log('\n--- Test 5: Register New User ---');
    try {
      const newUser = await registerUser('testuser123', 'password123', 'test@example.com');
      console.log('User registered successfully');

      console.log('\n--- Test 6: Login User ---');
      const loginResult = await loginUser('testuser123', 'password123');
      const token = loginResult.token;
      console.log('User logged in successfully');

      // Test 7: Add Review
      console.log('\n--- Test 7: Add Review ---');
      const reviewData = await addReview(
        '978-0134685991',
        'This is an excellent book on clean code principles!',
        5,
        token
      );
      const reviewId = reviewData.id;
      console.log('Review added successfully');

      // Test 8: Get Book Reviews
      console.log('\n--- Test 8: Get Book Reviews ---');
      const reviews = await getBookReviews('978-0134685991');
      console.log('Reviews retrieved successfully');

      // Test 9: Update Review
      console.log('\n--- Test 9: Update Review ---');
      await updateReview(
        '978-0134685991',
        reviewId,
        'Updated review: This book is truly amazing!',
        5,
        token
      );
      console.log('Review updated successfully');

      // Test 10: Delete Review
      console.log('\n--- Test 10: Delete Review ---');
      await deleteReview('978-0134685991', reviewId, token);
      console.log('Review deleted successfully');

    } catch (error) {
      console.error('Error during user/review operations:', error.message);
    }

    console.log('\n========================================');
    console.log('TESTS COMPLETED');
    console.log('========================================');

  } catch (error) {
    console.error('Fatal error:', error.message);
  }
}

// Run tests
runTests();
