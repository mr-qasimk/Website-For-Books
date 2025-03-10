import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Pages/Dashboard'
import YourFavorite from './Pages/YourFavorite'
import PageNotFound from './Pages/PageNotFound';


// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/yourfavorite",
    element: <YourFavorite />,
  },
  
  {
    path: "*", // Catch-all for undefined routes
    element: <PageNotFound />,
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App