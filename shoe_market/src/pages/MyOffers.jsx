import React, { useContext } from "react";
import Header from "../components/Header";
import ProductForm from "../components/my_product/ProductForm";
import MyProductList from "../components/my_product/MyProductList";
import TokenChecker from "../components/TokenChecker";
import { UserContext } from "../components/UserContext"; // Import du contexte utilisateur

const MyOffers = () => {
  const { user } = useContext(UserContext); // Utilisation du contexte

  return (
    <div>
      <TokenChecker />
      <Header />
      {user && (
        <div>
          <ProductForm user={user} />
          <MyProductList user={user} />
        </div>
      )}
    </div>
  );
};

export default MyOffers;
