"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import AddProduct from "@/app/components/addProduct";
import BulkProductAdd from "@/app/components/addMultipleProducts";

export default function Products() {
  const [products, setProducts] = useState<any[] | null>(null);
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://basic-commerce-back-end.vercel.app/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const closeModal = () => {
    setShowModal("");
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white relative">
        <div className="fixed top-0 py-2 gap-2 bg-black w-screen flex flex-col justify-center items-center z-50">
          <h1 className="text-5xl">Products</h1>
          <div className="ml-4">
            <button
              onClick={() => {
                setShowModal("single");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-4"
            >
              Add Product
            </button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 overflow-y-auto z-0">
          {products ? (
            products.map((product: any, index: number) => (
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
                  <strong>Price:</strong> {product.price}
                </p>
                <p>
                  <strong>Description:</strong> {product.description}
                </p>
              </Link>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
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
