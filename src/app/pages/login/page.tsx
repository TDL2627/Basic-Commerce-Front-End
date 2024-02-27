"use client";

import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // LoginUser(email, password, router);
  };

  return (
    <main className="w-full h-[90vh] flex items-center justify-center flex-col px-4">
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
          className="border-[1px] py-2 px-4 rounded mb-4"
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
          className="border-[1px] py-2 px-4 rounded  mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 hover:bg-blue-800 text-white md:w-[200px] w-full rounded"
        >
          LOG IN
        </button>
      </form>
      <Link
        className="text-black  text-center text-sm underline"
        href="/register"
      >
        Register
      </Link>
      <p className="text-gray-400 text-center text-sm">
        &copy; Copyright {new Date().getFullYear()} by TDL2627
      </p>
    </main>
  );
}
