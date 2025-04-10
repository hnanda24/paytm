import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginStatus } from "../../store/atoms/atom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginStatus);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          Paytm Wallet
        </Link>
        <ul className="flex space-x-6 items-center text-lg">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/update" className="hover:text-gray-300 flex items-center gap-2 transition">
                  <FaUserCircle className="text-3xl" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
