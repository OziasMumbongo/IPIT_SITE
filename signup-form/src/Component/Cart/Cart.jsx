import React from 'react';
import './Cart.css';

const Cart = ({ cart }) => {
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.Image} alt={item.Product} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.Product}</h3>
                <p>{item.Price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
