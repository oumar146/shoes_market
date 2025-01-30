import React from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import banniere from '../assets/banniere.jpg'
const Home = () => {
  return (
    <div>
      <Header />
      <img style={{maxWidth:'100%', width:"90vw", height:"45vw", margin:"auto"}} src={banniere}  alt="bannière" />
      <Categories />    
      <Newsletter/>
      <Footer />
    </div>
  );
};

export default Home;
