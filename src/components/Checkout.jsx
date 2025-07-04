import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-input-2/lib/style.css";
import { PINCODE_API } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Checkout = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [address, setAddress] = useState("");
  const [cityandState, setCityAndState] = useState(null);

  // Fetch pincode data
  const fetchPincode = async (value) => {
    setPincode(value);
    if (value.length === 6) {
      try {
        const data = await fetch(PINCODE_API + value);
        const json = await data.json();
        if (json?.[0]?.Status !== "Error") {
          setCityAndState(json[0].PostOffice);
        }
      } catch (error) {
        console.error("Error fetching pincode data:", error);
      }
    }
  };

  // Set city and state from fetched data
  useEffect(() => {
    if (cityandState) {
      setCity(cityandState[0]?.District || "");
      setStateName(cityandState[0]?.State || "");
    }
  }, [cityandState]);

  // Submit and update userSlice
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      alert("Pincode must be 6 digits");
      return;
    }

    const updatedDetails = {
      ...user,
      phone,
      pincode,
      city,
      state: stateName,
      address,
    };

    dispatch(addUser(updatedDetails));
    alert("Address details saved!");
  };

  return (
    user && (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl md:text-4xl font-bold mt-8 md:mt-16">
          Enter Address
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-6 md:mt-10 bg-gray-100 p-4 sm:p-6 rounded-lg shadow"
        >
          {/* Name and Email */}
          <div className="mb-5 flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                value={user.displayName || ""}
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>
          </div>

          {/* Phone and Pincode */}
          <div className="mb-5 flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <PhoneInput
                country={"in"}
                inputClass="!w-full !rounded-lg"
                value={phone}
                onChange={(value) => setPhone(value)}
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Pincode
              </label>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => fetchPincode(e.target.value)}
                inputMode="numeric"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Enter pincode"
                required
              />
            </div>
          </div>

          {/* City and State */}
          <div className="mb-5 flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                State
              </label>
              <input
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Address
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 min-h-[100px]"
              placeholder="Enter complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Save Address Checkbox */}
          <div className="flex items-start mb-5">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Save Address
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-center rounded-xl py-3 px-6 font-semibold text-lg transition-all duration-500 ${
              !user
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 text-white hover:bg-green-800 cursor-pointer"
            }`}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    )
  );
};

export default Checkout;
