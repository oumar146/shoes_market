import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProtectedRoute from "../ProtectedRoute";

const Details = ({ product }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useContext(UserContext);

  return (
    <div>
      {show && <ProtectedRoute />}
      {user && (
        <>
          <Button variant="black" className="form-btn" onClick={handleShow}>
            Détails
          </Button>

          <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>
                <h1>Détails de l'offre</h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div>
                  <label>Nom du produit:</label>
                  <input type="text" value={product.name} disabled />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea value={product.description} disabled />
                </div>
                <div>
                  <label>{"Taille (EU):"}</label>
                  <input type="text" value={product.size} disabled />
                </div>
                <div>
                  <label>Prix:</label>
                  <input
                    type="number"
                    step="5"
                    value={product.price}
                    disabled
                  />
                </div>
                <div>
                  <label>Categorie:</label>
                  <input type="text" value={product.category_name} disabled />
                </div>
                
                <Button variant="black" className="form-btn" onClick={handleClose}>
                  Fermer
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Details;
