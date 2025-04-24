"use client";

import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaMoon, FaSun } from "react-icons/fa";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Toaster, toast } from "sonner";
import moment from "moment";

export default function Transactions() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const [darkMode, setDarkMode] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Load expenses from localStorage
  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
    setExpenses(storedExpenses);
  }, []);

  // Save expenses to localStorage
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

  // Function to add or update an expense
  const saveExpense = () => {
    if (!name.trim() || !amount.trim() || !category.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (editingExpense) {
      // Update existing expense
      setExpenses(
        expenses.map((expense) =>
          expense.id === editingExpense.id
            ? {
                ...expense,
                name: name.trim(),
                amount: parseFloat(amount),
                category,
                date: moment().format("YYYY-MM-DD"),
              }
            : expense
        )
      );
      setEditingExpense(null);
      toast.success("Expense Updated Successfully");
    } else {
      // Add new expense
      const newExpense = {
        id: Date.now(),
        name: name.trim(),
        amount: parseFloat(amount),
        category,
        date: moment().format("YYYY-MM-DD"),
      };
      setExpenses((prev) => [...prev, newExpense]);
      toast.success("Expense Added Successfully");
    }

    // Reset form
    setName("");
    setAmount("");
    setCategory("");
  };

  // Function to start editing an expense
  const startEditing = (expense) => {
    setEditingExpense(expense);
    setName(expense.name);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingExpense(null);
    setName("");
    setAmount("");
    setCategory("");
  };

  // Function to remove an expense
  const removeExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
    toast.success("Expense Deleted Successfully");
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
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-gray-100 to-white text-gray-900"} p-8`}>
      <Toaster richColors position="top-right" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Manage Transactions</h1>
        <Button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
        >
          {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-900" />}
        </Button>
      </div>

      {/* Expense Form */}
      <div className="mb-8 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-2xl transition-all duration-300">
        <h2 className="text-2xl font-semibold mb-6">{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
        <Input
          placeholder="Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        />
        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white mb-4 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <div className="flex gap-4">
          <Button
            onClick={saveExpense}
            className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 rounded-lg shadow-md transition-all duration-300"
          >
            <FaPlus className="mr-2" /> {editingExpense ? "Update Expense" : "Add Expense"}
          </Button>
          {editingExpense && (
            <Button
              onClick={cancelEditing}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 rounded-lg shadow-md transition-all duration-300"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full sm:w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High to Low)</option>
          <option value="amount-asc">Amount (Low to High)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>

      {/* Expense List */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Expense List</h2>
        <ul className="space-y-4">
          {filteredExpenses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 animate-fade-in">No expenses found.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <li
                key={expense.id}
                className="flex justify-between items-center bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              >
                <div>
                  <h3 className="text-xl font-semibold">{expense.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{expense.category} - ${expense.amount} - {expense.date}</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => startEditing(expense)}
                    className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md transition-all duration-300"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    onClick={() => removeExpense(expense.id)}
                    className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md transition-all duration-300"
                  >
                    <FaTrash />
                  </Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
// "use client";

// import React, { useState, useEffect } from "react";
// import { FaPlus, FaTrash, FaEdit, FaMoon, FaSun } from "react-icons/fa";
// import { Button } from "../components/button";
// import { Input } from "../components/input";
// import { Toaster, toast } from "sonner";
// import moment from "moment";

// export default function Transactions() {
//   const [expenses, setExpenses] = useState([]);
//   const [name, setName] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [filterCategory, setFilterCategory] = useState("");
//   const [sortOption, setSortOption] = useState("date-desc");
//   const [darkMode, setDarkMode] = useState(false);
//   const [editingExpense, setEditingExpense] = useState(null);

//   // Load expenses from localStorage
//   useEffect(() => {
//     const storedExpenses = JSON.parse(localStorage.getItem("expenses")) ?? [];
//     setExpenses(storedExpenses);
//   }, []);

//   // Save expenses to localStorage
//   useEffect(() => {
//     if (expenses.length > 0) {
//       localStorage.setItem("expenses", JSON.stringify(expenses));
//     }
//   }, [expenses]);

//   // Toggle Dark Mode
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   // Function to add or update an expense
//   const saveExpense = () => {
//     if (!name.trim() || !amount.trim() || !category.trim()) {
//       toast.error("All fields are required");
//       return;
//     }

//     if (editingExpense) {
//       // Update existing expense
//       setExpenses(
//         expenses.map((expense) =>
//           expense.id === editingExpense.id
//             ? {
//                 ...expense,
//                 name: name.trim(),
//                 amount: parseFloat(amount),
//                 category,
//                 date: moment().format("YYYY-MM-DD"),
//               }
//             : expense
//         )
//       );
//       setEditingExpense(null);
//       toast.success("Expense Updated Successfully");
//     } else {
//       // Add new expense
//       const newExpense = {
//         id: Date.now(),
//         name: name.trim(),
//         amount: parseFloat(amount),
//         category,
//         date: moment().format("YYYY-MM-DD"),
//       };
//       setExpenses((prev) => [...prev, newExpense]);
//       toast.success("Expense Added Successfully");
//     }

//     // Reset form
//     setName("");
//     setAmount("");
//     setCategory("");
//   };

//   // Function to start editing an expense
//   const startEditing = (expense) => {
//     setEditingExpense(expense);
//     setName(expense.name);
//     setAmount(expense.amount.toString());
//     setCategory(expense.category);
//   };

//   // Function to cancel editing
//   const cancelEditing = () => {
//     setEditingExpense(null);
//     setName("");
//     setAmount("");
//     setCategory("");
//   };

//   // Function to remove an expense
//   const removeExpense = (id) => {
//     setExpenses(expenses.filter((expense) => expense.id !== id));
//     toast.success("Expense Deleted Successfully");
//   };

//   // Function to filter and sort expenses
//   const filteredExpenses = expenses
//     .filter((expense) => (filterCategory ? expense.category === filterCategory : true))
//     .sort((a, b) => {
//       switch (sortOption) {
//         case "amount-asc":
//           return a.amount - b.amount;
//         case "amount-desc":
//           return b.amount - a.amount;
//         case "name-asc":
//           return a.name.localeCompare(b.name);
//         case "name-desc":
//           return b.name.localeCompare(a.name);
//         case "date-asc":
//           return new Date(a.date) - new Date(b.date);
//         default:
//           return new Date(b.date) - new Date(a.date);
//       }
//     });

//   return (
//     <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-6`}>
//       <Toaster richColors position="top-right" />
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold">Manage Transactions</h1>
//         <Button onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </Button>
//       </div>

//       {/* Expense Form */}
//       <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
//         <Input placeholder="Expense Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-3" />
//         <Input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mb-3" />
//         <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md bg-gray-700 text-white mb-3">
//           <option value="">Select Category</option>
//           <option value="Food">Food</option>
//           <option value="Travel">Travel</option>
//           <option value="Entertainment">Entertainment</option>
//         </select>
//         <div className="flex gap-2">
//           <Button onClick={saveExpense} className="w-full flex items-center justify-center">
//             <FaPlus className="mr-2" /> {editingExpense ? "Update Expense" : "Add Expense"}
//           </Button>
//           {editingExpense && (
//             <Button onClick={cancelEditing} className="w-full bg-gray-500 hover:bg-gray-700">
//               Cancel
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Filters & Sorting */}
//       <div className="mt-6 flex justify-between items-center">
//         <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="p-2 border rounded-md bg-gray-700 text-white">
//           <option value="">All Categories</option>
//           <option value="Food">Food</option>
//           <option value="Travel">Travel</option>
//           <option value="Entertainment">Entertainment</option>
//         </select>
//         <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border rounded-md bg-gray-700 text-white">
//           <option value="date-desc">Date (Newest)</option>
//           <option value="date-asc">Date (Oldest)</option>
//           <option value="amount-desc">Amount (High to Low)</option>
//           <option value="amount-asc">Amount (Low to High)</option>
//           <option value="name-asc">Name (A-Z)</option>
//           <option value="name-desc">Name (Z-A)</option>
//         </select>
//       </div>

//       {/* Expense List */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold mb-4">Expense List</h2>
//         <ul>
//           {filteredExpenses.length === 0 ? (
//             <p className="text-gray-400">No expenses found.</p>
//           ) : (
//             filteredExpenses.map((expense) => (
//               <li key={expense.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-3">
//                 <div>
//                   <h3 className="text-lg font-semibold">{expense.name}</h3>
//                   <p className="text-gray-400">{expense.category} - ${expense.amount} - {expense.date}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button onClick={() => startEditing(expense)} className="bg-blue-500 hover:bg-blue-700">
//                     <FaEdit />
//                   </Button>
//                   <Button onClick={() => removeExpense(expense.id)} className="bg-red-500 hover:bg-red-700">
//                     <FaTrash />
//                   </Button>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }