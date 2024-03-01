"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Orders() {
  const [orders, setOrders] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://basic-commerce-back-end.vercel.app/orders"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-5xl">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 overflow-y-auto">
        {orders ? (
          orders.map((order: any, index: number) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total:</strong> {order.total}</p>
              <p><strong>Customer ID:</strong> {order.customerId}</p>
              <p><strong>Paid:</strong> {order.paid ? "Yes" : "No"}</p>
              <p><strong>Products:</strong></p>
              <ul className="list-disc pl-5">
                {order.products.map((product: string, productIndex: number) => (
                  <li key={productIndex}>{product}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

