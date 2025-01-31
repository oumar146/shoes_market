import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "react-bootstrap";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../context/FavoritesContext";
import AddIcon from "@mui/icons-material/Add";
import ProductModal from "./ProductModal";
import "../styles/allProductList.css";

import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";

const AllProductList = ({ input, filters, products, error = false }) => {
  const [productFilter, setProductFilter] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (products) {
      setProductFilter(
        products.filter((product) => {
          const matchesInputFilter =
            product.product_name.toLowerCase().includes(input.toLowerCase()) ||
            product.description.toLowerCase().includes(input.toLowerCase());
          const matchesSizeFilter = filters.size
            ? product.size === filters.size
            : true;
          const matchesCategoryFilter = filters.category
            ? product.category_name.toLowerCase() ===
              filters.category.toLowerCase()
            : true;
          const matchesPriceFilter =
            (filters.priceMin
              ? parseFloat(product.price) >= parseFloat(filters.priceMin)
              : true) &&
            (filters.priceMax
              ? parseFloat(product.price) <= parseFloat(filters.priceMax)
              : true);
          const matchesDateFilter = filters.date
            ? new Date(product.creation_date) >= new Date(filters.date)
            : true;

          return (
            matchesInputFilter &&
            matchesSizeFilter &&
            matchesCategoryFilter &&
            matchesPriceFilter &&
            matchesDateFilter
          );
        })
      );
    }
  }, [input, products, filters]);

  const handleCloseModal = () => setShowModal(false);
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <div className="product-list">
      {selectedProduct && (
        <ProductModal
          show={showModal}
          setShow={setShowModal}
          onHide={handleCloseModal}
          productDetails={selectedProduct}
        />
      )}

      {error && <p className="error">{error}</p>}
      {productFilter.length > 0 ? (
        productFilter.map((product) => (
            <Box key={product.reference} sx={{ display: "flex" }}>
              <Zoom in={true}>
                <Card
                  style={{
                    width: "18rem",
                    margin: "0rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  <CardHeader>
                    <AddIcon
                      onClick={() => {
                        handleCardClick(product);
                      }}
                    />
                    {favorites.includes(product.product_id) ? (
                      <FavoriteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.product_id);
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.product_id);
                        }}
                      />
                    )}
                  </CardHeader>
                  <Card.Img variant="top" src={product.image_url} />
                  <Card.Body className="offer-details">

                      <Card.Text>
                        <span>{product.product_name}</span>
                        <span className="price">{product.price}€</span>
                      </Card.Text>
                  </Card.Body>
                </Card>
              </Zoom>
          </Box>
        ))
      ) : (
        <h4
          style={{ textAlign: "center", width: "90vw" }}
          className="no-product-message"
        >
          Aucune offre trouvée
        </h4>
      )}
    </div>
  );
};

export default AllProductList;
