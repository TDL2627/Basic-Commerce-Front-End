"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/app/components/spinner";
export default function Customers() {
  const [customers, setCustomers] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://basic-commerce-back-end.vercel.app/customer"
        );
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil((customers?.length || 0) / 6);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };
  const filteredCustomers = customers
    ? customers.filter((customer: any) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;

  return (
    <>
      <h2 className="lg:text-5xl text-3xl bg-black text-white text-center py-4">
       Customers
      </h2>

      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
      {loading == false && (
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 text-white py-2 px-4 rounded"
        />
      )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 overflow-y-auto z-0 mx-4 lg:max-h-[500px] py-20 lg:py-5">
          {filteredCustomers.length > 0 ? (
            filteredCustomers
              .slice(startIndex, endIndex)
              .map((customer: any, index: number) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg">
                  <p>
                    <strong>Customer ID:</strong> {customer.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>
                </div>
              ))
          ) : (
            <>
              {loading == true ? (
                <div className="fixed top-[50%]">
                  <Spinner />
                </div>
              ) : (
                <>
                  {" "}
                  <p>No customers found.</p>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex my-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePagination(i + 1)}
              className={`${
                currentPage === i + 1
                  ? "bg-gray-700 text-white"
                  : "text-gray-700"
              } py-2 px-4 mr-2 rounded`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
