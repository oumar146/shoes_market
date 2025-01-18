import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import "../styles/filters.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const OffcanvasFilter = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [priceRange, setPriceRange] = useState({
    priceMin: filters.priceMin || 0,
    priceMax: filters.priceMax || 500,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Récupération des catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };
    fetchCategories();
  }, []);

  // Mise à jour des prix avec blocage
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10);

    setPriceRange((prev) => {
      if (
        (name === "priceMin" && parsedValue > prev.priceMax) ||
        (name === "priceMax" && parsedValue < prev.priceMin)
      ) {
        return prev;
      }
      const updatedRange = { ...prev, [name]: parsedValue };
      setLocalFilters((prevFilters) => ({
        ...prevFilters,
        priceMin: updatedRange.priceMin,
        priceMax: updatedRange.priceMax,
      }));
      return updatedRange;
    });
  };

  // Mise à jour des autres filtres localement
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Réinitialisation des filtres
  const resetFilters = () => {
    const defaultFilters = {
      size: "",
      category: "",
      priceMin: 0,
      priceMax: 500,
      date: "",
    };
    setLocalFilters(defaultFilters);
    setPriceRange({
      priceMin: 0,
      priceMax: 500,
    });
  };

  // Application des filtres
  const applyFilters = () => {
    setFilters(localFilters);
    handleClose();
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="30"
          fill="currentColor"
          className="bi bi-filter"
          viewBox="0 0 16 16"
        >
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtres</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="filters">
            {/* Taille */}
            <div>
              <label htmlFor="size">Taille :</label>
              <select
                name="size"
                id="size"
                value={localFilters.size || ""}
                onChange={handleChange}
              >
                <option value="">Toutes les tailles</option>
                {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Catégorie */}
            <div>
              <label htmlFor="category">Catégorie :</label>
              <select
                name="category"
                id="category"
                value={localFilters.category || ""}
                onChange={handleChange}
              >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Curseurs pour le prix */}
            <div>
              <label htmlFor="priceMin">Prix Min : {priceRange.priceMin}€</label>
              <input
                type="range"
                name="priceMin"
                id="priceMin"
                min="0"
                max="1000"
                step="10"
                value={priceRange.priceMin}
                onChange={handlePriceChange}
              />
            </div>
            <div>
              <label htmlFor="priceMax">Prix Max : {priceRange.priceMax}€</label>
              <input
                type="range"
                name="priceMax"
                id="priceMax"
                min="0"
                max="1000"
                step="10"
                value={priceRange.priceMax}
                onChange={handlePriceChange}
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date">Date (après) :</label>
              <input
                type="date"
                name="date"
                id="date"
                value={localFilters.date || ""}
                onChange={handleChange}
              />
            </div>

            {/* Boutons */}
            <div className="filter-buttons">
              <button type="button" onClick={applyFilters}>
                Appliquer les filtres
              </button>
              <button type="button" onClick={resetFilters}>
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default OffcanvasFilter;
