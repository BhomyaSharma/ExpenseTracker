"use client"; // Ensure it's a client component
import { useState } from "react";
import { 
  FaHome, 
  FaChartPie, 
  FaCog, 
  FaSignOutAlt, 
  FaBars, 
  FaMoneyBillWave 
} from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`h-screen bg-gray-900 shadow-xl text-white transition-all duration-300 flex flex-col py-6 relative ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-6 right-4 text-white text-2xl hover:text-gray-400 transition"
      >
        <FaBars />
      </button>

      {/* Logo / Title */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-6 text-center ${
          !isOpen && "hidden"
        }`}
      >
        BudgetTrack
      </motion.h2>

      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-6 w-full">
        <SidebarItem href="/" icon={<FaHome />} text="Home" isOpen={isOpen} />
        <SidebarItem href="/budget" icon={<FaMoneyBillWave />} text="Budget" isOpen={isOpen} />
        <SidebarItem href="/reports" icon={<FaChartPie />} text="Reports" isOpen={isOpen} />
        <SidebarItem href="/settings" icon={<FaCog />} text="Settings" isOpen={isOpen} />
      </nav>

      {/* Logout */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="mt-auto p-4"
      >
        <SidebarItem
          href="/logout"
          icon={<FaSignOutAlt className="text-red-500" />}
          text="Logout"
          isOpen={isOpen}
        />
      </motion.div>
    </aside>
  );
}

function SidebarItem({ href, icon, text, isOpen }) {
  return (
    <Link
      href={href}
      className="sidebar-item flex items-center space-x-3 py-3 px-6 text-lg font-medium rounded-lg transition-all hover:bg-gray-800"
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{text}</motion.span>}
    </Link>
  );
}
