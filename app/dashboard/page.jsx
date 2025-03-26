"use client";
import React from "react";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaCogs,
} from "react-icons/fa";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 p-6 shadow-xl">
        <h2 className="text-3xl font-bold text-red-500 mb-8 tracking-wide">
          BudgetTrack
        </h2>
        <nav className="space-y-6">
          <Link
            href="/dashboard"
            className="block py-3 px-6 bg-red-600 rounded-lg text-lg font-semibold hover:scale-105 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/budget"
            className="block py-3 px-6 hover:bg-gray-700 rounded-lg text-lg font-semibold transition"
          >
            Budget
          </Link>
          <Link
            href="/transactions"
            className="block py-3 px-6 hover:bg-gray-700 rounded-lg text-lg font-semibold transition"
          >
            Transactions
          </Link>
          <Link
            href="/settings"
            className="block py-3 px-6 hover:bg-gray-700 rounded-lg text-lg font-semibold transition"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/budget"
            className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition"
          >
            <FaChartPie className="text-3xl text-blue-400" />
            <span className="text-lg font-semibold">View Budget</span>
          </Link>

          <Link
            href="/transactions"
            className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition"
          >
            <FaMoneyBillWave className="text-3xl text-green-400" />
            <span className="text-lg font-semibold">Manage Transactions</span>
          </Link>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gray-800 rounded-xl shadow-xl flex items-center space-x-6"
          >
            <FiTrendingDown className="text-red-400 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold">Total Expenses</h3>
              <p className="text-3xl font-bold">$3,200</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gray-800 rounded-xl shadow-xl flex items-center space-x-6"
          >
            <FiBarChart className="text-yellow-400 text-5xl" />
            <div>
              <h3 className="text-xl font-semibold">Savings</h3>
              <p className="text-3xl font-bold">$1,800</p>
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6">Recent Transactions</h2>
          <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
            <table className="w-full text-lg">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left pb-4">Date</th>
                  <th className="text-left pb-4">Category</th>
                  <th className="text-left pb-4">Amount</th>
                  <th className="text-left pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-4">12 Mar 2025</td>
                  <td className="py-4">Groceries</td>
                  <td className="py-4 text-red-400">- $200</td>
                  <td className="py-4">Completed</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4">10 Mar 2025</td>
                  <td className="py-4">Salary</td>
                  <td className="py-4 text-green-400">+ $3,000</td>
                  <td className="py-4">Completed</td>
                </tr>
                <tr>
                  <td className="py-4">9 Mar 2025</td>
                  <td className="py-4">Entertainment</td>
                  <td className="py-4 text-red-400">- $50</td>
                  <td className="py-4">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
