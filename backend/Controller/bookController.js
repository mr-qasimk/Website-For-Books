const Book = require('../Model/Book.model');

// Create a new book
const createBook = async (req, res) => {
    const { title, author } = req.body;
    const coverImageUrl = req.file ? `http://localhost:8088/uploads/${req.file.filename}` : null;

    try {
        const newBook = new Book({
            title,
            author,
            coverImage:coverImageUrl
        });

        await newBook.save();
        res.status(201).json({
            message: 'Book created successfully',
            book: newBook
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single book by ID
const getBookById = async (req, res) => {
    const { bookId } = req.params;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a book by ID
const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { title, author, coverImage } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title, author, coverImage },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({
            message: 'Book deleted successfully',
            book: deletedBook
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};
