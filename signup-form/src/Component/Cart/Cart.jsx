import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.Image} alt={item.Product} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.Product}</h3>
                <p>{item.Description}</p>
                <p className="cart-item-price">{item.Price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
