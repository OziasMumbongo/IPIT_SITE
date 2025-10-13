import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const LogIn = ({setIsLoggedIn, setCart }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

   const [ip,setIp] = useState('');
    const navigate = useNavigate();
  
  
    useEffect(()=>{
      const storedIp = localStorage.getItem("ip")
      if(storedIp){
        setIp(storedIp);
        console.log("This is the IP ", ip)
      }
    })


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async e => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || 'Login failed.');
      return;
    }

    const userEmail = data.user.email

    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', data.user.name);
    localStorage.setItem('userEmail', data.user.email);

    const savedCart = localStorage.getItem(`cart_${userEmail}`);
    if(savedCart){
      setCart(JSON.parse(savedCart));
    }else{
      setCart([])
    }
  

    alert('Login successful!');
    navigate('/homepage');


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
