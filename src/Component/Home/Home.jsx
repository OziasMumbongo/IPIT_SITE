import React, {useState} from 'react';
import './HomePage.css';
import NavBar from '../NavBar/NavBar';
import Swipper from '../Swipper/Swipper';
import Banner from '../Banner/Banner';
import Product from '../Product/Product';

const Home = ({ cart, addToCart }) => {   // ✅ receive from App.js
 const [searchQuery, setSearchQuery] = useState('')

  return (
  <>
      <NavBar cartCount={cart.length}
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      />   {/* ✅ use cart from props */}
    <div className="homepage">
      <header className="hero-section">
        <Swipper/>
        <Banner/>
      </header>

      <section id="features" className="features-section">
        <h2>Features</h2>
        <Product addToCart={addToCart} searchQuery={searchQuery}/>   {/* ✅ still works */}
      </section>
    </div>

      <footer className="footer">
        <p>&copy; 2025 MySite. All rights reserved.</p>
        <a href="https://www.instagram.com/the_boi_called_ozi/?hl=en">Contact Us</a>
      </footer>
  </>
  );
};

export default Home;
