"use client";

import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Spinner from "@/app/components/spinner";
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userEmail: any = user.email;
        localStorage.setItem("email", userEmail);
        setLoading(false);
        if (email == "admin@gmail.com") {
          router.push("/pages/dashboard");
          
        }else{
          router.push("/pages/products");
        }

      })
      .catch((error: any) => {
        console.error(error);
        setError("Login Failed!");
        setLoading(false);
      });
  };

  return (
    <main className="w-full text-white bg-black h-screen flex items-center justify-center flex-col px-4">
      <h2 className="text-3xl font-bold mb-6">Sign in </h2>
      <form
        className="flex flex-col md:w-1/2 w-full mb-8"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-[1px] text-black py-2 px-4 rounded mb-4"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="border-[1px] text-black py-2 px-4 rounded  mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 mx-auto hover:bg-blue-800 text-white md:w-[200px] w-full rounded"
        >
          {loading == true ? (
            <>
              <Spinner />
            </>
          ) : (
            <>LOG IN</>
          )}
        </button>
        {error !== "" && (
          <>
            <p className="text-red-500">{error}</p>
          </>
        )}
      </form>
      <Link
        className="text-white  text-center text-sm underline"
        href="/pages/register"
      >
        Register
      </Link>
      <p className="text-gray-400 text-center text-sm">
        &copy; Copyright {new Date().getFullYear()} by TDL2627
      </p>
    </main>
  );
}
