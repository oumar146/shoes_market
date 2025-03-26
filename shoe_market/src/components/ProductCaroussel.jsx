import React, { useContext } from "react";
import Slider from "react-slick";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AddIcon from "@mui/icons-material/Add";
import { Card, CardHeader } from "react-bootstrap"; // Import des composants Card et CardHeader

const ProductCaroussel = ({ products, title }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Fonction pour gérer le clic sur l'icône AddIcon
  const handleAddClick = (product) => {
    // Vous pouvez implémenter une action ici, comme ouvrir un modal ou naviguer
    console.log("AddIcon clicked for product:", product);
    // Exemple : ouvrir un modal ou naviguer vers une autre page
    // navigate(`/product/${product.product_id}`);
  };

  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 400,
    initialSide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      {products.length > 0 && (
        <div>
          {title && <h4 className="carousel-title">{title}</h4>}
          <Slider {...settings} className="carousel custom-carousel">
            {products.map(
              (product) =>
                product.image_url && (
                  <div key={product.product_id}>
                    <Card
                      style={{
                        width: "100%",
                        border: "none",
                        padding: "0 2vh",
                      }}
                    >
                      {/* CardHeader pour les icônes */}
                      <CardHeader
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "none",
                          padding: "0.5rem",
                        }}
                      >
                        {/* Icône AddIcon */}
                        <AddIcon
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddClick(product);
                          }}
                        />
                        {/* Icônes de favoris */}
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
                              if (!user) navigate("/login");
                              e.stopPropagation();
                              toggleFavorite(product.product_id);
                            }}
                          />
                        )}
                      </CardHeader>
                      {/* Image du produit */}
                      <Card.Img
                        variant="top"
                        src={product.image_url}
                        alt={product.product_name}
                        style={{ border: "none" }}
                      />
                      {/* Informations du produit */}
                      <p className="product-info-card">
                        {product.product_name}
                        <br />
                        {product.price} €
                      </p>
                    </Card>
                  </div>
                )
            )}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductCaroussel;
