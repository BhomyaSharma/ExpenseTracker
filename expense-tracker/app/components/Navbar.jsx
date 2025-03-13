"use client";

import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-lg">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Expense Tracker
      </h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
        />
        <FaUserCircle className="text-3xl cursor-pointer hover:text-blue-400 transition" />
      </div>
    </nav>
  );
}
