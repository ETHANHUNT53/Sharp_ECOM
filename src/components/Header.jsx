import React from "react";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
const Header = () => {
  useProducts();
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
          <Link to="/login">
            <li>
              <button>Login/SignUp</button>
            </li>
          </Link>
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
