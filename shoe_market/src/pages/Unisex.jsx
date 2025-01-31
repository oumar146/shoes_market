import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import Header from "../components/Header";
import AllProductList from "../components/AllProductList";
import SearchBar from "../components/SearchBar";
import OffcanvasFilter from "../components/OffcanvasFilter";
import "../styles/allOffer.css";

const Unisex = () => {
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);
  const [requestSent, setRequestSent] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/product/unisex`);
        setProducts(response.data.products);
        setRequestSent(true);
      } catch (error) {
        console.error(error)
      }
    };

    fetchProducts();
},[]);

  return (
    <div id="all-offers">
      <Header />
      <section id="search">
        <SearchBar input={input} setInput={setInput} />
        <OffcanvasFilter filters={filters} setFilters={setFilters} />
      </section>
      <div className="content">
      {requestSent && products.length > 0 &&<AllProductList input={input} filters={filters} products={products} />}
      </div>
    </div>
  );
};

export default Unisex;
