import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './Component/SignUp/Signup';
import LogIn from './Component/SignIn/LogIn';
import HomePages from './Pages/HomePages';
import PrivateRoute from './Component/SignUp/PrivateRoute';
import NavBar from './Component/NavBar/NavBar'
import Swipper from './Component/Swipper/Swipper';
import Banner from './Component/Banner/Banner';
import Product from './Component/Product/Product';
import Cart from './Component/Cart/Cart';   // ✅ new cart component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);  // ✅ cart state

  // function to add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (      
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* Homepage gets cart + addToCart */}
        <Route path="/homepage" element={<HomePages cart={cart} addToCart={addToCart} />} />

        {/* Optional private route */}
        {/* <Route
          path="/homepages"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <HomePages cart={cart} addToCart={addToCart} />
            </PrivateRoute>
          }
        /> */}

        {/* Other components */}
        <Route path="/navbar" element={<NavBar cartCount={cart.length} />} />
        <Route path="/swipper" element={<Swipper/>} />
        <Route path="/banner" element={<Banner/>} />
        <Route path="/product" element={<Product addToCart={addToCart} />} />

        {/* ✅ New Cart Page */}
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
