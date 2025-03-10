import React from 'react'
import Navbar from '../Components/navbar'
import FavoriteCard from '../Components/FavoriteCard'

function YourFavorite() {
  return (
    <div>
        <Navbar/>
        <div ><h1 className='text-center font-bold text-6xl text-current text-pink-500 mt-8'>All Your Favorites</h1></div>
        <FavoriteCard/>
    </div>
  )
}

export default YourFavorite