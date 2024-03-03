"use client";

import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Spinner from "@/app/components/spinner";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await axios.post(
          "https://basic-commerce-back-end.vercel.app/customer",
          {
            email,
            name,
          }
        );
        const user = userCredential.user;
        console.log(user, "aye");
        if (email == "admin@gmail.com") {
          router.push("/pages/dashboard");
        }else{
          router.push("/pages/products");
        }
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
        setError("Register Failed!");
        setLoading(false);
      });
    // SignUpUser(email, password, store, name, role, router);
  };

  return (
    <main className="w-full h-screen bg-black text-white flex items-center justify-center flex-col px-4">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form
        className="flex flex-col md:w-1/2 w-full mb-8"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="border-[1px] text-black py-2 px-4 rounded mb-4"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
        />

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
          className="border-[1px] text-black py-2 px-4 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />

        <button
          type="submit"
          className="p-3 mx-auto bg-blue-600 hover:bg-blue-800 text-white md:w-[200px] w-full rounded"
        >
          {loading == true ? (
            <>
              <Spinner />
            </>
          ) : (
            <>SIGN UP</>
          )}
        </button>
      </form>
      {error !== "" && (
          <>
            <p className="text-red-500">{error}</p>
          </>
        )}
      <Link
        className="text-white text-center text-sm underline"
        href="/pages/login"
      >
        Login
      </Link>
      <p className="text-gray-400 text-center text-sm">
        &copy; Copyright {new Date().getFullYear()} by TDL2627
      </p>
    </main>
  );
}
