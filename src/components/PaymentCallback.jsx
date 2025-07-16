// src/pages/PaymentCallback.jsx
import React, { useEffect } from "react";

const PaymentCallback = () => {
  useEffect(() => {
    // You can handle verification logic here in future
    console.log("Payment callback hit");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold text-blue-600">
          Payment Callback Received
        </h1>
        <p className="mt-4 text-gray-600">
          We’ve received your payment status and are processing your order.
        </p>
      </div>
    </div>
  );
};

export default PaymentCallback;
