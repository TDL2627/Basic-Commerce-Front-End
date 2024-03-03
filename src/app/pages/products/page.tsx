"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import AddProduct from "@/app/components/addProduct";
import BulkProductAdd from "@/app/components/addMultipleProducts";
import Spinner from "@/app/components/spinner";
import { useStore } from "@/app/stateManager";


export default function Products() {
  const [products, setProducts] = useState<any[] | null>(null);
  const [showModal, setShowModal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
 const {setCart}= useStore()
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail !== "admin@gmail.com") {
      setIsAdmin(false);
    }else {
      setIsAdmin(true);
    }
  }, []);

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

  const handleCheckboxChange = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the selected products?"
    );
    if (confirmDelete) {
      if (selectedProducts.length == 1) {
        await axios.delete(
          `https://basic-commerce-back-end.vercel.app/product/${selectedProducts[0]}`
        );
      } else {
        console.log("Selected product IDs to delete:", selectedProducts);
        await axios.post(
          "https://basic-commerce-back-end.vercel.app/remove-products",
          {
            products: selectedProducts,
          }
        );
      }
      window.location.reload();
      setSelectedProducts([]);
    }
  };
  const addToCart = (product: any) => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    setCart(cartItems);
  };
  return (
    <>
      <h2 className="lg:text-5xl text-3xl bg-black text-white text-center py-4">
        Products
      </h2>
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white relative">
        <div className="lg:flex ">
          <input
            type="text"
            placeholder="Search Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 h-[40px] text-white py-2 px-4 mb-2 rounded"
          />
          {isAdmin && (
            <>
              <div className="flex lg:ml-4">
                <button
                  onClick={() => {
                    setShowModal("multi");
                  }}
                  className="bg-green-500 h-[40px] hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Add Products
                </button>
                {selectedProducts.length > 0 && (
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 h-[40px] hover:bg-red-700 text-white py-2 px-4 rounded ml-4"
                  >
                    Delete Selected
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  overflow-y-auto z-0 mx-4 lg:max-h-[500px] pt-10 lg:py-5">
          {filteredProducts.length > 0 ? (
            filteredProducts
              .slice(startIndex, endIndex)
              .map((product: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg pt-8 relative"
                >
                  {isAdmin && (
                    <>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(product.id)}
                        checked={selectedProducts.includes(product.id)}
                        className="h-5 absolute top-2 right-2 rounded-full"
                      />
                    </>
                  )}

                  <Link href={`/pages/product/${product.id}`} className="">
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
                  {!isAdmin && (
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-500 w-full text-white py-2 px-4 mt-4 rounded"
                    >
                      Add to Cart
                    </button>
                  )}
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
