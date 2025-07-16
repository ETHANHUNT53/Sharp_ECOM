import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const OrderHistory = () => {
  const { user } = useSelector((store) => store.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (user?.uid) fetchOrders();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-xl p-6 shadow-sm bg-white"
            >
              {/* Order Header */}
              <div className="mb-4 ">
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Name:</strong> {order.name}
                </p>
                {/* <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p> */}
                {/* <p>
                  <strong>Address:</strong> {order.address}, {order.city},{" "}
                  {order.state} - {order.pincode}
                </p> */}
                <p>
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Placed on:</strong>{" "}
                  {order.createdAt?.toDate().toLocaleString()}
                </p>
              </div>

              {/* Product List */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Items:</h3>
                <ul className="divide-y divide-gray-200">
                  {order.order?.map((item, index) => (
                    <li
                      key={index}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image || "https://via.placeholder.com/64"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="text-gray-800 font-medium">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-gray-700 font-semibold">
                        ₹
                        {item.categories
                          ? item.price[item.selectedCategoryIndex]
                          : item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
