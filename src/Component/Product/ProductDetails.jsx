import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./ProductDetails.css";

const esUrl = import.meta.env.ELASTIC_IP || "http://98.94.158.209:3000";

const ProductDetail = ({ addToCart, cart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");   // ✅ FIX ADDED

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${esUrl}/Products/${id}`);
        const data = await res.json();

        console.log("Fetched product data:", data);  // 🔍 DEBUG THIS

        setProduct(data);
        setRatings([]);
        setReviews([]);

      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
      <NavBar 
        cartCount={cart.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="product-detail-page">
        <div className="detail-left">
          <img src={product.Image} alt={product.Product} />
        </div>

        <div className="detail-right">
          <h1>{product.Product}</h1>
          <h2>{product.Price}</h2>

          {product.Description && <p>{product.Description}</p>}

          <button 
            className="btn-add-to-cart"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 MySite. All rights reserved.</p>
        <a href="#contact">Contact Us</a>
      </footer>
    </>
  );
};

export default ProductDetail;
