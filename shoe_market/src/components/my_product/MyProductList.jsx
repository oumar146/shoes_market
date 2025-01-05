import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Details from "./Details";
import EditForm from "./EditForm";
import "../../styles/myProductList.css";
import config from "../../config";

const MyProductList = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${config.apiUrl}/product/delete`, {
        data: { product_id: productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Mettre à jour l'état pour retirer le produit supprimé
      setProducts(products.filter((product) => product.id !== productId));
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Notre serveur est en panne. Veuillez réessayer plus tard."
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        // Répurer les offres d'un utilisateur
        const response = await axios.post(
          `${config.apiUrl}/product/my-offers`,
          {
            user_id: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.products);
        setRequestSent(true);
      } catch (error) {
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProducts();
  }, [user.id]);

  return (
    <div className="product-list">
      {error && <p className="error">{error}</p>}
      {products &&
        products.map((product) => (
          <Card key={product.id} style={{ width: "18rem", margin: "1rem" }}>
            <Card.Img variant="top" src={product.image_url} />
            <Card.Body>
              <Card.Title>
                <span>{product.name}</span>
              </Card.Title>
              <Card.Text>
                Date de création: {formatDate(product.creation_date)} <br />
              </Card.Text>
              {/* // button pour modifier un produit  */}
              <EditForm product={product} />
              {/* // button pour voir les détails d'un produit  */}
              <Details product={product} />
              {/* // button pour supprimer un produit  */}
              <Button
                className="form-btn"
                variant="danger"
                onClick={() => {
                  deleteProduct(product.id);
                }}
              >
                Supprimer
              </Button>
            </Card.Body>
          </Card>
        ))}
      {/* S'il n'y a pas de produit afficher un message */}
      {requestSent && !(products.length > 0) && (
        <h4 className="no-product-message">
          Vous n'avez pas encore créé de produit. Commencez maintenant en
          ajoutant votre premier produit !
        </h4>
      )}
    </div>
  );
};

export default MyProductList;
