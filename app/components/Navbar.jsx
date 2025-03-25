"use client";

import { FaUserCircle, FaBell } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white px-8 py-4 shadow-xl backdrop-blur-lg bg-opacity-80">
      
      {/* Brand Logo / Title */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text"
      >
        Expense Tracker
      </motion.h1>

      {/* Search Bar & Icons */}
      <div className="flex items-center space-x-6">
        
        {/* Search Input */}
        <motion.input
          whileFocus={{ scale: 1.05 }}
          type="text"
          placeholder="Search transactions..."
          className="px-4 py-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-red-400 transition w-64"
        />

        {/* Notification Icon */}
        <motion.div whileHover={{ scale: 1.1 }} className="cursor-pointer relative">
          <FaBell className="text-2xl text-gray-400 hover:text-red-400 transition" />
          {/* Notification Badge (Future Use) */}
          <span className="absolute top-0 right-0 bg-red-500 text-xs font-bold px-1.5 py-0.5 rounded-full text-white">
            3
          </span>
        </motion.div>

        {/* User Profile */}
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          className="relative cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <FaUserCircle className="text-4xl text-gray-300 hover:text-red-400 transition" />

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.3 }}
              className="absolute right-0 mt-3 bg-gray-800 text-white shadow-lg rounded-md py-2 w-48"
            >
              <p className="px-4 py-2 border-b border-gray-700">Welcome, User</p>
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</a>
              <a href="/logout" className="block px-4 py-2 hover:bg-red-600">Logout</a>
            </motion.div>
          )}
        </motion.div>
        
      </div>
    </nav>
  );
}
