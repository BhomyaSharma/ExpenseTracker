"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaMoon, FaSun, FaChartPie, FaWallet, FaPiggyBank, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "../components/button";
import { Toaster, toast } from "sonner";
import moment from "moment";
import Link from "next/link";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Circular Progress Bar Component (reused from Budget Planner)
const CircularProgress = ({ percentage, spent, budget }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="gray"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={percentage < 75 ? "#10B981" : percentage < 100 ? "#FBBF24" : "#EF4444"}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500"
        />
      </svg>
      <p className="mt-2 text-sm text-gray-300">
        ${spent} / ${budget}
      </p>
    </div>
  );
};

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentMonth] = useState(moment().format("YYYY-MM"));

  // Load expenses and budgets from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
    const storedBudgets = JSON.parse(localStorage.getItem("budgets")) ?? [];
    setExpenses(storedExpenses);
    setBudgets(storedBudgets.filter((b) => b.month === currentMonth));
  }, []);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Calculate financial metrics
  const totalExpenses = expenses
    .filter((e) => moment(e.date).format("YYYY-MM") === currentMonth)
    .reduce((sum, e) => sum + e.amount, 0);
  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;
  const savings = remainingBudget > 0 ? remainingBudget : 0;

  // Calculate spending by category for pie chart
  const spendingByCategory = budgets.reduce((acc, budget) => {
    const spent = expenses
      .filter(
        (e) =>
          e.category === budget.category &&
          moment(e.date).format("YYYY-MM") === currentMonth
      )
      .reduce((sum, e) => sum + e.amount, 0);
    acc[budget.category] = spent;
    return acc;
  }, {});

  // Pie chart data
  const chartData = {
    labels: Object.keys(spendingByCategory),
    datasets: [
      {
        data: Object.values(spendingByCategory),
        backgroundColor: ["#F472B6", "#A78BFA", "#34D399", "#FBBF24", "#EF4444"],
        borderColor: ["#1F2937"],
        borderWidth: 2,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: darkMode ? "#D1D5DB" : "#1F2937",
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#FFF",
        bodyColor: "#FFF",
      },
    },
    maintainAspectRatio: false,
  };

  // Generate AI insights
  const insights = budgets.map((budget) => {
    const spent = spendingByCategory[budget.category] || 0;
    const percentage = (spent / budget.amount) * 100;
    if (percentage > 100) {
      return `You're ${percentage.toFixed(0)}% over budget on ${budget.category}! Consider cutting back.`;
    } else if (percentage > 75) {
      return `You're nearing your ${budget.category} budget (${percentage.toFixed(0)}% used).`;
    } else {
      return `Great job! You're only at ${percentage.toFixed(0)}% of your ${budget.category} budget.`;
    }
  });

  // Get recent transactions (latest 5)
  const recentTransactions = expenses
    .filter((e) => moment(e.date).format("YYYY-MM") === currentMonth)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-gray-100 to-white text-gray-900"} p-8`}>
      <Toaster richColors position="top-right" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
        >
          {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-900" />}
        </Button>
      </div>

      {/* Summary Widgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-2xl">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-3xl text-red-400 mr-3" />
            <h3 className="text-lg font-semibold">Total Expenses</h3>
          </div>
          <p className="text-2xl font-bold mt-2">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-2xl">
          <div className="flex items-center">
            <FaWallet className="text-3xl text-green-400 mr-3" />
            <h3 className="text-lg font-semibold">Remaining Budget</h3>
          </div>
          <p className="text-2xl font-bold mt-2">${remainingBudget.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-2xl">
          <div className="flex items-center">
            <FaPiggyBank className="text-3xl text-pink-400 mr-3" />
            <h3 className="text-lg font-semibold">Savings</h3>
          </div>
          <p className="text-2xl font-bold mt-2">${savings.toFixed(2)}</p>
        </div>
      </motion.div>

      {/* Spending Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 p-8 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaChartPie className="mr-2 text-pink-400" /> Spending by Category
        </h2>
        {Object.keys(spendingByCategory).length > 0 ? (
          <div className="h-64">
            <Pie data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-gray-400">No spending data for this month.</p>
        )}
      </motion.div>

      {/* Budget Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold mb-6">Budget Progress</h2>
        {budgets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No budgets set for this month.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget) => {
              const spent = spendingByCategory[budget.category] || 0;
              const percentage = Math.min((spent / budget.amount) * 100, 100);
              return (
                <motion.div
                  key={budget.id}
                  className="p-6 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-xl font-semibold mb-4">{budget.category}</h3>
                  <CircularProgress percentage={percentage} spent={spent} budget={budget.amount} />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold mb-6">Recent Transactions</h2>
        {recentTransactions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No recent transactions.</p>
        ) : (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                className="flex justify-between items-center bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h3 className="text-lg font-semibold">{transaction.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {transaction.category} - ${transaction.amount} - {transaction.date}
                  </p>
                </div>
                <Link href="/transactions">
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                    View All
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mb-8 flex gap-4"
      >
        <Link href="/transactions">
          <Button
            onClick={() => toast.success("Navigating to Transactions")}
            className="flex-1 flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-lg shadow-md"
          >
            <FaPlus className="mr-2" /> Add Transaction
          </Button>
        </Link>
        <Link href="/budget">
          <Button
            onClick={() => toast.success("Navigating to Budget Planner")}
            className="flex-1 flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 rounded-lg shadow-md"
          >
            <FaPlus className="mr-2" /> Set Budget
          </Button>
        </Link>
      </motion.div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="p-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-6">AI Insights</h2>
          <ul className="space-y-4">
            {insights.map((insight, index) => (
              <li key={index} className="text-gray-300">{insight}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
// "use client";
// import React from "react";
// import {
//   FaChartPie,
//   FaMoneyBillWave,
//   FaCogs,
// } from "react-icons/fa";
// import {
//   FiTrendingUp,
//   FiTrendingDown,
//   FiBarChart,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function Dashboard() {
//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
//       {/* Sidebar */}
//       <aside className="w-72 bg-gray-900 p-6 shadow-xl">
//         <h2 className="text-3xl font-bold text-red-500 mb-8 tracking-wide">
//           BudgetTrack
//         </h2>
//         <nav className="space-y-6">
//           <Link
//             href="/dashboard"
//             className="block py-3 px-6 bg-red-600 rounded-lg text-lg font-semibold hover:scale-105 transition"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/budget"
//             className="block py-3 px-6 hover:bg-gray-700 rounded-lg text-lg font-semibold transition"
//           >
//             Budget
//           </Link>
//           <Link
//             href="/transactions"
//             className="block py-3 px-6 hover:bg-gray-700 rounded-lg text-lg font-semibold transition"
//           >
//             Transactions
//           </Link>
//           <Link
//             href="/settings"
//             className="block py-3 px-6 hover:bg-gray-700 rounded-lg text-lg font-semibold transition"
//           >
//             Settings
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Link
//             href="/budget"
//             className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition"
//           >
//             <FaChartPie className="text-3xl text-blue-400" />
//             <span className="text-lg font-semibold">View Budget</span>
//           </Link>

//           <Link
//             href="/transactions"
//             className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition"
//           >
//             <FaMoneyBillWave className="text-3xl text-green-400" />
//             <span className="text-lg font-semibold">Manage Transactions</span>
//           </Link>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-8 bg-gray-800 rounded-xl shadow-xl flex items-center space-x-6"
//           >
//             <FiTrendingDown className="text-red-400 text-5xl" />
//             <div>
//               <h3 className="text-xl font-semibold">Total Expenses</h3>
//               <p className="text-3xl font-bold">$3,200</p>
//             </div>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-8 bg-gray-800 rounded-xl shadow-xl flex items-center space-x-6"
//           >
//             <FiBarChart className="text-yellow-400 text-5xl" />
//             <div>
//               <h3 className="text-xl font-semibold">Savings</h3>
//               <p className="text-3xl font-bold">$1,800</p>
//             </div>
//           </motion.div>
//         </div>

//         {/* Recent Transactions */}
//         <section className="mt-12">
//           <h2 className="text-3xl font-semibold mb-6">Recent Transactions</h2>
//           <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
//             <table className="w-full text-lg">
//               <thead>
//                 <tr className="text-gray-400 border-b border-gray-700">
//                   <th className="text-left pb-4">Date</th>
//                   <th className="text-left pb-4">Category</th>
//                   <th className="text-left pb-4">Amount</th>
//                   <th className="text-left pb-4">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-700">
//                   <td className="py-4">12 Mar 2025</td>
//                   <td className="py-4">Groceries</td>
//                   <td className="py-4 text-red-400">- $200</td>
//                   <td className="py-4">Completed</td>
//                 </tr>
//                 <tr className="border-b border-gray-700">
//                   <td className="py-4">10 Mar 2025</td>
//                   <td className="py-4">Salary</td>
//                   <td className="py-4 text-green-400">+ $3,000</td>
//                   <td className="py-4">Completed</td>
//                 </tr>
//                 <tr>
//                   <td className="py-4">9 Mar 2025</td>
//                   <td className="py-4">Entertainment</td>
//                   <td className="py-4 text-red-400">- $50</td>
//                   <td className="py-4">Completed</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
