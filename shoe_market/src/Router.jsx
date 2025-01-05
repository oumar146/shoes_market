import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/UserContext";

// Import des pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import MyOffers from "./pages/MyOffers";
import AllOffers from "./pages/AllOffers";
import Offer from "./pages/Offer";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

// Import de ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

// Définir les routes
const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/my-offers", element: <MyOffers /> },
  { path: "/all-offers", element: <AllOffers /> },
  { path: "/offer/:reference", element: <Offer /> },
];

const Router = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques accessibles sans être connecté */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Routes protégées */}
          {routes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default Router;
