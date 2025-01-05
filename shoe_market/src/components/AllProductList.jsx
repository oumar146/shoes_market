import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "../styles/allProductList.css";
import config from "../config";

const AllProductList = ({ input }) => {
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/offers`);
        // Stocker toutes les offres
        setProducts(response.data.products);
        setRequestSent(true);
      } catch (error) {
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => { 
  
    setProductFilter(
      // filtrer les offres
      products.filter((product) => {
        const matchesUserFilter = user.id ? product.creator_id !== user.id : true;
        const matchesInputFilter =
          product.name.toLowerCase().includes(input.toLowerCase()) ||
          product.description.toLowerCase().includes(input.toLowerCase());
  
        return matchesUserFilter && matchesInputFilter;
      })
    );
  }, [input, products, user]);
  

  return (
    <div className="product-list">
      {error && <p className="error">{error}</p>}
      {requestSent && productFilter.length > 0 ? (
        productFilter.map(
          (product) =>
           
              <Card
                key={product.reference}
                style={{ width: "18rem", margin: "1rem", cursor: "pointer" }}
                onClick={() => navigate(`/offer/${product.reference}`)}
              >
                <Card.Img variant="top" src={product.image_url} />
                <Card.Body className="product-info">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    <span className="category">{product.category_name}</span>{" "}
                    <br />
                    <span className="price">{product.price}€</span>
                    <br />
                  </Card.Text>
                  <Button className="form-btn" variant="secondary">
                    Ajouter au panier
                  </Button>
                </Card.Body>
              </Card>
        )
      ) : (
        <h4 className="no-product-message">Aucune offre trouvée</h4>
      )}
    </div>
  );
};

export default AllProductList;
