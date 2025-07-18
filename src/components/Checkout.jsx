import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-input-2/lib/style.css";
import { PINCODE_API } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { db } from "../utils/firebase";
import axios from "axios";
import { doc, setDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useSelector((store) => store.user);
  const totalPrice = useSelector((store) => store.cart.totalPrice);
  const items = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [address, setAddress] = useState("");
  const [cityandState, setCityAndState] = useState(null);

  // 🔁 Load PhonePe script once
  useEffect(() => {
    if (!window.PhonePeCheckout) {
      const script = document.createElement("script");
      script.src = "https://mercury.phonepe.com/web/bundle/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ PhonePe script loaded");
      };
      document.head.appendChild(script);
    }
  }, []);

  // 📦 Fetch pincode info
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

  useEffect(() => {
    if (cityandState) {
      setCity(cityandState[0]?.District || "");
      setStateName(cityandState[0]?.State || "");
    }
  }, [cityandState]);

  // ✅ Firestore order creation
  const createOrderInFirestore = async (txnId) => {
    const processedPhone = phone.slice(2);
    const orderData = {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      phone: processedPhone,
      pincode,
      city,
      state: stateName,
      address,
      totalAmount: totalPrice,
      orderId: txnId,
      order: items,
      status: "PAID",
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
    } catch (error) {
      console.error("❌ Error saving order:", error);
    }
  };

  const initiatePhonePePayment = async () => {
    const txnId = "txn_" + Date.now();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://initiatepayment-giehdpkcmq-uc.a.run.app",
        {
          amount: totalPrice * 100,
          txnId,
          userId: user.uid,
        }
      );

      const redirectUrl = res?.data?.redirectUrl;

      if (!redirectUrl || !window.PhonePeCheckout) {
        alert("PhonePe script not loaded or redirect URL missing.");
        setLoading(false);
        return;
      }

      window.PhonePeCheckout.transact({
        tokenUrl: redirectUrl,
        type: "IFRAME",
        callback: async (response) => {
          setLoading(false);
          if (response === "USER_CANCEL") {
            alert("Payment cancelled by user");
          } else if (response === "CONCLUDED") {
            await createOrderInFirestore(txnId);
            alert("Payment completed successfully");
            navigate("/order-summary");
          } else if (response === "PENDING") {
            navigate("/payment-callback");
          }
        },
      });
    } catch (error) {
      console.error("PhonePe Error:", error);
      setLoading(false);
      alert("Error initiating PhonePe payment");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pincode.length !== 6) {
      alert("Pincode must be 6 digits");
      return;
    }

    const processedPhone = phone.slice(2);
    if (!processedPhone || processedPhone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    const updatedDetails = {
      ...user,
      phone: processedPhone,
      pincode,
      city,
      state: stateName,
      address,
    };

    try {
      await setDoc(doc(db, "users", user.uid), updatedDetails);
      dispatch(addUser(updatedDetails));
      await initiatePhonePePayment();
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      alert("Failed to save details. Try again.");
    }
  };

  return (
    user && (
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl md:text-4xl font-bold mt-8 md:mt-16">
          Enter Address
        </h1>
        {loading && (
          <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-lg font-medium">Initializing payment...</p>
          </div>
        )}
        <Form
          name={user.displayName}
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
          disabled={!user}
          buttonText={"Proceed to Payment"}
        />

        {/* 📦 Required for PhonePe IFRAME */}
        <div id="phonepe_checkout_container" className="mt-10 w-full" />
      </div>
    )
  );
};

export default Checkout;
