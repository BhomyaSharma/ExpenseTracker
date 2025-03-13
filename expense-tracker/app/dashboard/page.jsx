"use client";
import { FaChartPie, FaMoneyBillWave, FaCogs } from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
        <Link href="/budget" className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition">
          <FaChartPie className="text-3xl text-blue-400" />
          <span className="text-lg font-semibold">View Budget</span>
        </Link>

        <Link href="/transactions" className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition">
          <FaMoneyBillWave className="text-3xl text-green-400" />
          <span className="text-lg font-semibold">Manage Transactions</span>
        </Link>

        <Link href="/settings" className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition">
          <FaCogs className="text-3xl text-yellow-400" />
          <span className="text-lg font-semibold">Settings</span>
        </Link>
      </div>
    </div>
  );
}
