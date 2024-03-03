"use client";
import Link from "next/link";
export default function Dashboard() {
  return (
    <>
      <h1 className="text-5xl bg-black text-white text-center py-4">
        Dashboard
      </h1>

      <div className=" w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="flex items-center md:flex-row flex-col justify-between w-full md:space-x-4 mb-8 lg:px-10 px-4">
          <Link
            href="/pages/orders"
            className="bg-slate-200 md:w-1/2 w-full h-[200px] shadow rounded p-3 hover:shadow-lg md:my-auto my-2"
          >
            <h3 className="text-black mb-10">Orders</h3>
            <h2 className="text-center font-bold text-3xl text-[#60A9CD]">
              22
            </h2>
          </Link>
          <Link
            href="/pages/products"
            className="bg-slate-200 md:w-1/2 w-full h-[200px] shadow rounded p-3 hover:shadow-lg md:my-auto my-2"
          >
            <h3 className="text-black mb-10">Products</h3>
            <h2 className="text-center font-bold text-3xl text-[#8FCA37]">2</h2>
          </Link>
          <Link
            href="/pages/customers"
            className="bg-slate-200 md:w-1/2 w-full h-[200px] shadow rounded p-3 hover:shadow-lg md:my-auto my-2"
          >
            <h3 className="text-black mb-10">Customers</h3>
            <h2 className="text-center font-bold text-3xl text-red-500">2</h2>
          </Link>
        </div>
      </div>
    </>
  );
}
