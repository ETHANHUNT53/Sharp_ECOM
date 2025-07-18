import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { MdAccountCircle } from "react-icons/md";
const Header = () => {
  const items = useSelector((store) => store.cart.items);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // navigate("/products");
      } else {
        // User is signed out
        dispatch(removeUser());
        // navigate("/");
      }
    });
    //Unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch]);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // dispatch(removeUser());
        // console.log("signed out");
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <header className="bg-white fixed w-full z-10 ">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {/* Left: Burger Menu on Mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Center: Optional logo or nothing */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <Link
            to={"/"}
            className="text-xl font-bold text-gray-900 hidden lg:block"
          >
            Sharp Industries
          </Link>
        </div>

        {/* Right: Cart icon on Mobile */}
        <div className="flex lg:hidden">
          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {items.length}
              </span>
            )}
          </Link>
        </div>

        {/* Right section for desktop */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          <Link to="/" className="text-md font-semibold text-gray-900">
            Home
          </Link>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  ring-gray-300 ring-inset hover:bg-gray-50">
                Products
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to={"/product-machines"}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Machines
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={"/product-raw"}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Raw Materials/Scrubbers
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>

          <Link to="/about" className="text-md font-semibold text-gray-900">
            About
          </Link>
          <Link to="/contact" className="text-md font-semibold text-gray-900">
            Contact
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="text-md font-semibold text-gray-900 mt-1"
            >
              Login
            </Link>
          ) : (
            <Popover className="relative ">
              <PopoverButton className="outline-none">
                <MdAccountCircle className="text-3xl mt-2 cursor-pointer" />
              </PopoverButton>
              <PopoverPanel className="absolute bg-white right-0 z-10 mt-2 w-32 rounded-md  shadow-md ring-1 ring-black ring-opacity-5">
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-200"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-md font-medium cursor-pointer text-gray-700 hover:bg-gray-200"
                  >
                    Sign out
                  </button>
                </div>
              </PopoverPanel>
            </Popover>
          )}

          <Link to="/cart" className="relative font-bold text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/25" />
        <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              Sharp Industries
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/products"
                  className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  Products
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  About
                </Link>
                <Link
                  className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                  to={"/my-orders"}
                >
                  My Orders
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  Contact
                </Link>
              </div>
              <div className="py-6">
                {!user ? (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
                  >
                    Log in
                  </Link>
                ) : (
                  <div>
                    <div className="flex cursor-pointer ml-2">
                      <MdAccountCircle className="text-3xl " />
                      <span className="mt-1 ml-4 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg">
                        Profile
                      </span>
                    </div>

                    <div className="w-full flex justify-center mt-[30%]">
                      <button
                        className="text-base font-semibold mt-4 w-[60%] bg-black text-white p-3  hover:bg-gray-50 rounded-lg"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
