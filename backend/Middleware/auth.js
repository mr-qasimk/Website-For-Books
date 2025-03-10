const jwt = require('jsonwebtoken');
const User = require('../Model/User.model');

const authMiddleware = async (req, res, next) => {
    try {
        console.log('Authorization Header:', req.header('Authorization')); // Debug: Log the authorization header

        // Get the token from the request header
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log('Token:', token); // Debug: Log the extracted token

        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        console.log('Decoded Token:', decoded); // Debug: Log the decoded token

        // Find the user by ID
        const user = await User.findOne({ _id: decoded.userId });
        console.log('User Found:', user); // Debug: Log the found user

        if (!user) {
            throw new Error('User not found');
        }

        // Attach the user and token to the request object
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.error('Authentication Error:', error.message); // Debug: Log the error
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = authMiddleware;