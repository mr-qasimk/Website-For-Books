import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignInModal({ isOpen, onClose }) { // Accept isOpen and onClose as props
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8088/api/user/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      onClose(); // Close the modal using the onClose prop
      
      window.location.href = '/'; // Redirect after login
      toast.success("User is Successfully Login!"); // Show success notification
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login');
      toast.error(error.response.data.message); // Show the error message from the API
      
    }
  };

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
      {isOpen && ( // Conditionally render based on isOpen prop
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-2xl font-bold text-center mb-4 text-black">Sign In</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              {/* Form fields remain the same */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-1 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-center mb-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 w-full"
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="text-center">
              <p className="text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
            <button
              onClick={onClose} // Use onClose prop to close the modal
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInModal;