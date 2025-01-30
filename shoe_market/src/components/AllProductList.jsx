import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card} from "react-bootstrap";
import { UserContext } from "./UserContext";
import ProductModal from "./ProductModal";
import "../styles/allProductList.css";
import config from "../config";

const AllProductList = ({ input, filters }) => {
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
    console.log(products)
    products && setProductFilter(
      products.filter((product) => {
        const matchesUserFilter = user ? product.creator_id !== user.id : true;
        const matchesInputFilter =
          product.product_name.toLowerCase().includes(input.toLowerCase()) ||
          product.description.toLowerCase().includes(input.toLowerCase());
        const matchesSizeFilter = filters.size
          ? product.size === filters.size
          : true;
        const matchesCategoryFilter = filters.category
          ? product.category_name.toLowerCase() === filters.category.toLowerCase()
          : true;
        const matchesPriceFilter =
          (filters.priceMin ? parseFloat(product.price) >= parseFloat(filters.priceMin) : true) &&
          (filters.priceMax ? parseFloat(product.price) <= parseFloat(filters.priceMax) : true);
        const matchesDateFilter = filters.date
          ? new Date(product.creation_date) >= new Date(filters.date)
          : true;

        return (
          matchesUserFilter &&
          matchesInputFilter &&
          matchesSizeFilter &&
          matchesCategoryFilter &&
          matchesPriceFilter &&
          matchesDateFilter
        );
      })
    );
  }, [input, products, user, filters]);
  

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
            style={{ width: "18rem", margin: "0rem 1rem", cursor: "pointer" }}
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
        <h4 style={{textAlign:"center", width:"90vw"}} className="no-product-message">Aucune offre trouvée</h4>
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
