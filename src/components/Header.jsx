import React, { useState, useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  useProducts();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        console.log("signed out");
      })
      .catch((error) => {
        // navigate("/error");
        // An error happened.
      });
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="bg-gray-400 bg-gradient-to-b from-gray-600">
      <header className="flex justify-between ">
        <img
          className="w-[2%] my-4 mx-2"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="logo"
        />
        <ul className="flex gap-8 mr-4 text-lg my-4 text-white font-semibold cursor-pointer">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/products">
            <li>Products</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {!user ? (
            <Link to="/login">
              <li>
                <button className="cursor-pointer">Login/SignUp</button>
              </li>
            </Link>
          ) : (
            <div className="mt-1 text-2xl" onClick={handleDropdown}>
              <FaRegCircleUser />
              {showDropdown && (
                <div className="w-28 absolute text-center mt-7 rounded-lg bg-black p-3 -ml-10 z-10">
                  <button
                    className="text-lg text-white hover:underline cursor-pointer "
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
          <Link to="/cart">
            <li>
              <LuShoppingCart className="text-2xl mr-4 my-1" />
            </li>
          </Link>
        </ul>
      </header>
    </div>
  );
};

export default Header;
