import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 ShoeStore. All rights reserved.</p>
      <div className="social-links">
        <a href="#facebook">Facebook</a>
        <a href="#instagram">Instagram</a>
        <a href="#twitter">Twitter</a>
      </div>
    </div>
  );
};

export default Footer;
