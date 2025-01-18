import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import MoreArticle from "../components/MoreArticle";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div>
      <Header />
      {/* <Banner /> */}
      <img style={{maxWidth:'100%'}} src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1827,c_limit/8e8f85c8-787e-4bd1-ada0-250ff7610d10/chaussures-v%C3%AAtements-et-accessoires-pour-homme.jpg" />
      <Categories />    
      {/* <MoreArticle /> */}
      <Newsletter/>
      {/* <img style={{maxWidth:'100%'}} src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_2017,c_limit/91c6bc00-1347-4cb9-afda-fd2751cf5dfe/chaussures-v%C3%AAtements-et-accessoires-pour-homme.jpg" /> */}
      <Footer />
    </div>
  );
};

export default Home;
