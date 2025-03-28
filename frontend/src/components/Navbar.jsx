import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">PayWallet</Link>
        </div>
        <div className="space-x-6">
          <Link to="/signup" className="hover:text-gray-200 transition">
            Sign Up
          </Link>
          <Link to="/login" className="hover:text-gray-200 transition">
            Login
          </Link>
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
