import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import config from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Zoom from "@mui/material/Zoom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { UserContext } from "../context/UserContext";
import "../styles/cart.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/order/all`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Filtrer les commandes pour l'utilisateur actuel
    const userOrders = orders.filter((o) => o.user_email === user.email);
    setOrders(userOrders);
  }, [user]);

  // Regrouper les commandes par référence
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.reference]) {
      acc[order.reference] = [];
    }
    acc[order.reference].push(order);
    return acc;
  }, {});


  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <h5 className="title">Historique des commandes</h5>
      <main className="items-cart">
        {Object.keys(groupedOrders).length > 0 ? (
          Object.entries(groupedOrders).map(([reference, items], index) => (
            <Zoom in={true} key={reference}>
              <div className="order-container">
                <h3 className="order-title">
                <h3 className="order-title">
                  Commande {index + 1} - Passée le {items[0].created_at}
                </h3>                </h3>
                {items.map((item, itemIndex) => (
                  <div className="cart-item" key={`${item.product_id}-${itemIndex}`}>
                    <img src={item.product_image} alt={item.product_name} />
                    <div className="cart-item-details">
                      <span>{item.product_name}</span>
                      <span className="price">{item.product_price}€</span>
                      <span>Quantité : {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Zoom>
          ))
        ) : (
          <h4 className="no-product-message">
            Aucune commande dans votre historique <SentimentDissatisfiedIcon />
          </h4>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;