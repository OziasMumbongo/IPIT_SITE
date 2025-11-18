import React, { useEffect, useState } from 'react';
import './Product.css';
import NavBar from '../NavBar/NavBar';
import { Link } from "react-router-dom";

const esUrl = import.meta.env.ELASTIC_IP || 'http://98.94.158.209:3000';

const Product = ({ addToCart, searchQuery, cart = [] }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cachedProducts = localStorage.getItem('products');

    if (cachedProducts) {
      // Load from localStorage cache
      setProducts(JSON.parse(cachedProducts));
    } else {
      // Fetch from API and cache it
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${esUrl}/Products`);
          const json = await response.json();
          if (response.ok) {
            setProducts(json);
            localStorage.setItem('products', JSON.stringify(json));  // Cache
          } else {
            console.error("Failed to fetch products");
          }
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      };
      fetchProducts();
    }
  }, []);

  const filteredProducts = products.filter(product =>
    (product.Product || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );

  return (
    <div className="homepage">
      <h1 className="page-title">Shop Products</h1>
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, 15).map((product) => (
            <div key={product._id} className="product-card">
              
              {/* CLICKABLE AREA */}
              <Link to={`/product/${product._id}`} className="product-link">
                <div className="image-containerp">
                  <img src={product.Image} alt={product.Product} />
                </div>
                <h3 className="product-title">{product.Product}</h3>
                <p className="product-price">{product.Price}</p>
              </Link>

              {/* BUTTONS */}
              <div className="button-group">
                <button 
                  className="btn add-to-cart" 
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))
        ) : (
          <p className="loading">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Product;
