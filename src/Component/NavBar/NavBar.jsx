import React, { useEffect, useState } from 'react';
import './NavBar.css';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ cart, cartCount, searchQuery, setSearchQuery }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    const userEmail = localStorage.getItem('userEmail');
  if (userEmail && cart) {
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
  }

  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('username');
  localStorage.removeItem('userEmail');
  navigate('/login');
};


  return (
    <nav className="navBar">
      <div className="nav-left">
        <img src="images/Logo PetWorld.jpg" alt="PetWorld" className='logo' />
        <h1 className='logo_name'>PetWorld</h1>
      </div>

      <div className={`links_names ${menuOpen ? "active" : ""}`}>
        <a href="/homepage" className='links'>HOME</a>
        <a href="/products" className='links'>Dogs</a>
        <a href="/products" className='links'>Cats</a>
        <a href="/products" className='links'>Fish</a>
        <a href="/products" className='links'>Small Pet</a>
        <a href="/products" className='links'>Birds</a>
      </div>

      <div className="icons">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
          />
        </div>

      <div className="account-icon" onClick={() => setShowDropdown(!showDropdown)}>
  <AccountCircleIcon className='icon-tags' />
  {username && <span className="username">{username}</span>}

  {showDropdown && (
    <div className="dropdown-menu">
      <button onClick={handleLogout}>Logout</button>
    </div>
  )}  
</div>


        <div className="cart-wrapper">
          <Link to="/cart">
            <ShoppingCartIcon className='icon-tags' />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
