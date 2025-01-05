import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; // Import du contexte utilisateur
import {
  Navbar,
  Offcanvas,
  Container,
  Nav,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import "../styles/header.css";

const Header = () => {
  const { user, updateUser } = useContext(UserContext); // Utilisation du contexte
  const navigate = useNavigate();

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    updateUser(null); // Effacer l'utilisateur du contexte
    navigate("/home");
    localStorage.removeItem("token"); // Supprimer le token du localStorage
  };

  return (
    <>
      <Navbar expand="md">
        <Container fluid className="header">
          <Navbar.Brand
            onClick={() => {
              navigate("/home");
            }}
            style={{ cursor: "pointer" }}
          >
            Shoe<span>Market</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav>
                <Nav.Link onClick={() => navigate("/about")}>À propos</Nav.Link>
                <Nav.Link onClick={() => navigate("/contact")}>
                  Contact
                </Nav.Link>
                {user && (
                  <Nav.Link onClick={() => navigate("/my-offers")}>
                    Mes offres
                  </Nav.Link>
                )}
                <Nav.Link onClick={() => navigate("/all-offers")}>
                  Toutes les offres
                </Nav.Link>

                <NavDropdown title="Mon compte">
                  <NavDropdown.Item>Profil</NavDropdown.Item>
                  <NavDropdown.Item>Commandes</NavDropdown.Item>
                  <NavDropdown.Item>Paramètres</NavDropdown.Item>
                  <NavDropdown.Item>Notifications</NavDropdown.Item>
                  <NavDropdown.Item>Favoris</NavDropdown.Item>
                  {user ? (
                    <>
                      <Dropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Se déconnecter
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <NavDropdown.Item onClick={() => navigate("/login")}>
                      Se connecter
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
