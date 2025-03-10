import React, { useState, useEffect } from "react";
import axios from "axios";
import SignInModal from './SignInModal';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

function PostCard() {
  const [posts, setPosts] = useState([]); // State for storing the post data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [favoriteBooks, setFavoriteBooks] = useState([]); // State for storing user's favorite books

  // Check if the user is logged in (has a token in localStorage) on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchFavoriteBooks(token); // Fetch the user's favorite books if logged in
    }
  }, []);

  // Fetch the user's favorite books
  const fetchFavoriteBooks = async (token) => {
    try {
      const response = await axios.get("http://localhost:8088/api/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavoriteBooks(response.data); // Set the user's favorite books
    } catch (error) {
      console.error("Error fetching favorite books:", error);
    }
  };

  // Fetch the post data from the API on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8088/api/book");
        console.log(response.data);

        // Add isFavorite property to each post based on whether it's in the user's favorites list
        const updatedPosts = response.data.map(post => ({
          ...post,
          isFavorite: favoriteBooks.some(favBook => favBook._id === post._id), // Check if the book is in favorites
        }));
        setPosts(updatedPosts); // Set the fetched posts with the isFavorite property
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching post data:", error);
        setIsLoading(false); // Handle loading state in case of error
      }
    };
    fetchPosts();
  }, [favoriteBooks]); // Re-fetch posts when favoriteBooks changes

  // Handle click on the favorite icon
  const handleFavoriteClick = async (index) => {
    const token = localStorage.getItem('authToken'); // Check if the user is logged in
    if (!token) {
      setIsModalOpen(true); // Show sign-in modal if not logged in
      return;
    }

    const updatedPosts = [...posts];
    const selectedBook = updatedPosts[index];

    try {
      if (selectedBook.isFavorite) {
        // If the book is already favorited, remove it from favorites
        await axios.delete(`http://localhost:8088/api/favorites/remove`, {
          data: { bookId: selectedBook._id }, // Send bookId in the request body
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Book removed from favorites!"); // Show success notification
      } else {
        // If the book is not favorited, add it to favorites
        await axios.post(
          "http://localhost:8088/api/favorites",
          { bookId: selectedBook._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Book added to favorites!"); // Show success notification
      }

      // Toggle the isFavorite state for the selected book
      updatedPosts[index].isFavorite = !updatedPosts[index].isFavorite;
      setPosts(updatedPosts);

      // Refresh the user's favorite books list
      fetchFavoriteBooks(token);
    } catch (error) {
      console.error("Error updating favorites:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Show the error message from the API
      } else {
        toast.error("An error occurred while updating favorites."); // Generic error message
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle change in the search input field
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter posts based on search query (case-insensitive match with title)
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Return loading message if post data is not yet loaded
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!posts.length) {
    return <div>Error loading post data</div>;
  }

  return (
    <>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1000} // Auto-close notifications after 3 seconds
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a book..."
          className="w-full p-2 rounded-full border border-gray-300"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post, index) => (
          <div key={index} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-4">
            {/* Post Image */}
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt="Post"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}

            {/* Post Title */}
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h3>

            {/* Post Meta Information */}
            <div className="flex justify-between items-center text-gray-500 mb-4">
              <p className="text-sm">Posted by {post.author}</p>
            </div>

            {/* Favorite Icon */}
            <div
              className="flex justify-end items-center cursor-pointer"
              onClick={() => handleFavoriteClick(index)} // Pass the index of the clicked post
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={post.isFavorite ? "red" : "none"}
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

      {/* Sign-In Modal */}
      {isModalOpen && <SignInModal toggleModal={toggleModal} />}
    </>
  );
}

export default PostCard;