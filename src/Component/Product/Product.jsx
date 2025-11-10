import React, { useEffect, useState } from 'react';
import './Product.css';
import NavBar from '../NavBar/NavBar';

const esUrl = import.meta.env.ELASTIC_IP || 'http://98.94.158.209:3000'

const Product = ({addToCart, searchQuery,cart=[] }) => {   // <-- accept addToCart from Home
  const [products, setProducts] = useState([]);

 

  useEffect(() => {
    let ip = localStorage.getItem("ip")
    console.log("This is the IP ", ip)
    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${esUrl}/Products`);
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

const filteredProducts = products.filter(product => 
  (product.Product || '').toLowerCase().includes((searchQuery || '').toLowerCase())
);


  return (
    <>
    <div className="homepage">
      <NavBar cartCount={cart.length}
      searchQuery={searchQuery}
      />
      <h1 className="page-title">Shop Products</h1>
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
                >Add to Cart
                </button>
                {/* <button className="btn buy-now">Buy Now</button> */}
              </div>
            </div>
          ))
        ) : (
          <p className="loading">Loading products...</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Product;
