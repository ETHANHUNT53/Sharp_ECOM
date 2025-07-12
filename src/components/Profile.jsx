import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Checkout";
import Form from "./Form";
import { PINCODE_API } from "../utils/constants";
import { doc, setDoc } from "firebase/firestore";
import { addUser } from "../utils/userSlice";
import { db } from "../utils/firebase";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [pincode, setPincode] = useState("");
  const [name, setName] = useState(user.displayName || "");
  let [phone, setPhone] = useState("");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      alert("Pincode must be 6 digits");
      return;
    }
    phone = phone.slice(2);
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    const updatedDetails = {
      ...user,
      displayName: name,
      phone,
      pincode,
      city,
      state: stateName,
      address,
    };

    try {
      await setDoc(doc(db, "users", user.uid), updatedDetails);
      dispatch(addUser(updatedDetails));
      alert("Details saved to Firebase!");
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Failed to save details. Try again.");
    }
    alert("Address details saved!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className="text-2xl md:text-4xl font-bold mt-8 md:mt-16">Profile</h1>
      <Form
        name={name}
        setName={setName}
        email={user.email}
        phone={phone}
        setPhone={setPhone}
        pincode={pincode}
        setPincode={fetchPincode}
        city={city}
        setCity={setCity}
        stateName={stateName}
        setStateName={setStateName}
        address={address}
        setAddress={setAddress}
        onSubmit={handleSubmit}
        editableFields={{ name: true }}
        buttonText={"Update Profile"}
      />
    </div>
  );
};

export default Profile;
