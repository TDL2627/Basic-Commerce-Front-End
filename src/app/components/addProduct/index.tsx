import { useState } from "react";
import axios from "axios";

export default function AddProduct(props: any) {
  const { closeModal } = props;
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://basic-commerce-back-end.vercel.app/product",
        formData
      );
      setFormData({
        name: "",
        price: "",
        description: "",
      });
      window.location.reload();
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="w-full min-h-screen  flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-5xl mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg text-center">
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
        />
        <input
          type="number"
          name="price"
          required
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
        />
        <textarea
             required
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 place-self-center hover:bg-green-700 text-white py-2 px-4 rounded mx-auto"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
