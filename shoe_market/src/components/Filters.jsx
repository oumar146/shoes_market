import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import "../styles/filters.css";

const Filters = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [priceRange, setPriceRange] = useState({
    priceMin: filters.priceMin || 0,
    priceMax: filters.priceMax || 500,
  });

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
  };

  return (
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
          {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50].map((size) => (
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
  );
};

export default Filters;
