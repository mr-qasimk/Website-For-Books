import React, { useState, useEffect } from "react";
import axios from "axios";
import SignInModal from './SignInModal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FavoritePage() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchFavorites(token);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const fetchFavorites = async (token) => {
    try {
      const response = await axios.get("http://localhost:8088/api/favorites", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Access the nested favorites array
      if (response.data && Array.isArray(response.data.favorites)) {
        setFavoriteBooks(response.data.favorites.map(book => ({ 
          ...book, 
          isFavorite: true 
        })));
      } else {
        throw new Error("Invalid favorites response format");
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Failed to load favorites");
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (bookId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsModalOpen(true);
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8088/api/favorites/remove`, {
        data: { bookId },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      
      setFavoriteBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
      toast.success("Book removed from favorites!");
      
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error(error.response?.data?.message || "Failed to remove favorite");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = favoriteBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!favoriteBooks.length) {
    return <div>No favorite books found</div>;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        
      />

      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search your favorites..."
          className="w-full p-2 rounded-full border border-gray-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book._id} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-4">
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}

            <h3 className="text-3xl font-semibold text-gray-800 mb-4">{book.title}</h3>
            
            <div className="flex justify-between items-center text-gray-500 mb-4">
              <p className="text-sm">Posted by {book.author}</p>
            </div>

            <div
              className="flex justify-end items-center cursor-pointer"
              onClick={() => handleRemoveFavorite(book._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 21l-1.45-1.328C5.4 15.09 2 12.197 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.74 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.697-3.4 6.59-8.55 11.172L12 21z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <SignInModal toggleModal={toggleModal} />}
    </>
  );
}

export default FavoritePage;