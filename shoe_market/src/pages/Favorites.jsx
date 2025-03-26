import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../context/FavoritesContext";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import config from "../config";
import { UserContext } from "../context/UserContext";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import ProductModal from "../components/ProductModal";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!user) return;
        const response = await axios.get(`${config.apiUrl}/product/offers`, {
          user_id: user.id,
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [user]);

  // Filtrer les produits pour ne garder que ceux présents dans favorites
  const filteredProducts = products.filter((product) =>
    favorites.includes(product.product_id)
  );

  const handleCloseModal = () => setShowModal(false);
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        border: "none",
      }}
    >
      {" "}
      <Header />
      <h5 className="title">Mes favoris</h5>
      <main className="product-list">
        {selectedProduct && (
          <ProductModal
            show={showModal}
            setShow={setShowModal}
            onHide={handleCloseModal}
            productDetails={selectedProduct}
          />
        )}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Box key={product.product_id} sx={{ display: "flex" }}>
              <Zoom in={true}>
                <div>
                  <Card
                    style={{
                      width: "18rem",
                      margin: "0rem 1rem",
                    }}
                  >
                    <CardHeader className="custom-card-header">
                      <AddIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleCardClick(product);
                        }}
                      />
                      {favorites.includes(product.product_id) ? (
                        <FavoriteIcon
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.product_id);
                          }}
                        />
                      ) : (
                        <FavoriteBorderIcon
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.product_id);
                          }}
                        />
                      )}
                    </CardHeader>
                    <Card.Img
                      variant="top"
                      src={product.image_url}
                      style={{ border: "none" }}
                    />
                  </Card>
                  <p className="product-info-card">
                    {product.product_name}
                    <br />
                    {product.price} €
                  </p>
                </div>
              </Zoom>
            </Box>
          ))
        ) : (
          <h4
            style={{ textAlign: "center", width: "100vw" }}
            className="no-product-message"
          >
            Aucune article dans vos favoris <SentimentDissatisfiedIcon />{" "}
          </h4>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
