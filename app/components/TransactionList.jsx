"use client";
import { useEffect, useState } from "react";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from API (Assuming you have an API setup)
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
      <table className="w-full text-left">
        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="p-4">Date</th>
            <th className="p-4">Category</th>
            <th className="p-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <tr key={txn.id} className="border-b border-gray-700">
                <td className="p-4">{new Date(txn.date).toLocaleDateString()}</td>
                <td className="p-4">{txn.category}</td>
                <td className={`p-4 ${txn.amount < 0 ? "text-red-400" : "text-green-400"}`}>
                  {txn.amount < 0 ? "- " : "+ "}${Math.abs(txn.amount)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-400">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
