import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/categories.css";
import { NavLink } from "react-router-dom";
import config from "../config";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        const fetchedCategories = response.data.categories;

        // Ajout des images spécifiques pour certaines catégories
        const updatedCategories = fetchedCategories.map((category) => {

          switch (category.name.toLowerCase()) {
            case "sneakers":
              return {
                ...category,
                image:
                  "https://img01.ztat.net/article/spp-media-p1/f0062441b3d548f8b964e93121b01c35/2642b005868f439caf0c0c18f84a5734.jpg?imwidth=1800",
              };
            case "chaussures de sport":
              return {
                ...category,
                image:
                  "https://img01.ztat.net/cnt/contentful-apps/uploads/972f4a04-d29d-4da8-b374-2e6a55e89b7d.jpeg?imwidth=336",
              };
            case "bottes":
              return {
                ...category,
                image:
                  "https://img01.ztat.net/outfit/2ed4b58dd45e498294824044e70b6a39/5f0e1e4d3730491fb20d926f1830e65b.jpg?imwidth=600",
              };
              case "talons":
                return {
                  ...category,
                  image:
                    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/22ccc03e-b68a-4934-983b-3ea7808222b8/PHANTOM+GX+II+ELITE+FG.png",
                };
                case "chaussons":
                  return {
                    ...category,
                    image:
                      "https://img01.ztat.net/outfit/2860b3c4c3be4c02bc1a3647179e1a13/c28a07257eb849dbb6da608f4ce9b810.jpg?imwidth=1800",
                  };
            default:
              return category;
          }
        });

        setCategories(updatedCategories);
  
        } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setError("Erreur lors de la récupération des catégories.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="categories">
      {error && <p className="error">{error}</p>}
      <h2 className="title bg-white">Nos Catégories</h2>
      <div className="category-grid">
        {categories &&
          categories.map((category) => (
            <NavLink
              key={category.name}
              to={`/cart/${category.slug}`} // Supposant que chaque catégorie a un slug pour générer les routes
              className="category-item"
              onClick={() => window.scrollTo(0, 0)}
            >
              <img
                src={category.image} // Image associée à la catégorie
                alt={category.name}
                className="category-image"
              />
              <h3 className="category-title">{category.name}</h3>
            </NavLink>
          ))}
      </div>
    </section>
  );
};

export default Categories;
