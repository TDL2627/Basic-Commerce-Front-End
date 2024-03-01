"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Orders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://basic-commerce-back-end.vercel.app/orders"
        );
        console.log(response,"aye rixx");
        
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(orders, "Aye orders");
  }, [orders]);
  return (
    <div className=" w-full min-h-screen flex justify-center items-center bg-black text-white">
      <h1 className="text-5xl">Orders</h1>

      <p></p>
    </div>
  );
}
