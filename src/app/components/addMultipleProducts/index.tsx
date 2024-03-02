import { useState } from "react";
import axios from "axios";

export default function BulkProductAdd(props: any) {
  const { closeModal } = props;
  const [products, setProducts] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };
    setProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: "", price: "", description: "" }]);
  };

  const handleRemoveProduct = (index: any) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleUpload = async () => {
    try {
      await axios.post("https://basic-commerce-back-end.vercel.app/products", {
        products,
      });
      window.location.reload();
      closeModal();

      console.log("Bulk products added successfully!");
    } catch (error) {
      console.error("Error adding bulk products:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <div className="fixed lg:top-0 top-16 bg-black w-screen text-center py-4">
      <h1 className="lg:text-5xl text-2xl mb-4">Add Multiple Products</h1>

      </div>
      <div className="overflow-y-scroll max-h-[400px]">
        {" "}
        {products.map((product: any, index: number) => (
          <form
            key={index}
            className="p-4 bg-gray-800 text-center rounded-lg mb-4"
          >
            <input
              type="text"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e, index)}
              placeholder="Name"
              className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
            />
            <input
              type="number"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleChange(e, index)}
              placeholder="Price"
              className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
            />
            <textarea
              required
              name="description"
              value={product.description}
              onChange={(e) => handleChange(e, index)}
              placeholder="Description"
              className="mb-2 block w-full p-2 rounded bg-gray-900 text-white"
            ></textarea>
            <button
              type="button"
              onClick={() => handleRemoveProduct(index)}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Remove Product
            </button>
          </form>
        ))}
      </div>
      <div className="lg:flex fixed bottom-0 w-full left-0 right-0 text-center gap-4 justify-center py-4 ">
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded lg:my-0 my-4"
        >
          Add Another Product
        </button>
        <button
          disabled={products.length == 0}
          onClick={handleUpload}
          className={`bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded  ${
            products.length == 0 && "cursor-not-allowed"
          }`}
        >
          Upload Products
        </button>
      </div>
    </div>
  );
}
