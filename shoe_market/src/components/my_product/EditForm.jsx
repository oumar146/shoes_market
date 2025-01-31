import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import config from "../../config";

const EditForm = ({ product }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  useEffect(() => {
    // Charger les données du produit dans le formulaire lorsque le produit change
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setSize(product.size || "");
      setPrice(product.price || "");
      setCategoryName(product.category_name || "");
      setImage(product.image_url || "");
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        // Mettre à jour les catégories
        setCategories(response.data.categories);
      } catch (error) {
        setError("Notre serveur est en panne. Veuillez réessayer plus tard.");
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !size || !price || !categoryName || !image) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    const formData = {
      name: name,
      description: description,
      size: size,
      price: price,
      category_name: categoryName,
      product_id: product.id,
    };
    if (image) formData.image = image;

    try {
      // Mettre à jour les informations sur le produit
      const token = localStorage.getItem("token");
      console.log(formData);
      await axios.put(`${config.apiUrl}/product/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setError(null);
      setName("");
      setDescription("");
      setSize("");
      setPrice("");
      setCategoryName("");
      setImage(null);
      handleClose();
      refreshPage();
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Notre serveur est en panne. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <div>
      {show && <ProtectedRoute />}
      {user && (
        <>
          <Button variant="black" className="form-btn" onClick={handleShow}>
            Modifier
          </Button>

          <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>
                <h1>Modifier l'offre</h1>
                {error && <p className="error">{error}</p>}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Nom du produit:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>{"Taille (EU):"}</label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Prix:</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    inputMode="numeric"
                    required
                  />
                </div>
                <div>
                  <label>Categorie:</label>
                  <select
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Remplacer l'image : </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                  />
                </div>
                <Button className="form-btn" variant="black" type="submit">
                  Modifier
                </Button>
              </form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default EditForm;
