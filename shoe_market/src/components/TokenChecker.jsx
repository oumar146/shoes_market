import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../context/UserContext"; // Import du contexte utilisateur
import config from "../config";

const TokenChecker = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { updateUser } = useContext(UserContext); // Utilisation du contexte

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      updateUser(null); // Déconnecter l'utilisateur
      setShowModal(true); // Afficher le modal
      return false;
    }

    try {
      const response = await axios.get(`${config.apiUrl}/user/token-check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.newToken) {
        localStorage.setItem("token", response.data.newToken);
      }
      return true; // Token valide
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
      updateUser(null); // Déconnecter l'utilisateur
      setShowModal(true); // Afficher le modal
      return false; // Token invalide
    }
  };

  // Vérification du token lors du chargement de la route protégée
  useEffect(() => {
    const checkToken = async () => {
      checkTokenValidity();
      // if (!isValid) {
      //   console.log("Le token est invalide, affichage du modal.");
      // } else {
      //   console.log("Le token est valide.");
      // }
    };

    checkToken();
  }, [navigate, updateUser]);

  // Gestion des redirections lorsque la session expire
  const handleRedirectHome = () => {
    setShowModal(false);
    navigate("/#/home");
  };
  const handleRedirectLogin = () => {
    setShowModal(false);
    navigate("/#/login");
  };

  return (
    <>
      {showModal && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1040,
            color: "white",
          }}
        >
          <Modal.Dialog
            style={{
              margin: "auto",
              marginTop: "15%",
              backgroundColor: "white",
            }}
          >
            <Modal.Header >
              <Modal.Title>Session Expirée</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Votre session a expiré.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                style={{ outline: "none", border: "1px solid white" }}
                onClick={handleRedirectHome}
              >
                Accueil
              </Button>
              <Button
                style={{ outline: "none", border: "1px solid white" }}
                onClick={handleRedirectLogin}
              >
                Se connecter
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
};

export default TokenChecker;
