import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  const navigate = useNavigate();

  // Helper to parse "DD/MM/YYYY, HH:mm:ss" date string into Date object
  const parseDateString = (dateStr) => {
    if (!dateStr) return new Date(NaN); // handle empty date
    const [datePart, timePart] = dateStr.split(',').map(s => s.trim());
    const [day, month, year] = datePart.split('/');
    // Construct ISO format string "YYYY-MM-DDTHH:mm:ss"
    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  // Calculate estimated delivery date range (3-7 days after orderDate)
  const getEstimatedDelivery = (orderDate, minDays = 3, maxDays = 7) => {
    const min = parseDateString(orderDate);
    const max = parseDateString(orderDate);

    if (isNaN(min) || isNaN(max)) return 'Invalid Date';

    min.setDate(min.getDate() + minDays);
    max.setDate(max.getDate() + maxDays);

    return `${min.toLocaleDateString()} - ${max.toLocaleDateString()}`;
  };

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const username = localStorage.getItem('username');

    // Filter orders made by the logged-in user
    const filtered = savedOrders.filter(
      order => order.formData.fullName === username
    );

    setOrders(savedOrders);
    setUserOrders(filtered);
  }, []);

  if (userOrders.length === 0) {
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        You have not placed any orders yet.
      </p>
    );
  }

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      {userOrders.map((order) => (
        <div key={order.id} className="order">
          <h2>Order ID: {order.id}</h2>
          <p>Date Placed: {order.date}</p>
          <p>Estimated Delivery: {getEstimatedDelivery(order.date)}</p>

          <h3>Items:</h3>
          <ul>
            {order.cart.map((item, i) => (
              <li key={i}>
                {item.Product} x {item.quantity} = R
                {(parseFloat(item.Price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>

          <p>
            <strong>Total: R{order.total.toFixed(2)}</strong>
          </p>

          <h3>Delivery Info:</h3>
          <p>{order.formData.fullName}</p>
          <p>
            {order.formData.address}, {order.formData.city}, {order.formData.postalCode},{' '}
            {order.formData.country}
          </p>
          <p>Email: {order.formData.email}</p>
        </div>
      ))}

      <button className="continue-shopping" onClick={() => navigate('/homepage')}>
        Continue Shopping
      </button>
    </div>
  );
};

export default Orders;
