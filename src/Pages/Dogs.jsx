import React, { useEffect, useState } from 'react';
import NavBar from '../Component/NavBar/NavBar';
import './Dogs.css';

// Use localhost instead of esUrl
const esUrl =  import.meta.env.ELASTIC_IP || 'http://98.94.158.209:3000';

const Dogs = ({ addToCart, cart = [], category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url;

        // Fetch by category if provided
        if (category) {
          url = `${esUrl}/Products/category/${encodeURIComponent(category)}`;
        } else {
          // Otherwise fetch all products
          url = `${esUrl}/Products`;
        }

        console.log("Fetching:", url);

        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
          setProducts(json);
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
  }, [category]);
  
  const [searchQuery, setSearchQuery] = useState('')
  //Apply search filter
  const filteredProducts = products.filter(product =>
    (product.Product || '').toLowerCase().includes((searchQuery || '').toLowerCase())
  );


  
  return (
    <div className="homepage">
        <NavBar cartCount={cart.length}
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      />   {/* ✅ use cart from props */}
      <h1 className="page-title">
        {category ? `${category} Products` : 'Shop Products'}
      </h1>

      <div className="products-list1">
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
  );
};

export default Dogs;
