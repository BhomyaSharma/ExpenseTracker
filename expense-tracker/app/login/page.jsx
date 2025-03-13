"use client";
import { motion } from "framer-motion";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div 
        className="bg-gray-800 p-8 rounded-lg shadow-2xl w-96 text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-700 text-white mb-4 focus:ring-2 focus:ring-indigo-500" />
        <input type="password" placeholder="Password" className="w-full p-3 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500" />

        <button className="w-full mt-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
          Login
        </button>
      </motion.div>
    </div>
  );
}
