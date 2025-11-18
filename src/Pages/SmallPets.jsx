import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import NavBar from '../Component/NavBar/NavBar';
import './Dogs.css';

const esUrl = import.meta.env.ELASTIC_IP || 'http://98.94.158.209:3000';

const SmallPets = ({ addToCart, cart = [], category }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cacheKey = `products_${category || 'all'}`;
    const cachedProducts = localStorage.getItem(cacheKey);

    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      const fetchProducts = async () => {
        try {
          const url = category
            ? `${esUrl}/Products/category/${encodeURIComponent(category)}`
            : `${esUrl}/Products`;

          console.log("Fetching:", url);

          const response = await fetch(url);
          const json = await response.json();

          if (response.ok) {
            setProducts(json);
            localStorage.setItem(cacheKey, JSON.stringify(json));
          } else {
            console.error("Failed to fetch products");
            setProducts([]);
          }
        } catch (err) {
          console.error("Error fetching products:", err);
          setProducts([]);
        }
      };

      fetchProducts();
    }
  }, [category]);

  const filteredProducts = products.filter(product =>
    (product.Product || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar
        cartCount={cart.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="homepage">
        <h1 className="page-title">
          {category ? `${category} Products` : 'Shop Products'}
        </h1>

        <div className="products-list1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`} className="product-link">
                  <div className="image-containerp">
                    <img src={product.Image} alt={product.Product} />
                  </div>
                  <h3 className="product-title">{product.Product}</h3>
                  <p className="product-price">{product.Price}</p>
                </Link>

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
            <p className="loading">No products found...</p>
          )}
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2025 MySite. All rights reserved.</p>
        <a href="https://www.instagram.com/the_boi_called_ozi/?hl=en">Contact Us</a>
      </footer>
    </>
  );
};

export default SmallPets;
