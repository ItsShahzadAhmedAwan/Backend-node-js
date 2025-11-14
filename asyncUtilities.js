/**
 * Book Review Application - Async/Promises Utility
 * This file demonstrates different approaches to handle asynchronous operations:
 * - Task 10: Async/Await with callback
 * - Task 11: Promises
 * - Task 12: Search by Author using Promises
 * - Task 13: Search by Title using Promises
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:8000/api';

// ============================================
// Task 10: Get all books using Async/Await with Callback
// ============================================
const getAllBooksAsync = async (callback) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    console.log('\n=== Task 10: Get All Books (Async/Await with Callback) ===');
    console.log('Status:', response.status);
    console.log('Total Books:', response.data.data.length);
    console.log('Books:', JSON.stringify(response.data.data, null, 2));
    
    if (callback) {
      callback(null, response.data.data);
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching books:', error.message);
    if (callback) {
      callback(error, null);
    }
    throw error;
  }
};

// ============================================
// Task 11: Search by ISBN using Promises
// ============================================
const searchByIsbnPromise = (isbn) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/books/isbn/${isbn}`)
      .then(response => {
        console.log('\n=== Task 11: Search by ISBN (Promises) ===');
        console.log('Status:', response.status);
        console.log('Book Found:', JSON.stringify(response.data.data, null, 2));
        resolve(response.data.data);
      })
      .catch(error => {
        console.error('Error searching by ISBN:', error.response?.data?.message || error.message);
        reject(error);
      });
  });
};

// ============================================
// Task 12: Search by Author using Promises
// ============================================
const searchByAuthorPromise = (author) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/books/author/${author}`)
      .then(response => {
        console.log('\n=== Task 12: Search by Author (Promises) ===');
        console.log('Status:', response.status);
        console.log(`Found ${response.data.data.length} book(s):`);
        console.log(JSON.stringify(response.data.data, null, 2));
        resolve(response.data.data);
      })
      .catch(error => {
        console.error('Error searching by author:', error.response?.data?.message || error.message);
        reject(error);
      });
  });
};

// ============================================
// Task 13: Search by Title using Promises
// ============================================
const searchByTitlePromise = (title) => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/books/title/${title}`)
      .then(response => {
        console.log('\n=== Task 13: Search by Title (Promises) ===');
        console.log('Status:', response.status);
        console.log(`Found ${response.data.data.length} book(s):`);
        console.log(JSON.stringify(response.data.data, null, 2));
        resolve(response.data.data);
      })
      .catch(error => {
        console.error('Error searching by title:', error.response?.data?.message || error.message);
        reject(error);
      });
  });
};

// ============================================
// Additional Utility Functions
// ============================================

// Register a new user
const registerUser = async (username, password, email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      username,
      password,
      email
    });
    console.log('\n=== Register User ===');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Login a user
const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password
    });
    console.log('\n=== Login User ===');
    console.log('Status:', response.status);
    console.log('Token:', response.data.data.token);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Get book reviews
const getBookReviews = async (isbn) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${isbn}/reviews`);
    console.log('\n=== Get Book Reviews ===');
    console.log('Status:', response.status);
    console.log('Reviews:', JSON.stringify(response.data.data, null, 2));
    return response.data.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Add a review
const addReview = async (isbn, reviewText, rating, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/books/${isbn}/reviews`,
      {
        reviewText,
        rating
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('\n=== Add Review ===');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data.data;
  } catch (error) {
    console.error('Error adding review:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Update a review
const updateReview = async (isbn, reviewId, reviewText, rating, token) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/books/${isbn}/reviews/${reviewId}`,
      {
        reviewText,
        rating
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('\n=== Update Review ===');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data.data;
  } catch (error) {
    console.error('Error updating review:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Delete a review
const deleteReview = async (isbn, reviewId, token) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/books/${isbn}/reviews/${reviewId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('\n=== Delete Review ===');
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error.response?.data?.message || error.message);
    throw error;
  }
};

// ============================================
// Export all functions
// ============================================
module.exports = {
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
};
