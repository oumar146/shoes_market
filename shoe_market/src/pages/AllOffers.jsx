import React, { useState } from "react";
import Header from "../components/Header";
import AllProductList from "../components/AllProductList";
import SearchBar from "../components/SearchBar";

const AllOffers = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      <Header />
      <SearchBar input={input} setInput={setInput} />
      <AllProductList input={input} />
    </div>
  );
};

export default AllOffers;
