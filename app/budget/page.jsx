"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaMoon, FaSun, FaChartPie } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Toaster, toast } from "sonner";
import moment from "moment";

// Circular Progress Bar Component
const CircularProgress = ({ percentage, spent, budget }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = percentage < 75 ? "text-green-400" : percentage < 100 ? "text-yellow-400" : "text-red-400";

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

export default function BudgetPlanner() {
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [editingBudget, setEditingBudget] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [currentMonth] = useState(moment().format("YYYY-MM"));

  // Load expenses and budgets from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
    const storedBudgets = JSON.parse(localStorage.getItem("budgets")) ?? [];
    setExpenses(storedExpenses);
    setBudgets(storedBudgets.filter((b) => b.month === currentMonth));
  }, []);

  // Save budgets to localStorage
  useEffect(() => {
    if (budgets.length > 0) {
      localStorage.setItem("budgets", JSON.stringify(budgets));
    }
  }, [budgets]);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Calculate spending for a category in the current month
  const getSpending = (category) => {
    return expenses
      .filter(
        (expense) =>
          expense.category === category &&
          moment(expense.date).format("YYYY-MM") === currentMonth
      )
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Save or update a budget
  const saveBudget = () => {
    if (!category.trim() || !amount.trim()) {
      toast.error("Category and amount are required");
      return;
    }

    const budgetAmount = parseFloat(amount);
    const effectiveCategory = category === "custom" ? customCategory.trim() : category;

    if (category === "custom" && !customCategory.trim()) {
      toast.error("Please enter a custom category name");
      return;
    }

    if (editingBudget) {
      // Update existing budget
      setBudgets(
        budgets.map((budget) =>
          budget.id === editingBudget.id
            ? { ...budget, category: effectiveCategory, amount: budgetAmount }
            : budget
        )
      );
      setEditingBudget(null);
      toast.success("Budget Updated Successfully");
    } else {
      // Add new budget
      const newBudget = {
        id: Date.now(),
        category: effectiveCategory,
        amount: budgetAmount,
        month: currentMonth,
      };
      setBudgets((prev) => [...prev, newBudget]);
      toast.success("Budget Added Successfully");
    }

    // Reset form
    setCategory("");
    setAmount("");
    setCustomCategory("");
  };

  // Start editing a budget
  const startEditing = (budget) => {
    setEditingBudget(budget);
    setCategory(budget.category);
    setAmount(budget.amount.toString());
    setCustomCategory(budget.category);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingBudget(null);
    setCategory("");
    setAmount("");
    setCustomCategory("");
  };

  // Calculate total budget and spending
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + getSpending(budget.category), 0);

  // Generate insights
  const insights = budgets.map((budget) => {
    const spent = getSpending(budget.category);
    const percentage = (spent / budget.amount) * 100;
    if (percentage > 100) {
      return `You've overspent on ${budget.category} by $${(spent - budget.amount).toFixed(2)}!`;
    } else if (percentage > 75) {
      return `You're close to overspending on ${budget.category}. Only $${(budget.amount - spent).toFixed(2)} left.`;
    } else {
      return `You're managing ${budget.category} well! $${(budget.amount - spent).toFixed(2)} remaining.`;
    }
  });

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-gray-100 to-white text-gray-900"} p-8`}>
      <Toaster richColors position="top-right" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Budget Planner</h1>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
        >
          {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-900" />}
        </Button>
      </div>

      {/* Budget Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6">{editingBudget ? "Edit Budget" : "Set Budget"}</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mb-4 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
          <option value="custom">Custom Category</option>
        </select>
        {category === "custom" && (
          <Input
            placeholder="Custom Category Name"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
        )}
        <Input
          placeholder="Budget Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        />
        <div className="flex gap-4">
          <Button
            onClick={saveBudget}
            className="w-full flex items-center justify-center bg.gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-lg shadow-md transition-all duration-300"
          >
            <FaPlus className="mr-2" /> {editingBudget ? "Update Budget" : "Add Budget"}
          </Button>
          {editingBudget && (
            <Button
              onClick={cancelEditing}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 rounded-lg shadow-md transition-all duration-300"
            >
              Cancel
            </Button>
          )}
        </div>
      </motion.div>

      {/* Budget Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 p-8 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FaChartPie className="mr-2 text-pink-400" /> Monthly Budget Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium">Total Budgeted</p>
            <p className="text-2xl font-bold text-green-400">${totalBudget.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-lg font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-red-400">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      {/* Budget List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Your Budgets</h2>
        {budgets.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 animate-fade-in">No budgets set for this month.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgets.map((budget) => {
              const spent = getSpending(budget.category);
              const percentage = Math.min((spent / budget.amount) * 100, 100);
               return (
                <motion.div
                  key={budget.id}
                  className="p-6 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">{budget.category}</h3>
                    <Button
                      onClick={() => startEditing(budget)}
                      className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md transition-all duration-300"
                    >
                      <FaEdit />
                    </Button>
                  </div>
                  <CircularProgress percentage={percentage} spent={spent} budget={budget.amount} />
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Budget: ${budget.amount} | Spent: ${spent.toFixed(2)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Budget Insights */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 p-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-6">Budget Insights</h2>
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
// import { useState } from "react";
// import { FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";
// import { Dialog } from "@headlessui/react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { Bar, Pie } from "react-chartjs-2";
// import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

// Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// export default function BudgetPage() {
//   const [budgets, setBudgets] = useState([]);
//   const [newBudgetName, setNewBudgetName] = useState("");
//   const [isCreateBudgetOpen, setIsCreateBudgetOpen] = useState(false);
//   const [selectedBudget, setSelectedBudget] = useState(null);
//   const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
//   const [expenseDetails, setExpenseDetails] = useState({ name: "", amount: "", category: "Food" });

//   // Create new budget
//   const createBudget = () => {
//     if (newBudgetName.trim() === "") return;
//     setBudgets([...budgets, { name: newBudgetName, expenses: [] }]);
//     setNewBudgetName("");
//     setIsCreateBudgetOpen(false);
//   };

//   // Open dialog to add expense in an existing budget
//   const openAddExpenseDialog = (budget) => {
//     setSelectedBudget(budget);
//     setIsAddExpenseOpen(true);
//   };

//   // Add expense to selected budget
//   const addExpenseToBudget = () => {
//     if (!expenseDetails.name || !expenseDetails.amount) return;
//     const updatedBudgets = budgets.map((budget) =>
//       budget.name === selectedBudget.name
//         ? { ...budget, expenses: [...budget.expenses, { ...expenseDetails, amount: parseFloat(expenseDetails.amount) }] }
//         : budget
//     );
//     setBudgets(updatedBudgets);
//     setExpenseDetails({ name: "", amount: "", category: "Food" });
//     setIsAddExpenseOpen(false);
//   };

//   // Sample Chart Data
//   const expenseCategories = ["Food", "Transport", "Shopping", "Entertainment", "Bills"];
//   const categoryData = budgets.flatMap((b) => b.expenses).reduce((acc, e) => {
//     acc[e.category] = (acc[e.category] || 0) + e.amount;
//     return acc;
//   }, {});

//   const pieChartData = {
//     labels: Object.keys(categoryData),
//     datasets: [{ data: Object.values(categoryData), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"] }],
//   };

//   const barChartData = {
//     labels: budgets.map((b) => b.name),
//     datasets: [{ label: "Total Expenses", data: budgets.map((b) => b.expenses.reduce((sum, e) => sum + e.amount, 0)), backgroundColor: "#3498db" }],
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold text-white mb-4">Budget Management</h1>

//       {/* Create New Budget Button */}
//       <button onClick={() => setIsCreateBudgetOpen(true)} className="bg-red-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-700">
//         + Create New Budget
//       </button>

//       {/* Existing Budgets */}
//       {budgets.length > 0 ? (
//         budgets.map((budget) => (
//           <div key={budget.name} className="bg-gray-900 p-4 rounded-lg shadow-md mb-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-white">{budget.name}</h2>
//               <button onClick={() => openAddExpenseDialog(budget)} className="text-green-400 hover:text-green-500 flex items-center">
//                 <FiPlusCircle className="mr-1" /> Add Expense
//               </button>
//             </div>
//             {/* Expense List */}
//             {budget.expenses.length > 0 ? (
//               <ul className="mt-2">
//                 {budget.expenses.map((expense, index) => (
//                   <li key={index} className="text-white text-sm flex justify-between">
//                     <span>{expense.name} ({expense.category})</span>
//                     <span className="font-bold">${expense.amount}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-400 text-sm mt-2">No expenses added yet.</p>
//             )}
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-400">No budgets available. Create one!</p>
//       )}

//       {/* Charts */}
//       <div className="grid grid-cols-2 gap-6 mt-6">
//         <div className="bg-gray-900 p-4 rounded-lg shadow-md">
//           <h3 className="text-white text-center mb-2">Category-wise Expenses</h3>
//           <Pie data={pieChartData} />
//         </div>
//         <div className="bg-gray-900 p-4 rounded-lg shadow-md">
//           <h3 className="text-white text-center mb-2">Budget-wise Expenses</h3>
//           <Bar data={barChartData} />
//         </div>
//       </div>

//       {/* Create Budget Dialog */}
//       <Dialog open={isCreateBudgetOpen} onClose={() => setIsCreateBudgetOpen(false)} className="fixed inset-0 flex items-center justify-center">
//         <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
//           <Dialog.Title className="text-lg font-bold text-white">Create New Budget</Dialog.Title>
//           <input
//             type="text"
//             placeholder="Budget Name"
//             value={newBudgetName}
//             onChange={(e) => setNewBudgetName(e.target.value)}
//             className="mt-2 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
//           />
//           <div className="flex justify-end mt-4">
//             <button onClick={() => setIsCreateBudgetOpen(false)} className="text-gray-400 mr-2">Cancel</button>
//             <button onClick={createBudget} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Create</button>
//           </div>
//         </div>
//       </Dialog>

//       {/* Add Expense Dialog */}
//       <Dialog open={isAddExpenseOpen} onClose={() => setIsAddExpenseOpen(false)} className="fixed inset-0 flex items-center justify-center">
//         <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
//           <Dialog.Title className="text-lg font-bold text-white">Add Expense</Dialog.Title>
//           <input
//             type="text"
//             placeholder="Expense Name"
//             value={expenseDetails.name}
//             onChange={(e) => setExpenseDetails({ ...expenseDetails, name: e.target.value })}
//             className="mt-2 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
//           />
//           <input
//             type="number"
//             placeholder="Amount"
//             value={expenseDetails.amount}
//             onChange={(e) => setExpenseDetails({ ...expenseDetails, amount: e.target.value })}
//             className="mt-2 w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
//           />
//           <select
//             value={expenseDetails.category}
//             onChange={(e) => setExpenseDetails({ ...expenseDetails, category: e.target.value })}
//             className="mt-2 w-full p-2 rounded bg-gray-700 text-white"
//           >
//             {expenseCategories.map((category) => <option key={category} value={category}>{category}</option>)}
//           </select>
//           <div className="flex justify-end mt-4">
//             <button onClick={addExpenseToBudget} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Expense</button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// }