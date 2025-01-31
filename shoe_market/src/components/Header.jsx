import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";
import HeaderBadge from "./HeaderBadge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useCart } from "../context/CartContext";

const DropdownMenu = ({ user, mobileMenuOpen, setMobileMenuOpen }) => {
  const routesWithNames = [
    { path: "/product/men", name: "Homme" },
    { path: "/product/women", name: "Femme" },
    { path: "/product/unisex", name: "Unisex" },
  ];

  return (
    <>
      {/* Dropdown visible sur grands écrans */}
      <Menu as="div" className="relative hidden lg:inline-block">
        <MenuButton className="inline-flex items-center text-md font-semibold text-gray-700">
          Chaussures{" "}
          <ChevronDownIcon className="h-5 w-5 ml-1" aria-hidden="true" />
        </MenuButton>
        <MenuItems className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {routesWithNames.map((route) => (
            <MenuItem key={route.name} className="hover-bg-whitesmoke">
              <NavLink
                to={
                  !user && route.name === "Mes offres" ? "/login" : route.path
                }
                onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm"
              >
                {route.name}
              </NavLink>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>

      {/* Dropdown dans le menu mobile */}
      <div className="lg:hidden space-y-2">
        <Menu as="div" className="relative">
          <MenuButton className="inline-flex items-center text-md font-semibold text-gray-700">
            Chaussures{" "}
            <ChevronDownIcon className="h-5 w-5 ml-1" aria-hidden="true" />
          </MenuButton>
          <MenuItems className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {routesWithNames.map((route) => (
              <MenuItem key={route.name} className="hover-bg-whitesmoke">
                <NavLink
                  to={
                    !user && route.name === "Mes offres" ? "/login" : route.path
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm"
                >
                  {route.name}
                </NavLink>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </>
  );
};

const Header = () => {
  const { cart } = useCart();
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="mx-auto flex items-center justify-between p-3 p-sm-4">
        <div className="flex items-center">
          <NavLink to="/home" className="text-xl font-bold">
            <span className="logo">ShoeMarket</span>
          </NavLink>
        </div>

        <div className="flex items-center space-x-4 ml-auto mr-2">
          <NavLink
            to="/home"
            className="text-md font-semibold text-gray-700 hidden lg:block"
          >
            Home
          </NavLink>

          {/* DropdownMenu visible uniquement sur grand écran */}
          <div className="hidden lg:flex">
            <DropdownMenu
              user={user}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>

          {/* Badge avec icône de panier */}

          <NavLink to={`/${user ? "cart" : "login"}`}>
            <HeaderBadge
              number={cart.length ? cart.length : null}
              className="hidden lg:flex"
            >
              <ShoppingCartIcon />
            </HeaderBadge>
          </NavLink>

          {/* Badge avec icône de favoris */}
          <NavLink to={`/${user ? "favorites" : "login"}`}>
            <HeaderBadge
              number={favorites.length ? favorites.length : null}
              className="hidden lg:flex"
            >
              <FavoriteIcon />
            </HeaderBadge>
          </NavLink>

          {/* Bouton de déconnexion ou lien de connexion */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-md font-semibold text-gray-700 hidden lg:block"
            >
              Se déconnecter
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-md font-semibold text-gray-700 hidden lg:block"
            >
              Se connecter
            </NavLink>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <DialogPanel className="fixed inset-0 z-10 bg-white p-4">
          <div className="flex justify-between items-center mb-4">
            <NavLink to="/home" className="text-md font-bold text-black-700">
              ShoeMarket
            </NavLink>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-2">
            <NavLink
              to="/home"
              className="block text-md font-semibold text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            {/* Dropdown visible dans le menu mobile */}
            <DropdownMenu
              user={user}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block text-md font-semibold text-gray-700"
              >
                Se déconnecter
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block text-md font-semibold text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Se connecter
              </NavLink>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
