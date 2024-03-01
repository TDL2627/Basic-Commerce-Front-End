"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState<any[] | null>(null);

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

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-5xl">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 overflow-y-auto">
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
              {/* Add more details as needed */}
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
