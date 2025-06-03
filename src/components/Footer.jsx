import React, { useState } from "react";
import "../styles/footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      setMessage("Veuillez entrer un email valide.");
      return;
    }
    // Simulation de l'envoi de mail
    setMessage(`Merci ${email} pour votre inscription à la newsletter !`);
    setEmail("");
  };

  return (
    <footer className="footer">
      {/* Haut */}
      <div className="footer-top">
        <div className="newsletter">
          <h3>Rejoignez notre newsletter</h3>
          <p>Recevez les dernières nouveautés et offres exclusives.</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>S'inscrire</button>
          </div>
          {message && <p className="message">{message}</p>}
        </div>
        <div className="footer-logo">
          <h1>Kicks</h1>
        </div>
      </div>

      {/* Bas */}
    <div className="footer-bottom">
        <div className="footer-column">
          <h4>À propos de nous</h4>
          <ul>
            <li>Notre histoire</li>
            <li>Notre équipe</li>
            <li>Nos valeurs</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Catégories</h4>
          <ul>
            <li>Basketball</li>
            <li>Running</li>
            <li>Casual</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>Contact</li>
            <li>Carrière</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Suivez-nous</h4>
          <ul className="socials">
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
