"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import AddProduct from "@/app/components/addProduct";
import BulkProductAdd from "@/app/components/addMultipleProducts";

export default function Products() {
  const [products, setProducts] = useState<any[] | null>(null);
  const [showModal, setShowModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://basic-commerce-back-end.vercel.app/products"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const closeModal = () => {
    setShowModal("");
  };

  const totalPages = Math.ceil((products?.length || 0) / 6);

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePagination(i)}
          className={`${
            currentPage === i ? "bg-gray-700 text-white" : "text-gray-700"
          } py-2 px-4 mr-2 rounded`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  const filteredProducts = products
    ? products.filter((product: any) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const startIndex = (currentPage - 1) * 6;
  const endIndex = startIndex + 6;

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white relative">
        <div className="fixed top-0 py-2 gap-2 bg-black w-screen flex flex-col justify-center items-center z-50">
          <h1 className="text-5xl">Products</h1>
          <input
            type="text"
            placeholder="Search Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white py-2 px-4 rounded"
          />
          <div className="ml-4">
            <button
              onClick={() => {
                setShowModal("multi");
              }}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Add Products
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 overflow-y-auto z-0 mx-4 lg:max-h-[500px] py-20 lg:py-5">
          {filteredProducts.length > 0 ? (
            filteredProducts
              .slice(startIndex, endIndex)
              .map((product: any, index: number) => (
                <Link
                  href={`/pages/product/${product.id}`}
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg"
                >
                  <p>
                    <strong>Product ID:</strong> {product.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Price:</strong> R{product.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {product.description}
                  </p>
                </Link>
              ))
          ) : (
            <>
              {loading == true ? (
                <>Loading...</>
              ) : (
                <>
                  {" "}
                  <p>No products found.</p>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex my-4">{renderPagination()}</div>
      </div>
      {showModal !== "" && (
        <div className="fixed  inset-0  bg-black flex justify-center  z-50">
          <div className="bg-gray-900 rounded-lg">
            {showModal == "single" && (
              <>
                <AddProduct closeModal={closeModal} />
              </>
            )}{" "}
            {showModal == "multi" && (
              <>
                <BulkProductAdd closeModal={closeModal} />
              </>
            )}
            <button
              onClick={closeModal}
              className="bg-red-500 fixed top-2 right-5 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
