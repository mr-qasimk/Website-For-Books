// models/Book.js (for Node.js with MongoDB, using Mongoose)
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: String,
        required: true
    },
    
     createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);
