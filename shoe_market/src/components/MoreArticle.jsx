import React from "react";
import "../styles/moreArticle.css";

const MoreArticle = () => {
  return (
    <section className="more-article">
      <div className="article-item">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_563,c_limit/71f8d057-67bb-4f9b-b42e-7370c916bf2d/nike-just-do-it.jpg"
          alt="Femme"
        />
        <div className="article-text">Femme</div>
      </div>
      <div className="article-item">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_563,c_limit/04829267-e886-464b-bcc8-c2ee1eec061d/nike-just-do-it.jpg"
          alt="Homme"
        />
        <div className="article-text">Homme</div>
      </div>
      <div className="article-item">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_563,c_limit/9e813c49-e7c5-435f-9e84-42ca938c5e1d/nike-just-do-it.jpg"
          alt="Enfant"
        />
        <div className="article-text">Enfant</div>
      </div>
    </section>
  );
};

export default MoreArticle;
