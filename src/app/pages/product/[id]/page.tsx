"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Products({ params }: { params: { id: string } }) {
  const productId = params.id;
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://basic-commerce-back-end.vercel.app/product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleEdit = () => {
    setEditing(true);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://basic-commerce-back-end.vercel.app/product/${productId}`
      );
      router.push("/pages/products");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/product/${productId}`,
        formData
      );
      setProduct(formData);
      setEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white gap-4">
      {product === null ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          {!editing ? (
            <div className=" bg-gray-800 rounded-lg gap-5 grid p-5">
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
              <div className="flex mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-2"
                  onClick={handleEdit}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <form
              className="p-4 bg-gray-800 rounded-lg"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
              ></textarea>
              <div className="flex">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
