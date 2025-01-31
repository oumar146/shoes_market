import React, { useState, useEffect } from "react";
import Slider from "react-slick";


// import MoviesModal from "./MovieModal";
// import "../styles/moviesCarousel.css";

const ProductCaroussel = ({products, title}) => {
//   const { openMovieModal, closeMovieModal } = useModal();
  const [modalShow, setModalShow] = useState(false);


  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 700,
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

  const openModal = (movie) => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
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
                    onClick={() => openModal(product)}
                  >
                    <img
                      src={product.image_url}
                      alt={product.image_url}
                      title={product.product_name}
                    />
                    <p className="product-title">
                      {product.product_name}
                    </p>
                  </div>
                )
            )}
          </Slider>
        </div>
      )}

      {/* Modal */}
      {/* {modalShow && movieDetails && (
        <MoviesModal
          closeModal={closeModal}
          movieDetails={movieDetails}
          modalShow={modalShow}
        />
      )} */}
    </div>
  );
};

export default ProductCaroussel;
