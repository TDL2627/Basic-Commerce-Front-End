"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/app/stateManager";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(true);
  const { cart, setCart } = useStore();

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("email") : "";
  useEffect(() => {
    if (userEmail !== "admin@gmail.com") {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [userEmail]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(localCart);
  }, []);

  return (
    <>
      {pathname !== "/" &&
        !pathname.includes("login") &&
        !pathname.includes("register") && (
          <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex-shrink-0 flex items-center">
                  <Link
                    href={
                      isAdmin == true ? "/pages/dashboard" : "/pages/products"
                    }
                    className="text-white font-semibold text-lg"
                  >
                    Basic Commerce
                  </Link>
                </div>
                {/* Mobile menu button */}
                <div className="flex items-center md:hidden">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </button>
                </div>
                {/* Desktop menu */}
                <div className="hidden lg:flex md:items-center md:space-x-4">
                  <Link
                    href="/pages/products"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Products
                  </Link>
                  <Link
                    href="/pages/orders"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Orders
                  </Link>
                  {isAdmin ? (
                    <Link
                      href="/pages/customers"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Customers
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/pages/cart"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Cart {cart?.length > 0 && `(${cart.length})`}
                      </Link>
                    </>
                  )}

                  <p
                    onClick={() => {
                      localStorage.clear();
                      router.push("/");
                    }}
                    className="text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Log out
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <div
              className={`lg:hidden ${isOpen ? "" : "hidden"}`}
              id="mobile-menu"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 grid">
                <Link
                  href="/pages/products"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>
                <Link
                  href="/pages/orders"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Orders
                </Link>
                {isAdmin ? (
                  <Link
                    href="/pages/customers"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Customers
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/pages/cart"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                      Cart {cart?.length > 0 && `(${cart.length})`}
                    </Link>
                  </>
                )}
                <p
                  onClick={() => {
                    localStorage.clear();
                    router.push("/");
                  }}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                  Logout
                </p>
              </div>
            </div>
          </nav>
        )}
    </>
  );
};

export default Navbar;
