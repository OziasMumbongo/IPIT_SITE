import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart, removeFromCart }) => {

  const navigate = useNavigate();

  // ✅ Save cart to localStorage
  const saveCartToStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Calculate total based on quantity
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.Price.replace(/[^0-9.-]+/g, ""));
    return sum + (price || 0) * item.quantity;
  }, 0);

  // -----------------------------------------
  //  Quantity Increase
  // -----------------------------------------
  const increaseQty = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  // -----------------------------------------
  //  Quantity Decrease
  // -----------------------------------------
  const decreaseQty = (index) => {
    if (cart[index].quantity === 1) {
      removeFromCart(index);
      return;
    }

    const updatedCart = cart.map((item, i) =>
      i === index
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  return (
    <div className="cart-page">
      
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button className="continue-shopping" onClick={() => navigate('/homepage')}>
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                
                <img src={item.Image} alt={item.Product} className="cart-item-image" />

                <div className="cart-item-details">
                  <h3>{item.Product}</h3>
                  <p>{item.Description}</p>
                  <p className="cart-item-price">{item.Price}</p>

                  {/* ----------------------------------------- */}
                  {/* Quantity Controls */}
                  {/* ----------------------------------------- */}
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ----------------------------------------- */}
          {/* Cart Summary */}
          {/* ----------------------------------------- */}
          <div className="cart-summary">
            <h2>Total: R{total.toFixed(2)}</h2>

            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout', { state: { cart, total } })}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
