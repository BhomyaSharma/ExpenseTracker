"use client";
import { useState } from "react";
import { FiPlusCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [newBudgetName, setNewBudgetName] = useState("");
  const [isCreateBudgetOpen, setIsCreateBudgetOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [expenseDetails, setExpenseDetails] = useState({ name: "", amount: "", category: "Food" });

  // Create new budget
  const createBudget = () => {
    if (newBudgetName.trim() === "") return;
    setBudgets([...budgets, { name: newBudgetName, expenses: [] }]);
    setNewBudgetName("");
    setIsCreateBudgetOpen(false);
  };

  // Open dialog to add expense in an existing budget
  const openAddExpenseDialog = (budget) => {
    setSelectedBudget(budget);
    setIsAddExpenseOpen(true);
  };

  // Add expense to selected budget
  const addExpenseToBudget = () => {
    if (!expenseDetails.name || !expenseDetails.amount) return;
    const updatedBudgets = budgets.map((budget) =>
      budget.name === selectedBudget.name
        ? { ...budget, expenses: [...budget.expenses, { ...expenseDetails, amount: parseFloat(expenseDetails.amount) }] }
        : budget
    );
    setBudgets(updatedBudgets);
    setExpenseDetails({ name: "", amount: "", category: "Food" });
    setIsAddExpenseOpen(false);
  };

  // Sample Chart Data
  const expenseCategories = ["Food", "Transport", "Shopping", "Entertainment", "Bills"];
  const categoryData = budgets.flatMap((b) => b.expenses).reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [{ data: Object.values(categoryData), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#8E44AD"] }],
  };

  const barChartData = {
    labels: budgets.map((b) => b.name),
    datasets: [{ label: "Total Expenses", data: budgets.map((b) => b.expenses.reduce((sum, e) => sum + e.amount, 0)), backgroundColor: "#3498db" }],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-4">Budget Management</h1>

      {/* Create New Budget Button */}
      <button onClick={() => setIsCreateBudgetOpen(true)} className="bg-red-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-700">
        + Create New Budget
      </button>

      {/* Existing Budgets */}
      {budgets.length > 0 ? (
        budgets.map((budget) => (
          <div key={budget.name} className="bg-gray-900 p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">{budget.name}</h2>
              <button onClick={() => openAddExpenseDialog(budget)} className="text-green-400 hover:text-green-500 flex items-center">
                <FiPlusCircle className="mr-1" /> Add Expense
              </button>
            </div>
            {/* Expense List */}
            {budget.expenses.length > 0 ? (
              <ul className="mt-2">
                {budget.expenses.map((expense, index) => (
                  <li key={index} className="text-white text-sm flex justify-between">
                    <span>{expense.name} ({expense.category})</span>
                    <span className="font-bold">${expense.amount}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm mt-2">No expenses added yet.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-400">No budgets available. Create one!</p>
      )}

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h3 className="text-white text-center mb-2">Category-wise Expenses</h3>
          <Pie data={pieChartData} />
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h3 className="text-white text-center mb-2">Budget-wise Expenses</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      {/* Create Budget Dialog */}
      <Dialog open={isCreateBudgetOpen} onClose={() => setIsCreateBudgetOpen(false)} className="fixed inset-0 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <Dialog.Title className="text-lg font-bold text-white">Create New Budget</Dialog.Title>
          <input
            type="text"
            placeholder="Budget Name"
            value={newBudgetName}
            onChange={(e) => setNewBudgetName(e.target.value)}
            className="mt-2 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <div className="flex justify-end mt-4">
            <button onClick={() => setIsCreateBudgetOpen(false)} className="text-gray-400 mr-2">Cancel</button>
            <button onClick={createBudget} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Create</button>
          </div>
        </div>
      </Dialog>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onClose={() => setIsAddExpenseOpen(false)} className="fixed inset-0 flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <Dialog.Title className="text-lg font-bold text-white">Add Expense</Dialog.Title>
          <input
            type="text"
            placeholder="Expense Name"
            value={expenseDetails.name}
            onChange={(e) => setExpenseDetails({ ...expenseDetails, name: e.target.value })}
            className="mt-2 w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="number"
            placeholder="Amount"
            value={expenseDetails.amount}
            onChange={(e) => setExpenseDetails({ ...expenseDetails, amount: e.target.value })}
            className="mt-2 w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <select
            value={expenseDetails.category}
            onChange={(e) => setExpenseDetails({ ...expenseDetails, category: e.target.value })}
            className="mt-2 w-full p-2 rounded bg-gray-700 text-white"
          >
            {expenseCategories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <div className="flex justify-end mt-4">
            <button onClick={addExpenseToBudget} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add Expense</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
