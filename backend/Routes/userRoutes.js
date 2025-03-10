const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../Controller/userController');

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);


module.exports = router;
