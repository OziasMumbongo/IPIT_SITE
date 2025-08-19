import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LogIn.css';

const LogIn = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/Users');
      const users = await res.json();

      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setIsLoggedIn(true); // ✅ set login state
        alert('Login successful!');
        navigate('/homepages'); // ✅ go to protected page
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in.');
    }
  };

  return (
    <div className="login-container">
      <div className="side-icons">
        <img src="images/dog.jpg" alt="dog" className="dog-img" />
        <img src="images/cat1.jpg" alt="cat" className="cat-img" />
      </div>

      <div className="form-box">
        <h2>Welcome back, ePET lovers!</h2>
        <hr />

        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
            required
          />

          <div className="tooltip-wrapper">
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>

        <a href="#" className="forgot-password">Forgot Password?</a>
        <Link to="/" className='signup'>SignUp</Link>
      </div>

      <div className="side-icons">
        <img src="images/bird.jpg" alt="bird" className="bird-img" />
        <img src="images/fish1.jpeg" alt="fish" className="fish-img" />
      </div>
    </div>
    
  );
};

export default LogIn;
