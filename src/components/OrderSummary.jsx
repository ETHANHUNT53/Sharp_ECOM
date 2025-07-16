import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const OrderSummary = () => {
  const { user } = useSelector((store) => store.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestOrder = async () => {
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setOrder(snapshot.docs[0].data());
      }
    } catch (error) {
      console.error("❌ Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLatestOrder();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium">Loading your order summary...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium">No recent orders found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-md rounded-2xl mb-[2%]">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Summary</h1>

      {/* Customer Info */}
      <div className="p-6 mb-8 border-b">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Customer Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-600">
          <p>
            <span className="font-medium">Name:</span> {order.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {order.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {order.phone}
          </p>
          <p>
            <span className="font-medium">Pincode:</span> {order.pincode}
          </p>
          <p>
            <span className="font-medium">City:</span> {order.city}
          </p>
          <p>
            <span className="font-medium">State:</span> {order.state}
          </p>
          <p className="md:col-span-2">
            <span className="font-medium">Address:</span> {order.address}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="border-b p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Items</h2>
        <ul className="divide-y divide-gray-200">
          {order.order?.map((item, index) => (
            <li
              key={index}
              className="py-4 flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <span className="text-gray-800 font-medium">{item.name}</span>
              </div>
              <span className="text-gray-700 font-semibold">
                ₹
                {item.categories
                  ? item.price[item.selectedCategoryIndex]
                  : item.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Info */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Order Details
        </h2>
        <div className="text-gray-600">
          <p>
            <span className="font-medium">Order ID:</span> {order.orderId}
          </p>
          <p>
            <span className="font-medium">Payment Status:</span> {order.status}
          </p>
          <p>
            <span className="font-medium">Total Amount:</span> ₹
            {order.totalAmount.toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {order.createdAt?.toDate().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
