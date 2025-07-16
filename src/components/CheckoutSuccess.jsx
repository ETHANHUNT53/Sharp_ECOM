// src/pages/CheckoutSuccess.jsx
import React from "react";

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your order. Your transaction has been completed
          successfully.
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
