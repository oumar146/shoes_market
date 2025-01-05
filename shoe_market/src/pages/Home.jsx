import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import MoreArticle from "../components/MoreArticle";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <img style={{maxWidth:'100%'}} src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_2017,c_limit/e8cbbf1d-d889-43ea-bcd9-1fe0c6747d95/enfant-collection.jpg" />
      <Categories />    
      <img style={{maxWidth:'100%'}} src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_2017,c_limit/91c6bc00-1347-4cb9-afda-fd2751cf5dfe/chaussures-v%C3%AAtements-et-accessoires-pour-homme.jpg" />
      <MoreArticle />
      <Footer />
    </div>
  );
};

export default Home;
