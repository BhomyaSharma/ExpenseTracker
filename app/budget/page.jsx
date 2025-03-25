// "use client";
// import dynamic from "next/dynamic";

// const PieChart = dynamic(() => import("../components/PieChart"), { ssr: false });

// export default function Budget() {
//   return (
//     <div>
//       <h1>Budget</h1>
//       <PieChart />
//     </div>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const getExpenses = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  }
  return [];
};

export default function BudgetInsights() {
  const [expenses, setExpenses] = useState([]);
  const [viewMode, setViewMode] = useState("weekly"); // Toggle between weekly & monthly

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const totalExpenses = expenses.reduce((acc, { amount }) => acc + amount, 0);

  const categoryData = Object.entries(
    expenses.reduce((acc, { category, amount }) => {
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {})
  )
    .map(([category, total]) => ({ name: category, value: total }))
    .sort((a, b) => b.value - a.value);

  const topCategories = categoryData.slice(0, 3); // Get top 3 spending categories

  const groupByDate = (dateFunc) =>
    Object.entries(
      expenses.reduce((acc, { date, amount }) => {
        const period = dateFunc(new Date(date));
        acc[period] = (acc[period] || 0) + amount;
        return acc;
      }, {})
    ).map(([period, total]) => ({ name: period, value: total }));

  const weeklyData = groupByDate((date) => `Week ${Math.ceil(date.getDate() / 7)}`);
  const monthlyData = groupByDate((date) => date.toLocaleString("en-GB", { month: "long" }));

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Link href="/dashboard">
        <button className="flex items-center space-x-2 bg-gray-800 p-2 rounded-md">
          <FaArrowLeft /> <span>Back to Dashboard</span>
        </button>
      </Link>

      <h1 className="text-3xl font-bold text-center mt-4">Budget Insights</h1>

      {/* Total Expenses */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">Total Expenses: ₹{totalExpenses}</h2>
      </div>

      {/* Top 3 Categories */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Top 3 Spending Categories</h2>
        {topCategories.length > 0 ? (
          <ul>
            {topCategories.map((cat, index) => (
              <li key={index} className="text-lg">
                {index + 1}. {cat.name}: ₹{cat.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* Category-wise Pie Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Category-wise Spending</h2>
        <PieChart width={400} height={300}>
          <Pie dataKey="value" data={categoryData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          <Tooltip />
        </PieChart>
      </div>

      {/* Toggle Weekly/Monthly View */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          className={`p-2 rounded-md ${viewMode === "weekly" ? "bg-blue-500" : "bg-gray-700"}`}
          onClick={() => setViewMode("weekly")}
        >
          Weekly
        </button>
        <button
          className={`p-2 rounded-md ${viewMode === "monthly" ? "bg-blue-500" : "bg-gray-700"}`}
          onClick={() => setViewMode("monthly")}
        >
          Monthly
        </button>
      </div>

      {/* Weekly/Monthly Bar Chart */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">{viewMode === "weekly" ? "Weekly" : "Monthly"} Spending Report</h2>
        <BarChart width={500} height={300} data={viewMode === "weekly" ? weeklyData : monthlyData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill={viewMode === "weekly" ? "#82ca9d" : "#ffc658"} />
        </BarChart>
      </div>
    </div>
  );
}

