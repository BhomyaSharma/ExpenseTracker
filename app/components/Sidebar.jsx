"use client"; // Ensure it's a client component
import { useState } from "react";
import { FaHome, FaChartPie, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`bg-gray-900 text-white shadow-xl transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } h-screen flex flex-col items-center py-8 relative`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-5 right-4 text-white text-2xl"
      >
        <FaBars />
      </button>

      <h2
        className={`text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text mb-6 ${
          !isOpen && "hidden"
        }`}
      >
        Dashboard
      </h2>

      <nav className="flex flex-col space-y-4 w-full text-center">
        <SidebarItem href="/" icon={<FaHome />} text="Home" isOpen={isOpen} />
        <SidebarItem href="/budget" icon={<FaChartPie />} text="Budget" isOpen={isOpen} />
        <SidebarItem href="/settings" icon={<FaCog />} text="Settings" isOpen={isOpen} />
        <SidebarItem href="/logout" icon={<FaSignOutAlt className="text-red-500" />} text="Logout" isOpen={isOpen} />
      </nav>
    </aside>
  );
}

function SidebarItem({ href, icon, text, isOpen }) {
  return (
    <Link href={href} className="sidebar-item flex items-center space-x-3 p-3 hover:bg-gray-800 rounded-lg">
      <span className="text-xl">{icon}</span>
      {isOpen && <span>{text}</span>}
    </Link>
  );
}
