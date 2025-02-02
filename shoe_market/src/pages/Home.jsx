import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import banniere from '../assets/banniere.jpg';
import ProductCaroussel from "../components/ProductCaroussel";
import axios from "axios";
import config from "../config";
import '../styles/home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/category/get`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/offers`);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Grouper les produits par catégorie
  useEffect(() => {
    if (products.length > 0 && categories.length > 0) {
      const groupedProducts = {};

      categories.forEach((category) => {
        groupedProducts[category.name] = products.filter(
          (product) => product.category_name === category.name
        );
      });

      setProductsByCategory(groupedProducts);
    }
  }, [products, categories]);

  return (
    <div className="home-container">
      <Header />
      <div className="banner-container">
        <img src={banniere} alt="bannière" className="home-banner" />
      </div>

      {/* Afficher un carrousel pour chaque catégorie */}
      <div className="carousels-container">
        {categories.map((category) => (
          <div key={category.id} className="category-carousel">
            <ProductCaroussel
              title={category.name}
              products={productsByCategory[category.name] || []} // Passer les produits de la catégorie
            />
          </div>
        ))}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;