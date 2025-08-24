// HomePages.jsx
import React from 'react'
import Home from '../Component/Home/Home'

const HomePages = ({ cart, addToCart }) => {   // ✅ accept props
  return (
    <div>
      <Home cart={cart} addToCart={addToCart} />   {/* ✅ forward props */}
    </div>
  )
}

export default HomePages
