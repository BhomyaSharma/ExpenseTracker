export default function ExpenseCard() {
    const budget = 5000; // Total budget
    const spent = 3200; // Expenses
    const remaining = budget - spent; // Remaining balance
  
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Expense Overview</h2>
  
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400">Total Budget:</span>
          <span className="text-lg font-bold text-green-400">${budget}</span>
        </div>
  
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-400">Total Spent:</span>
          <span className="text-lg font-bold text-red-500">-${spent}</span>
        </div>
  
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Remaining Balance:</span>
          <span className={`text-lg font-bold ${remaining < 0 ? "text-red-500" : "text-yellow-400"}`}>
            ${remaining}
          </span>
        </div>
        
        <div className="mt-4 w-full bg-gray-700 h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-red-500 transition-all"
            style={{ width: `${(spent / budget) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }
  