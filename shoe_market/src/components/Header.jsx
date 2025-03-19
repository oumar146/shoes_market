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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </HeaderBadge>
          </NavLink>

          {/* Badge avec icône de favoris */}
          <NavLink to={`/${user ? "favorites" : "login"}`}>
            <HeaderBadge
              number={favorites.length ? favorites.length : null}
              className="hidden lg:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </HeaderBadge>
          </NavLink>

          {/* Dropdown pour le compte utilisateur */}
          <Menu as="div" className="relative hidden lg:inline-block">
            <MenuButton className="inline-flex items-center text-md font-semibold text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <ChevronDownIcon className="h-5 w-5 ml-1" aria-hidden="true" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {user ? (
                <>
                  <MenuItem>
                    <NavLink
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mes commandes
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Se déconnecter
                    </button>
                  </MenuItem>
                </>
              ) : (
                <MenuItem>
                  <NavLink
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Se connecter
                  </NavLink>
                </MenuItem>
              )}
            </MenuItems>
          </Menu>

          {/* Bouton de déconnexion ou lien de connexion visible sur mobile */}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-md font-semibold text-gray-700 lg:hidden"
            >
              Se déconnecter
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-md font-semibold text-gray-700 lg:hidden"
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
              <>
                <NavLink
                  to="/orders"
                  className="block text-md font-semibold text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mes commandes
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-md font-semibold text-gray-700"
                >
                  Se déconnecter
                </button>
              </>
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