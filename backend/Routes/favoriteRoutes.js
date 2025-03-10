const express = require('express');
const router = express.Router();
const favoriteController = require('../Controller/favoriteController');
const authenticateUser = require('../Middleware/auth');


// Add a book to favorites
router.post('/', authenticateUser, favoriteController.addToFavorites);

// Get all favorites for the logged-in user
router.get('/', authenticateUser, favoriteController.getFavorites);

// Route to remove a book from favorites
router.delete('/remove', authenticateUser, favoriteController.removeFromFavorites);

module.exports = router;