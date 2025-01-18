import React, { useState } from "react";
import "../styles/newsletter.css"


const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email.trim() !== "") {
      // Simuler une inscription (peut être connecté à une API réelle)
      setSuccess(true);
      setEmail("");
    }
  };

  return (
    <div className="newsletter-container">
      <h2 className="title">Restez informé de nos dernières nouveautés</h2>
      <p className="newsletter-subtitle">
        Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et offres exclusives.
      </p>
      {success ? (
        <p className="newsletter-success">Merci pour votre inscription !</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Entrez votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-button">
            S'inscrire
          </button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
