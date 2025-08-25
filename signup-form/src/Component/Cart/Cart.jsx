import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, removeFromCart }) => {
  // ✅ Calculate total based on quantity
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.Price.replace(/[^0-9.-]+/g, ""));
    return sum + (price || 0) * item.quantity;
  }, 0);

  const navigate = useNavigate()
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

                  {/* ✅ Quantity controls */}
                  <div className="quantity-controls">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          cart[index].quantity -= 1;
                        } else {
                          removeFromCart(index);
                        }
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        cart[index].quantity += 1;
                      }}
                    >
                      +
                    </button>
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

          {/* ✅ Cart Summary */}
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
