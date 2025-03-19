import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useCart } from "../context/CartContext";
import config from "../config";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../styles/productModal.css";

const ProductModal = ({ show, setShow, onHide, productDetails }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(productDetails?.price || 0);
  const { user } = useContext(UserContext);
  const { addToCart } = useCart();

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false); // État pour gérer l'erreur de taille

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/sizes`);
        setSizes(response.data.sizes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSizes();
  }, []);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setSizeError(false); // Réinitialiser l'erreur lorsque l'utilisateur sélectionne une taille
  };

  useEffect(() => {
    if (show) {
      setQuantity(1);
      setTotal(productDetails?.price || 0);
      setSelectedSize("");
      setSizeError(false); // Réinitialiser l'erreur lorsque le modal s'ouvre
    }
  }, [show, productDetails]);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotal(newQuantity * (productDetails?.price || 0));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setTotal(newQuantity * (productDetails?.price || 0));
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      setTotal(newQuantity * (productDetails?.price || 0));
    }
  };

  const handleAddToCart = async (user, productId, quantity) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Vérifier si une taille a été sélectionnée
    if (!selectedSize) {
      setSizeError(true); // Afficher l'erreur si aucune taille n'est sélectionnée
      return;
    }

    try {
      addToCart(productId, quantity, selectedSize);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-component">
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
        dialogClassName="custom-modal-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>{productDetails?.product_name || "Produit"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content-container">
            {/* Image à gauche */}
            <div>
              <img
                src={
                  productDetails?.image_url ||
                  "https://via.placeholder.com/300x450?text=Image+non+disponible"
                }
                alt={productDetails?.name || "Image non disponible"}
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            </div>

            {/* Infos à droite */}
            <div className="product-info">
              <p>
                <strong>Prix :</strong>{" "}
                {productDetails?.price
                  ? `${productDetails.price} €`
                  : "Non disponible"}
              </p>
              <p>
                <strong>Catégorie :</strong>{" "}
                {productDetails?.category_name || "Non disponible"}
              </p>
            </div>
          </div>

          {/* Sélecteur de taille avec InputLabel et FormHelperText */}
          <FormControl
            sx={{ margin: "10px 0px", minWidth: "100%" }}
            error={sizeError}
          >
            <InputLabel id="demo-simple-select-helper-label">Taille</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={selectedSize}
              label="Taille"
              onChange={handleSizeChange}
            >
              <MenuItem value="">
                <em>Aucune</em>
              </MenuItem>
              {sizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
            {sizeError && (
              <FormHelperText style={{ color: "red" }}>
                Veuillez sélectionner une taille
              </FormHelperText>
            )}
          </FormControl>

          {/* Champ de saisie pour la quantité avec boutons + et - */}
          <Form.Group controlId="quantity">
            <Form.Label>Quantité :</Form.Label>
            <InputGroup>
              <Button
                className="btn"
                variant="outline-secondary"
                onClick={decreaseQuantity}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  padding: "0",
                  minWidth: "unset",
                }}
              >
                <RemoveIcon />
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                style={{ border: "none", textAlign: "center" }}
              />
              <Button
                className="btn"
                variant="outline-secondary"
                onClick={increaseQuantity}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  padding: "0",
                  minWidth: "unset",
                }}
              >
                <AddIcon onClick={increaseQuantity} />
              </Button>
            </InputGroup>
          </Form.Group>

          {/* Affichage de la somme totale */}
          <p>
            <strong>Total :</strong> {total} €
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="none"
            className="btn-style"
            onClick={() => {
              handleAddToCart(user, productDetails.product_id, quantity);
            }}
          >
            Ajouter au panier
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductModal;
