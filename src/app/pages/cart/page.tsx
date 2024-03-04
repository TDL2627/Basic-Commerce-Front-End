"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/app/components/spinner";
import { useStore } from "@/app/stateManager";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Cart() {
  const { cart, setCart } = useStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [payNow, setPayNow] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let total = 0;
    cart.forEach((item: any) => {
      total += Number(item.price);
    });

    setTotalPrice(total);
  }, [cart]);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const userEmail =
        typeof window !== "undefined" ? localStorage.getItem("email") : "";
      const q = query(
        collection(db, "customers"),
        where("email", "==", userEmail)
      );
      const snapshot = await getDocs(q);
      let customerId = "";
      snapshot.forEach((doc: any) => {
        customerId = doc.id;
      });

      let cartIds: any = [];
      cart.forEach((item: any) => {
        cartIds.push(item.id);
      });

      const response = await axios.post(
        "https://basic-commerce-back-end.vercel.app/order",
        { paid: payNow, customerId, products: cartIds, total: totalPrice }
      );
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      setLoading(false);
      alert("Order Created!");

      console.log(":", response.data);
    } catch (error) {
      setLoading(false);

      console.error("Error during checkout:", error);
    }
  };

  const removeFromCart = (indexToRemove: any) => {
    const updatedCart = cart.filter(
      (_: any, index: number) => index !== indexToRemove
    );
    setCart(updatedCart);
  };

  return (
    <>
      <h2 className="lg:text-5xl text-3xl bg-black text-white text-center py-4">
        Cart
      </h2>

      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="bg-black text-white p-4">
          {cart.length > 0 ? (
            <ul className="divide-y divide-gray-400">
              {cart.map((item: any, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <span>
                    {item.name} - R{item.price}
                  </span>
                  <button
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}

          {cart.length > 0 && (
            <>
              <p className="text-center mt-4">Total: R{totalPrice}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label htmlFor="payNow" className="mr-2">
                    Pay Now:
                  </label>
                  <input
                    id="payNow"
                    type="checkbox"
                    checked={payNow}
                    onChange={(e) => setPayNow(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-green-500 w-[150px] hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto"
                >
                  {loading == true ? <Spinner /> : <> Checkout</>}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
