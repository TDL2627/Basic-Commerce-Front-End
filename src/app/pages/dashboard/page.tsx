"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "@/app/components/spinner";
export default function Dashboard() {
  const [customers, setCustomers] = useState<any[] | null>(null);
  const [orders, setOrders] = useState<any[] | null>(null);
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://basic-commerce-back-end.vercel.app/products"
        );
        const response1 = await axios.get(
          "https://basic-commerce-back-end.vercel.app/customer"
        );
        const response2 = await axios.get(
          "https://basic-commerce-back-end.vercel.app/orders"
        );
        setOrders(response2.data);
        setCustomers(response1.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-5xl bg-black text-white text-center py-4">
        Dashboard
      </h1>
      <div className=" w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
        {loading == true ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <div className="flex items-center md:flex-row flex-col justify-between w-full md:space-x-4 mb-8 lg:px-10 px-4">
              <Link
                href="/pages/orders"
                className="bg-slate-200 md:w-1/2 w-full h-[200px] shadow rounded p-3 hover:shadow-lg md:my-auto my-2"
              >
                <h3 className="text-black mb-10">Orders</h3>
                <h2 className="text-center font-bold text-3xl text-[#60A9CD]">
                  {orders?.length}
                </h2>
              </Link>
              <Link
                href="/pages/products"
                className="bg-slate-200 md:w-1/2 w-full h-[200px] shadow rounded p-3 hover:shadow-lg md:my-auto my-2"
              >
                <h3 className="text-black mb-10">Products</h3>
                <h2 className="text-center font-bold text-3xl text-[#8FCA37]">
                  {products?.length}
                </h2>
              </Link>
              <Link
                href="/pages/customers"
                className="bg-slate-200 md:w-1/2 w-full h-[200px] shadow rounded p-3 hover:shadow-lg md:my-auto my-2"
              >
                <h3 className="text-black mb-10">Customers</h3>
                <h2 className="text-center font-bold text-3xl text-red-500">
                  {customers?.length}
                </h2>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
