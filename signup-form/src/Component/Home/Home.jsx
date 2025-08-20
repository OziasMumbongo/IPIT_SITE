import React from 'react';
import './HomePage.css';
import NavBar from '../NavBar/NavBar';
import Swipper from '../Swipper/Swipper';

const Home = () => {
  return (
    <div className="homepage">
      <NavBar/>
      <header className="hero-section">
        <Swipper/>
      </header>

      <section id="features" className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Easy to Use</h3>
            <p>Our platform is user-friendly and intuitive for all experience levels.</p>
          </div>
          <div className="feature">
            <h3>Fast & Reliable</h3>
            <p>Enjoy high performance and 99.9% uptime guaranteed.</p>
          </div>
          <div className="feature">
            <h3>24/7 Support</h3>
            <p>Need help? Our team is always here to assist you.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          MySite was founded in 2025 to simplify the online experience. We're passionate
          about helping people reach their goals through clean, efficient, and smart tools.
        </p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 MySite. All rights reserved.</p>
        <a href="#contact">Contact Us</a>
      </footer>
    </div>
  );
};

export default Home;
