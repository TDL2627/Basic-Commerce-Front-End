"use client";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Orders() {
  const [orders, setOrders] = useState<any[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://basic-commerce-back-end.vercel.app/orders"
        );
        setOrders(response.data);
        setLoading(false)
      } catch (error) {
        setLoading(false)

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil((orders?.length || 0) / 6);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };
  const filteredOrders = orders
    ? orders.filter((order: any) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="fixed top-0 py-2 gap-2 bg-black w-screen flex flex-col justify-center items-center z-50">
        <h1 className="text-5xl">Orders</h1>
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 text-white py-2 px-4 rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 overflow-y-auto z-0 mx-4 lg:max-h-[500px] py-20 lg:py-5">
        {filteredOrders.length > 0 ? (
          filteredOrders
            .slice(startIndex, endIndex)
            .map((order: any, index: number) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg">
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Total:</strong> {order.total}
                </p>
                <p>
                  <strong>Customer ID:</strong> {order.customerId}
                </p>
                <p>
                  <strong>Paid:</strong> {order.paid ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Products:</strong>
                </p>
                <ul className="list-disc pl-5">
                  {order.products.map(
                    (product: string, productIndex: number) => (
                      <li key={productIndex}>{product}</li>
                    )
                  )}
                </ul>
              </div>
            ))
        ) : (
          <>
            {loading == true ? (
              <>Loading</>
            ) : (
              <>
                {" "}
                <p>No orders found.</p>
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
              currentPage === i + 1 ? "bg-gray-700 text-white" : "text-gray-700"
            } py-2 px-4 mr-2 rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
