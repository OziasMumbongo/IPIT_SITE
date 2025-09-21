import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './Component/SignIn/LogIn';
import HomePage from './Pages/HomePage';
import PrivateRoute from './Component/SignUp/PrivateRoute';
import NavBar from './Component/NavBar/NavBar';
import Swipper from './Component/Swipper/Swipper';
import Banner from './Component/Banner/Banner';
import Product from './Component/Product/Product';
import Cart from './Component/Cart/Cart';
import Checkout from './Component/Checkout/Checkout';
import Orders from './Component/Orders/Orders';
import SignupForm from './Component/SignUp/SignUp';

function App() {

const fullUrl = new URL(window.location);
const ip = fullUrl.searchParams.get('ip') || localStorage.getItem("ip");
localStorage.setItem("ip",ip);
const url = `http://${ip}:3000`;
window.history.pushState({}, '', fullUrl)

const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem('isLoggedIn') === 'true';
});

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


const addToCart = (product) => {
  setCart((prevCart) => {
    const existing = prevCart.find((item) => item._id === product._id);
    if (existing) {

      return prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
}


  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  }

  return (      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} setCart={setCart} />} />
        
        {/* Homepage gets cart + addToCart */}
        <Route path="/home" element={<HomePage cart={cart} addToCart={addToCart} />} />

        {/* Optional private route */}
        <Route
          path="/homepage"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <HomePage cart={cart} addToCart={addToCart} />
            </PrivateRoute>
          }
        />

        {/* Other components */}
        <Route path="/navbar" element={<NavBar cartCount={cart.length} />} />
        <Route path="/swipper" element={<Swipper/>} />
        <Route path="/banner" element={<Banner/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/products" element={<Product addToCart={addToCart} />} />

        {/* ✅ New Cart Page */}
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
