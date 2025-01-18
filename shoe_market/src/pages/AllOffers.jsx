import React, { useState } from "react";
import Header from "../components/Header";
import AllProductList from "../components/AllProductList";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import OffcanvasFilter from "../components/OffcanvasFilter";
import "../styles/allOffer.css";

const AllOffers = () => {
  const [input, setInput] = useState("");
  const [filters, setFilters] = useState({});

  return (
    <div id="all-offers">
      <Header />
      <section id="search">
      <SearchBar input={input} setInput={setInput} />
      <OffcanvasFilter filters={filters} setFilters={setFilters} />
      </section>
      <div className="content">
        <div className="filter">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
        <AllProductList input={input} filters={filters} />
      </div>
    </div>
  );
};

export default AllOffers;
