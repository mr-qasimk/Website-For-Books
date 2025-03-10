const Favorite = require('../Model/Favorite.model');
const Book = require('../Model/Book.model'); 
const User = require('../Model/User.model'); 

// Add a book to favorites
exports.addToFavorites = async (req, res) => {
    try {
        const { bookId } = req.body; // Book ID to add to favorites
        const userId = req.user._id; // User ID from the authenticated user

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find or create a favorite document for the user
        let favorite = await Favorite.findOne({ user: userId });

        if (!favorite) {
            // Create a new favorite document if it doesn't exist
            favorite = new Favorite({
                user: userId,
                books: [bookId],
            });
        } else {
            // Check if the book is already in favorites
            if (favorite.books.includes(bookId)) {
                return res.status(400).json({ message: 'Book is already in favorites' });
            }
            // Add the book to the favorites list
            favorite.books.push(bookId);
        }

        // Save the favorite document
        await favorite.save();

        res.status(200).json({ message: 'Book added to favorites', favorite });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Remove a book from favorites
exports.removeFromFavorites = async (req, res) => {
    try {
        const { bookId } = req.body; // Book ID to remove from favorites
        const userId = req.user._id; // User ID from the authenticated user

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find the favorite document for the user
        const favorite = await Favorite.findOne({ user: userId });

        if (!favorite) {
            return res.status(404).json({ message: 'No favorites found' });
        }

        // Check if the book is in the favorites list
        const bookIndex = favorite.books.indexOf(bookId);
        if (bookIndex === -1) {
            return res.status(400).json({ message: 'Book is not in favorites' });
        }

        // Remove the book from the favorites list
        favorite.books.splice(bookIndex, 1);

        // Save the updated favorite document
        await favorite.save();

        res.status(200).json({ message: 'Book removed from favorites', favorite });
    } catch (error) {
        console.error('Error removing from favorites:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get all favorites for the logged-in user
exports.getFavorites = async (req, res) => {
    try {
        const userId = req.user._id; // User ID from the authenticated user

        // Find the favorite document for the user and populate the books
        const favorite = await Favorite.findOne({ user: userId }).populate('books');

        if (!favorite) {
            return res.status(404).json({ message: 'No favorites found' });
        }

        res.status(200).json({ favorites: favorite.books });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

