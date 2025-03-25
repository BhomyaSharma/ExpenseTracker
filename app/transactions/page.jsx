"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaSort, FaMoon, FaSun } from "react-icons/fa";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { toast } from "sonner";
import moment from "moment";

export default function Transactions() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [darkMode, setDarkMode] = useState(false);

  // Load expenses from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
    setExpenses(storedExpenses);
  }, []);

  // Save expenses to localStorage (only when changes happen)
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Function to add a new expense
  const addExpense = () => {
    if (!name.trim() || !amount.trim() || !category.trim()) {
      toast("All fields are required", { type: "error" });
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      date: moment().format("YYYY-MM-DD"),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setName("");
    setAmount("");
    setCategory("");
    toast("Expense Added Successfully");
  };

  // Function to remove an expense
  const removeExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    toast("Expense Removed");
  };

  // Function to filter and sort expenses
  const filteredExpenses = expenses
    .filter((expense) => (filterCategory ? expense.category === filterCategory : true))
    .sort((a, b) => {
      switch (sortOption) {
        case "amount-asc":
          return a.amount - b.amount;
        case "amount-desc":
          return b.amount - a.amount;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-6`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Transactions</h1>
        <Button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>
      </div>

      {/* Expense Form */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
        <Input placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-3" />
        <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mb-3" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md bg-gray-700 text-white mb-3">
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <Button onClick={addExpense} className="w-full flex items-center justify-center">
          <FaPlus className="mr-2" /> Add Expense
        </Button>
      </div>

      {/* Filters & Sorting */}
      <div className="mt-6 flex justify-between items-center">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="p-2 border rounded-md bg-gray-700 text-white">
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border rounded-md bg-gray-700 text-white">
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High to Low)</option>
          <option value="amount-asc">Amount (Low to High)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      {/* Expense List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Expense List</h2>
        <ul>
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-400">No expenses found.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <li key={expense.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{expense.name}</h3>
                  <p className="text-gray-400">{expense.category} - ${expense.amount} - {expense.date}</p>
                </div>
                <Button onClick={() => removeExpense(expense.id)} className="bg-red-500 hover:bg-red-700">
                  <FaTrash />
                </Button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}


