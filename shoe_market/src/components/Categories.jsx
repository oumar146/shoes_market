import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/categories.css";
import config from "../config";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setError("Erreur lors de la récupération des catégories.");
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="categories">
      {error && <p className="error">{error}</p>}
      <h2>Chercher par Catégorie</h2>
      <div className="category-list">
        {categories &&
          categories.map((category) => (
            <div key={category.name} className="category-item">
              {category.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;
