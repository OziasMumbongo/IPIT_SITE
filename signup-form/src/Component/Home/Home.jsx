import React from 'react';
import './HomePage.css';
import NavBar from '../NavBar/NavBar';
import Swipper from '../Swipper/Swipper';
import Banner from '../Banner/Banner';
import Product from '../Product/Product';

const Home = ({ cart, addToCart }) => {   // ✅ receive from App.js

  return (
    <div className="homepage">
      <NavBar cartCount={cart.length} />   {/* ✅ use cart from props */}
      <header className="hero-section">
        <Swipper/>
        <Banner/>
      </header>

      <section id="features" className="features-section">
        <h2>Features</h2>
        <Product addToCart={addToCart} />   {/* ✅ still works */}
      </section>

      <footer className="footer">
        <p>&copy; 2025 MySite. All rights reserved.</p>
        <a href="#contact">Contact Us</a>
      </footer>
    </div>
  );
};

export default Home;
