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
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) setUsername(storedName);
  }, []);

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

  const handleEditProfile = () => {
    setShowDropdown(false); // close dropdown
    navigate('/edit-profile');
  };

  return (
    <nav className="navBar">
      {/* Logo */}
      <div className="nav-left">
        <Link to="/homepage">
          <img src="/images/Logo PetWorld.jpg" alt="PetWorld" className='logo' />
        </Link>
        <h1 className='logo_name'>PetWorld</h1>
      </div>

      {/* Navigation Links */}
      <div className={`links_names ${menuOpen ? "active" : ""}`}>
        <Link to="/homepage" className='links'>HOME</Link>
        <Link to="/dogs" className='links'>Dogs</Link>
        <Link to="/cats" className='links'>Cats</Link>
        <Link to="/fish" className='links'>Fish</Link>
        <Link to="/smallpets" className='links'>Small Pet</Link>
        <Link to="/birds" className='links'>Birds</Link>
      </div>

      {/* Icons and Search */}
      <div className="icons">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Account Dropdown */}
        <div className="account-icon" onClick={() => setShowDropdown(!showDropdown)}>
          <AccountCircleIcon className='icon-tags' />
          {username && <span className="username">{username}</span>}

          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleEditProfile}>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        {/* Shopping Cart */}
        <div className="cart-wrapper">
          <Link to="/cart">
            <ShoppingCartIcon className='icon-tags' />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
