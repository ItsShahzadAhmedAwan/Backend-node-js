const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret_key_here',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // 1 hour
}));

// Database-like storage (In-memory)
const users = [];
const reviews = [];

// Book data (preloaded)
const books = [
  {
    isbn: '978-0134685991',
    author: 'Robert C. Martin',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    year: 2008,
    reviews: []
  },
  {
    isbn: '978-0201633610',
    author: 'Gang of Four',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    year: 1994,
    reviews: []
  },
  {
    isbn: '978-0-13-595705-9',
    author: 'Donald E. Knuth',
    title: 'The Art of Computer Programming',
    year: 1968,
    reviews: []
  },
  {
    isbn: '978-1491927281',
    author: 'Kyle Simpson',
    title: 'You Don\'t Know JS Yet: Get Started',
    year: 2020,
    reviews: []
  },
  {
    isbn: '978-0596517748',
    author: 'Douglas Crockford',
    title: 'JavaScript: The Good Parts',
    year: 2008,
    reviews: []
  },
  {
    isbn: '978-1491954493',
    author: 'Martin Fowler',
    title: 'Refactoring: Improving the Design of Existing Code',
    year: 2018,
    reviews: []
  },
  {
    isbn: '978-1491927886',
    author: 'Jon Skeet',
    title: 'C# Player\'s Guide',
    year: 2019,
    reviews: []
  },
  {
    isbn: '978-0135957066',
    author: 'Andrew Hunt, David Thomas',
    title: 'The Pragmatic Programmer: Your Journey to Mastery',
    year: 2019,
    reviews: []
  }
];

// JWT Token Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const sessionUser = req.session?.userId;

  if (!token && !sessionUser) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.userId;
      req.username = decoded.username;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  } else if (sessionUser) {
    req.userId = sessionUser;
    const user = users.find(u => u.id === sessionUser);
    req.username = user?.username;
  }

  next();
};

// ============================================
// GENERAL USER ENDPOINTS (Tasks 1-5)
// ============================================

// Task 1: Get all books
app.get('/api/books', (req, res) => {
  res.json({
    success: true,
    message: 'Books retrieved successfully',
    data: books.map(book => ({
      isbn: book.isbn,
      author: book.author,
      title: book.title,
      year: book.year
    }))
  });
});

// Task 2: Get books by ISBN
app.get('/api/books/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  
  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  res.json({
    success: true,
    message: 'Book found',
    data: book
  });
});

// Task 3: Get all books by Author
app.get('/api/books/author/:author', (req, res) => {
  const authorBooks = books.filter(b => 
    b.author.toLowerCase().includes(req.params.author.toLowerCase())
  );

  if (authorBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No books found for this author'
    });
  }

  res.json({
    success: true,
    message: `Found ${authorBooks.length} book(s) by this author`,
    data: authorBooks
  });
});

// Task 4: Get all books by Title
app.get('/api/books/title/:title', (req, res) => {
  const titleBooks = books.filter(b => 
    b.title.toLowerCase().includes(req.params.title.toLowerCase())
  );

  if (titleBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No books found with this title'
    });
  }

  res.json({
    success: true,
    message: `Found ${titleBooks.length} book(s) with this title`,
    data: titleBooks
  });
});

// Task 5: Get book reviews
app.get('/api/books/:isbn/reviews', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }

  res.json({
    success: true,
    message: 'Reviews retrieved',
    data: {
      isbn: book.isbn,
      title: book.title,
      reviews: book.reviews.length > 0 ? book.reviews : 'No reviews available'
    }
  });
});

// ============================================
// AUTHENTICATION ENDPOINTS (Tasks 6-7)
// ============================================

// Task 6: Register New User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validation
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and email are required'
      });
    }

    // Check if user already exists
    if (users.find(u => u.username === username || u.email === email)) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// Task 7: Login as Registered User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find user
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Compare password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set session
    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user.id,
        username: user.username,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// ============================================
// REGISTERED USER ENDPOINTS (Tasks 8-9)
// ============================================

// Task 8: Add a new review (Create)
app.post('/api/books/:isbn/reviews', verifyToken, (req, res) => {
  try {
    const { isbn } = req.params;
    const { reviewText, rating } = req.body;

    // Validation
    if (!reviewText || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Review text and rating are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Find book
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Create review
    const newReview = {
      id: Date.now(),
      userId: req.userId,
      username: req.username,
      reviewText,
      rating,
      createdAt: new Date()
    };

    book.reviews.push(newReview);

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: newReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
});

// Task 8: Modify a book review (Update)
app.put('/api/books/:isbn/reviews/:reviewId', verifyToken, (req, res) => {
  try {
    const { isbn, reviewId } = req.params;
    const { reviewText, rating } = req.body;

    // Find book
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Find review
    const review = book.reviews.find(r => r.id === parseInt(reviewId));

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns the review
    if (review.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only modify your own reviews'
      });
    }

    // Update review
    if (reviewText) review.reviewText = reviewText;
    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
      }
      review.rating = rating;
    }
    review.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
});

// Task 9: Delete book review
app.delete('/api/books/:isbn/reviews/:reviewId', verifyToken, (req, res) => {
  try {
    const { isbn, reviewId } = req.params;

    // Find book
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Find review index
    const reviewIndex = book.reviews.findIndex(r => r.id === parseInt(reviewId));

    if (reviewIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const review = book.reviews[reviewIndex];

    // Check if user owns the review
    if (review.userId !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own reviews'
      });
    }

    // Delete review
    book.reviews.splice(reviewIndex, 1);

    res.json({
      success: true,
      message: 'Review deleted successfully',
      data: { deletedReviewId: parseInt(reviewId) }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
