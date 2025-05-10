import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import config from "../config";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import ClearIcon from "@mui/icons-material/Clear";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Button } from "@headlessui/react";
import "../styles/cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  // Fonction pour ajouter le prix à chaque item du panier
  const getCartWithPrices = () => {
    return cart.map((item) => {
      const product = products.find((p) => p.product_id === item.product_id);
      return {
        ...item,
        price: product ? product.price : 0, // Ajoute le prix à l'item
      };
    });
  };

  // Calculer le total du panier
  const total = getCartWithPrices().reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  const handleSubmit = async (cart, user_id, total) => {

    if (!cart.length > 0 || !user_id || !total) {
      alert("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const orders = cart.map((item) => ({
        product_id: item.product_id,
        user_id: user_id,
        unit_price: item.price, // Utilisation directe de item.price
        status_id: 1,
        amount: total,
        quantity: item.quantity,
      }));

      const response = await axios.post(`${config.apiUrl}/order/new`, { orders });
      orders.map((order)=>{
      removeFromCart(order.product_id);
      return null;

      })
      if (response.data.success) {
        alert("Commande passée avec succès !");
      } else {
        alert("Erreur lors de la commande : " + response.data.message);
      }

    } catch (error) {
      console.error("Erreur lors de la commande :", error);
      alert("Une erreur est survenue lors de la commande.");
    }
  };

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

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <h5 className="title">Mon panier</h5>
      <main className="items-cart">
        {cart.length > 0 ? (
          getCartWithPrices().map((item, index) => {
            const product = products.find((p) => p.product_id === item.product_id);
            if (!product) return null;

            return (
              <Zoom in={true} key={`${item.product_id}-${item.size}-${index}`}>
                <div className="cart-item">
                  <img src={product.image_url} alt={product.product_name} />
                  <div className="cart-item-details">
                    <span>{product.product_name}</span>
                    <span className="price">{item.price}€</span> {/* Utilisation directe de item.price */}
                    <span>Quantité : {item.quantity}</span>
                    <span>Taille : {item.size}</span>
                  </div>
                  <div className="cart-item-actions">
                    <ClearIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeFromCart(item.product_id);
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
          <Button
            variant="none"
            className="btn-style"
            onClick={() => {
              handleSubmit(getCartWithPrices(), user.id, total.toFixed(2));
            }}
          >
            Valider
          </Button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;