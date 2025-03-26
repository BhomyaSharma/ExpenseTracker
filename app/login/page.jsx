"use client";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div 
  className="flex items-center justify-center min-h-screen w-full bg-cover bg-center relative"
  style={{ backgroundImage: "url('/finance-bg.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}

>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Glassmorphic Card */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-sm w-full text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Track Your Expenses</h2>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 bg-opacity-50 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg text-white font-semibold transition"
          >
            Log In
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
