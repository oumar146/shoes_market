import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect, useContext } from "react";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import config from "../config";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import ClearIcon from "@mui/icons-material/Clear";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import "../styles/cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!user) return;
        const response = await axios.get(`${config.apiUrl}/product/offers`, {
          params: { user_id: user.id },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [user]);

  // Calculer le total du panier
  const total = cart.reduce((acc, item) => {
    const product = products.find((p) => p.product_id === item.product_id);
    if (product) {
      return acc + parseFloat(product.price) * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <h5 className="title">Mon panier</h5>
      <main className="items-cart">
        {cart.length > 0 ? (
          cart.map((item, index) => {
            const product = products.find(
              (p) => p.product_id === item.product_id
            );
            if (!product) return null;

            return (
              <Zoom in={true} key={`${item.product_id}-${item.size}-${index}`}>
                <div className="cart-item">
                  <img src={product.image_url} alt={product.product_name} />
                  <div className="cart-item-details">
                    <span>{product.product_name}</span>
                    <span className="price">{product.price}€</span>
                    <span>Quantité : {item.quantity}</span>
                    <span>Taille : {item.size}</span>
                  </div>
                  <div className="cart-item-actions">
                    <ClearIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        // Supprimer cette entrée spécifique du panier
                        removeFromCart(item.id);
                      }}
                    />
                  </div>
                </div>
              </Zoom>
            );
          })
        ) : (
          <h4 className="no-product-message">
            Aucune article dans votre panier <SentimentDissatisfiedIcon />
          </h4>
        )}
      </main>
      {cart.length > 0 && (
        <div className="cart-total">
          <h4>Total : {total.toFixed(2)}€</h4>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
