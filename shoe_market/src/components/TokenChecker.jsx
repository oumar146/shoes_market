import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../context/UserContext";
import config from "../config";

const TokenChecker = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { updateUser } = useContext(UserContext);

  const checkTokenValidity = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      updateUser(null);
      setShowModal(true);
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
      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
      updateUser(null);
      setShowModal(true);
      return false;
    }
  }, [updateUser]);

  useEffect(() => {
    const checkToken = async () => {
      await checkTokenValidity();
    };
    checkToken();
  }, [navigate, updateUser, checkTokenValidity]);

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
          <Modal.Dialog style={{ margin: "auto", marginTop: "15%", backgroundColor: "white" }}>
            <Modal.Header>
              <Modal.Title>Session Expirée</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Votre session a expiré.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button style={{ outline: "none", border: "1px solid white" }} onClick={handleRedirectHome}>
                Accueil
              </Button>
              <Button style={{ outline: "none", border: "1px solid white" }} onClick={handleRedirectLogin}>
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
