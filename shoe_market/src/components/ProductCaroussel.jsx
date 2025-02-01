import React, { useContext } from "react";
import Slider from "react-slick";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProductCaroussel = ({ products, title }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

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
                  <div
                    key={product.product_id}
                    className="product-card"
                  >
                    <div className="">
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
                            if (!user) navigate("/login");
                            e.stopPropagation();
                            toggleFavorite(product.product_id);
                          }}
                        />
                      )}
                    </div>
                    <img
                      src={product.image_url}
                      alt={product.image_url}
                      title={product.product_name}
                    />
                    <p className="product-title">{product.product_name}</p>
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
