const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const bookController = require('../Controller/bookController');



// Set up multer storage engine for cover images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads'); // Save images in the uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
    }
});

const upload = multer({ storage: storage });



// Create a new book
router.post('/',upload.single('coverImage') ,bookController.createBook);

// Get all books
router.get('/', bookController.getBooks);

// Get a single book by ID
router.get('/:bookId', bookController.getBookById);

// Update a book by ID
router.put('/:bookId', bookController.updateBook);

// Delete a book by ID
router.delete('/:bookId', bookController.deleteBook);

module.exports = router;
