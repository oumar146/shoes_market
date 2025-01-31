import { HashRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from "./context/CartContext";

// Import des pages
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Home from "./pages/Home";
import MyOffers from "./pages/MyOffers";
import Offer from "./pages/Offer";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Unisex from "./pages/Unisex";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
// Import de ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

// Définir les routes
const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/my-offers", element: <MyOffers /> },
  { path: "/offer/:reference", element: <Offer /> },
  { path: "/product/men", element: <Men /> },
  { path: "/product/women", element: <Women /> },
  { path: "/product/unisex", element: <Unisex /> },
  { path: "/cart", element: <Cart /> },
  { path: "/favorites", element: <Favorites /> },

  { path: "/#/", element: <Home /> },
  { path: "/#/home", element: <Home /> },
  { path: "/#/my-offers", element: <MyOffers /> },
  { path: "/#/offer/:reference", element: <Offer /> },
  { path: "#/product/men", element: <Men /> },
  { path: "#/product/women", element: <Women /> },
  { path: "#/product/unisex", element: <Unisex /> },
  { path: "#/cart", element: <Cart /> },
  { path: "#/favorites", element: <Favorites /> },
];

const Router = () => {
  return (
    <UserProvider>
      <FavoritesProvider>
        <CartProvider>
        <HashRouter>
          <Routes>
            {/* Routes publiques */}
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
        </HashRouter>
        </CartProvider>
      </FavoritesProvider>
    </UserProvider>
  );
};

export default Router;
