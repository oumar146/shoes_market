import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { UserContext } from "./UserContext"; // Import du contexte utilisateur

const DropdownMenu = ({ user, mobileMenuOpen, setMobileMenuOpen }) => {
  const routesWithNames = [
    { path: "/my-offers", name: "Mes offres" },
    { path: "/all-offers", name: "Toutes les offres" },
  ];

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex items-center text-sm font-semibold text-gray-700">
        Offres <ChevronDownIcon className="h-5 w-5 ml-1" aria-hidden="true" />
      </MenuButton>
      <MenuItems className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {routesWithNames.map((route) => (
          <MenuItem key={route.path} className = "hover-bg-whitesmoke">
            <NavLink
              to={!user && route.path === "/my-offers" ? "/login" : route.path}
              onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm"
            >
              {route.name}
            </NavLink>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

const Header = () => {
  const { user, updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <NavLink to="/home" className="text-xl font-bold">
            <span className="logo">ShoeMarket</span>
          </NavLink>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <NavLink to="/home" className="text-sm font-semibold text-gray-700">
            Home
          </NavLink>
          <DropdownMenu
            user={user}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-gray-700"
            >
              Se déconnecter
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-sm font-semibold text-gray-700"
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
            <NavLink to="/home" className="text-xl font-bold text-black-700">
              ShoeMarket
            </NavLink>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            <NavLink
              to="/home"
              className="block text-sm font-semibold text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
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
                className="block text-sm font-semibold text-gray-700"
              >
                Se déconnecter
              </button>
            ) : (
              <NavLink
                to="/login"
                className="block text-sm font-semibold text-gray-700"
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
