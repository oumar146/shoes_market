import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/banner.css";

function Banner() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-text">
            <h2>Découvrez Notre Dernière Collection</h2>
            <p>
              Trouvez la paire de sneakers parfaite qui correspond à votre
              style.
            </p>
            <button className="shop-now-button">Achetez Maintenant</button>
          </div>
          <img
            className="d-block"
            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/87e2681b-cb90-4d18-9cb5-e9cca30f8b04/W+AIR+ZOOM+PEGASUS+41+PQ.png"
            alt="First slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="carousel-text">
            <h2>Marchez avec Confort</h2>
            <p>
              Découvrez l'élégance et le confort de nos chaussures de ville.
            </p>
            <button className="shop-now-button">Achetez Maintenant</button>
          </div>
          <img
            className="d-block"
            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c6d9d042-f0b9-46a3-bd1f-04e16541a1d9/W+AIR+FORCE+1+%2707+NEXT+NATURE.png"
            alt="Second slide"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
