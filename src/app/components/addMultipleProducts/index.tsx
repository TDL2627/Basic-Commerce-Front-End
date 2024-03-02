import { useEffect, useState } from "react";
import axios from "axios";

export default function BulkProductAdd(props: any) {
  const { closeModal } = props;
  const [products, setProducts] = useState<any>([]);
  const [canUpload, setCanUpload] = useState(false);

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

      if(products.length == 1){
        await axios.post(
          "https://basic-commerce-back-end.vercel.app/product",
          products[0]
        );
      }else{
        await axios.post("https://basic-commerce-back-end.vercel.app/products", {
          products,
        });
      }
      
      window.location.reload();
      closeModal();

      console.log("Bulk products added successfully!");
    } catch (error) {
      console.error("Error adding bulk products:", error);
    }
  };
  const validateProducts = () => {
    for (const product of products) {
      if (!product.name || !product.price || !product.description) {
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    if (products.length !== 0 && validateProducts()) {
      setCanUpload(true);
    } else {
      setCanUpload(false);
    }
  }, [products]);
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
          disabled={canUpload == false}
          onClick={handleUpload}
          className={`bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded  ${
            canUpload == false ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Upload Products
        </button>
      </div>
    </div>
  );
}
