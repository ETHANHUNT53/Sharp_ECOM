import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../utils/firebase";
const LoginWithPhone = () => {
  const [phone, setPhone] = useState("");
  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="absolute  top-[30%] left-[40%]">
      <PhoneInput
        value={phone}
        onChange={(phone) => setPhone("+" + phone)}
        country={"in"}
      />
      <div className="mt-4">
        <button
          className="text-white  sm:mt-0 bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg mx-auto text-sm px-5 py-2.5  focus:outline-none  flex items-center justify-center "
          onClick={sendOtp}
        >
          Send Otp
        </button>
        <div className="mt-4" id="recaptcha"></div>
      </div>
      <input
        type="text"
        className="border-2 w-[100%] my-4 rounded-md p-1"
        placeholder="Enter Otp"
      />

      <button className="text-white  sm:mt-0 bg-green-700 cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg mx-auto text-sm px-5 py-2.5  focus:outline-none  flex items-center justify-center ">
        Verify Otp
      </button>
    </div>
  );
};

export default LoginWithPhone;
