import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import TokenChecker from "./TokenChecker";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* Appeler TokenChecker pour vérifier la validité du token */}
      {user && <TokenChecker />}
      {/* Rendre la route protégée si l'utilisateur est connecté */}
      {children}
    </>
  );
};

export default ProtectedRoute;
