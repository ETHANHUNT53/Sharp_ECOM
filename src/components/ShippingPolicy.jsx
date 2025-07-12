import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="w-[60%] mx-auto">
      <h2 className="my-[5%] text-4xl font-bold">
        Shipping , Refund and Return Policy
      </h2>
      <div className="my-[4%]  text-justify">
        <h4 className="mb-[2%] text-2xl font-semibold">SHIPPING POLICY</h4>
        <p>
          The orders for the user are shipped through registered domestic
          courier companies and/or speed post only. Orders are shipped and
          delivered within 5 days from the date of the order and/or payment or
          as per the delivery date agreed at the time of order confirmation and
          delivering of the shipment, subject to courier company / post office
          norms. Platform Owner shall not be liable for any delay in delivery by
          the courier company / postal authority. Delivery of all orders will be
          made to the address provided by the buyer at the time of purchase.
          Delivery of our services will be confirmed on your email ID as
          specified at the time of registration. If there are any shipping
          cost(s) levied by the seller or the Platform Owner (as the case be),
          the same is not refundable.
        </p>
      </div>
      <div className="mb-[10%]  text-justify">
        <h4 className="mb-[2%] text-2xl font-semibold">
          RETURN AND REFUND POLICY
        </h4>
        <p>
          No returns or exchanges are allowed, only if you receive a
          damaged/defective or different product then refunds will be provided
          and all the refunds once processed will be credited to the customer
          original payment mode within 15 business days.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
