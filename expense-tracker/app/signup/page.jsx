"use client";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] text-white">
      <div className="bg-[#222] p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded bg-[#333] text-white focus:ring-2 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-[#333] text-white focus:ring-2 focus:ring-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
          <button className="w-full bg-[#e63946] hover:bg-[#c71f32] py-2 rounded text-white font-semibold transition">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-red-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
