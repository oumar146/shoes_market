import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "./UserContext";
import ProductModal from "./ProductModal";
import "../styles/allProductList.css";
import config from "../config";

const AllProductList = ({ input }) => {
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/offers`);
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
      products.filter((product) => {
        const matchesUserFilter = user ? product.creator_id !== user.id : true;
        const matchesInputFilter =
          product.name.toLowerCase().includes(input.toLowerCase()) ||
          product.description.toLowerCase().includes(input.toLowerCase());
        return matchesUserFilter && matchesInputFilter;
      })
    );
  }, [input, products, user]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="product-list">
      {error && <p className="error">{error}</p>}
      {requestSent && productFilter.length > 0 ? (
        productFilter.map((product) => (
          <Card
            key={product.reference}
            style={{ width: "18rem", margin: "1rem", cursor: "pointer" }}
            onClick={() => handleCardClick(product)}
          >
            <Card.Img variant="top" src={product.image_url} />
            <Card.Body className="offer-details" >
              <Card.Text>
               <span>{product.name}</span> <span className="price">{product.price}€</span> 
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h4 className="no-product-message">Aucune offre trouvée</h4>
      )}

      {/* Modal pour afficher les détails du produit */}
      {selectedProduct && (
        <ProductModal
          show={showModal}
          onHide={handleCloseModal}
          productDetails={selectedProduct}
        />
      )}
    </div>
  );
};

export default AllProductList;
