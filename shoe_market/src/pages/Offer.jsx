import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
import "../styles/offer.css";
import config from "../config";

const Offer = () => {
  const { reference } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/product/${reference}`
        );
        setProduct(response.data.product);
      } catch (error) {
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProduct();
  }, [reference]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!product) {
    return <p className="loading-message">Chargement en cours...</p>;
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // Livraison dans 5 jours

  return (
    <div className="product-container">
      <Header />
      <div className="product-details">
        <div className="image-container">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="details">
          <h2>{product.name}</h2>
          <p className="price">
            {product.price}€ <span className="tax-included">(TVA incluse)</span>
          </p>
          <p>
            <strong>Date de livraison estimée :</strong>{" "}
            {estimatedDelivery.toLocaleDateString()}
          </p>
          <p>
            <strong>Taille disponible :</strong>{" "}
            {product.size ? product.size : "Taille unique"}
          </p>
          <p className="description">
            <strong>Description :</strong> {product.description}
          </p>
          <button className="add-to-cart-btn">Ajouter au panier</button>
          <button className="buy-now-btn">Acheter maintenant</button>
          <p className="contact">
            <strong>Contact :</strong>{" "}
            <a href={`mailto:${product.creator_email}`}>
              {product.creator_email}
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Offer;
