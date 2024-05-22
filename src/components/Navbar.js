// Navbar.
// import cromaImage from "../croma.png"
import cromaImage from "./images/croma.png"
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-stone-900">
        <Link to="/">
          <img src={cromaImage} alt="Croma HeadTag" className="h-10" />

          
        </Link>
        <button
          onClick={handleAuthAction}
          className="bg-stone-700 text-white px-4 py-2 rounded"
        >
          {isAuthenticated ? "Log Out" : "Login"}
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
