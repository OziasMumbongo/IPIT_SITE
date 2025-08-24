import React, { useEffect, useState } from 'react';
import './Product.css';

const Product = ({ addToCart }) => {   // <-- accept addToCart from Home
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/Products");
        const json = await response.json();
        if (response.ok) {
          setProducts(json);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="homepage">
      <h1 className="page-title">Shop Products</h1>
      <div className="products-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="image-container">
                <img src={product.Image} alt={product.Product} />
              </div>
              <h3 className="product-title">{product.Product}</h3>
              <p className="product-price">{product.Price}</p>
              <div className="button-group">
                <button 
                  className="btn add-to-cart" 
                  onClick={() => {
                    console.log("Added to cart",product)
                    addToCart(product)}}  // <-- trigger addToCart
                >
                  Add to Cart
                </button>
                <button className="btn buy-now">Buy Now</button>
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
