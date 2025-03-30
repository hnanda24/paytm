import React, { useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useRecoilState} from 'recoil';
import { loginStatus } from "../../store/atoms/atom";

const Navbar = () => {
  const [isLoggedIn,setIsLoggedIn] = useRecoilState(loginStatus);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  },[])

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login")
  }

  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Paytm Wallet
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/update" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
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
