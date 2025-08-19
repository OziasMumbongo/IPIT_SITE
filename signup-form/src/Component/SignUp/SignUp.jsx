import { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = ()=> {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    location: ''
  });
 
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/Users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error();
      localStorage.setItem('isLoggedIn', 'true');
      alert('Signed up successfully!');
      navigate('/homepages');
    } catch {
      alert('Signup failed.');
    }
  };

  return (
    <div className="signup-container">
      <div className="form-page">

        <div className="side-icons">
          <div className='side-images'>
            <img src="images/dog.jpg" alt="dog" className="dog-img1" />
          </div>
          <div className='side-images'>
            <img src="images/cat1.jpg" alt="" className="cat-img1" />
          </div>
        </div>

        <div className="form-container">
          <h2>Newcomer?</h2>
          <p className="subtext">Register with ease</p>

          <form onSubmit={handleSubmit}>
            <label>Full Name:</label>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

            <label>Password:</label>
            <input type="password" name="password" placeholder="******" onChange={handleChange} required />

            <label>Age:</label>
            <input type="number" name="age" placeholder="Age" onChange={handleChange} required min="0" />

            <label>Location:</label>
            <input type="text" name="location" placeholder="Address" onChange={handleChange} required />

            <button type="submit">SIGN UP</button>
            <p className='acct'>Already Have an account? <Link to="/login" className='login'>Login</Link></p>
            </form>
        </div>

        <div className="side-animals">
          <div className='side-images'>
            <img src="images/bird.jpg" alt="" className="bird-img1" />
          </div>
          <div className='side-images'>
            <img src="images/fish1.jpeg" alt="" className="fish-img1" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignupForm