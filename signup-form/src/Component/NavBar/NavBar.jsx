import React, { useState } from 'react'
import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'

const NavBar = ({ cartCount }) => {   // <-- accept cartCount as prop
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navBar">
      <div className="nav-left">
        <img src="images/Logo PetWorld.jpg" alt="PetWorld" className='logo'/>
        <h1 className='logo_name'>PetWorld</h1>
      </div>

      {/* Links */}
      <div className={`links_names ${menuOpen ? "active" : ""}`}>
        <a href="/" className='links'>HOME</a>
        <a href="/" className='links'>Dogs</a>
        <a href="/" className='links'>Cats</a>
        <a href="/" className='links'>Fish</a>
        <a href="/" className='links'>Small Pet</a>
        <a href="/" className='links'>Birds</a>
      </div>

      {/* Icons */}
      <div className="icons"> 
        <SearchIcon className='icon-tags'/>
        <AccountCircleIcon className='icon-tags'/>

        <div className="cart-wrapper">
            <Link to="/cart">
              <ShoppingCartIcon className='icon-tags'/>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
