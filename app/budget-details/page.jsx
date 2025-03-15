// "use client";
// import dynamic from "next/dynamic";
// import { FaArrowLeft, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
// import Link from "next/link";

// const PieChart = dynamic(() => import("../components/PieChart"), { ssr: false });

// export default function BudgetDetails() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-10">
//       {/* Header */}
//       <div className="max-w-4xl mx-auto">
//         <Link href="/budget" className="flex items-center text-gray-300 hover:text-white transition mb-6">
//           <FaArrowLeft className="mr-2" /> Back to Overview
//         </Link>
//         <h1 className="text-4xl font-bold text-center">Detailed Budget Breakdown</h1>
//       </div>

//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mt-8">
//         {/* Pie Chart */}
//         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Category Distribution</h2>
//           <PieChart />
//         </div>

//         {/* Expense List */}
//         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-semibold mb-4">Expense Categories</h2>
//           <ul className="space-y-3">
//             <li className="flex justify-between">
//               <span>🏠 Rent</span>
//               <span className="text-red-400">$1200</span>
//             </li>
//             <li className="flex justify-between">
//               <span>🍔 Food</span>
//               <span className="text-yellow-400">$400</span>
//             </li>
//             <li className="flex justify-between">
//               <span>🚗 Transport</span>
//               <span className="text-blue-400">$150</span>
//             </li>
//             <li className="flex justify-between">
//               <span>💡 Utilities</span>
//               <span className="text-green-400">$100</span>
//             </li>
//           </ul>
//         </div>

//         {/* Monthly Trends Graph */}
//         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg md:col-span-2">
//           <h2 className="text-2xl font-semibold mb-4 flex items-center">
//             <FaChartLine className="mr-2 text-indigo-400" /> Spending Trends
//           </h2>
//           <p className="text-gray-300 mb-4">Track your expenses over the past months.</p>
//           <div className="h-40 bg-gray-800 rounded-lg flex items-center justify-center">
//             {/* Placeholder for future chart component */}
//             📊 (Graph will be here)
//           </div>
//         </div>

//         {/* Budget Insights */}
//         <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg md:col-span-2">
//           <h2 className="text-2xl font-semibold mb-4 flex items-center">
//             <FaMoneyBillWave className="mr-2 text-green-400" /> Budget Insights
//           </h2>
//           <p className="text-gray-300">You're **10% over budget** in the **Food** category. Consider reducing dining out expenses.</p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import dynamic from "next/dynamic";
import { FaArrowLeft, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

// Dynamically import the PieChart and LineChart components
const PieChart = dynamic(() => import("../components/PieChart"), { ssr: false });
const LineChart = dynamic(() => import("../components/LineChart"), { ssr: false });

export default function BudgetDetails() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <Link href="/budget" className="flex items-center text-gray-300 hover:text-white transition mb-6">
          <FaArrowLeft className="mr-2" /> Back to Overview
        </Link>
        <h1 className="text-4xl font-bold text-center">Detailed Budget Breakdown</h1>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mt-8">
        {/* Pie Chart */}
        {/* Pie Chart Section (Category Distribution) */}
    <div className="bg-gray-900/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4 text-white">Category Distribution</h2>
      <PieChart />
    </div>


        {/* Expense List */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Expense Categories</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>🏠 Rent</span>
              <span className="text-red-400">$1200</span>
            </li>
            <li className="flex justify-between">
              <span>🍔 Food</span>
              <span className="text-yellow-400">$400</span>
            </li>
            <li className="flex justify-between">
              <span>🚗 Transport</span>
              <span className="text-blue-400">$150</span>
            </li>
            <li className="flex justify-between">
              <span>💡 Utilities</span>
              <span className="text-green-400">$100</span>
            </li>
          </ul>
        </div>

        {/* Monthly Trends Graph */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaChartLine className="mr-2 text-indigo-400" /> Spending Trends
          </h2>
          <p className="text-gray-300 mb-4">Track your expenses over the past months.</p>
          <div className="h-60 bg-gray-800 rounded-lg p-4">
            <LineChart />
          </div>
        </div>

        {/* Budget Insights */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-400" /> Budget Insights
          </h2>
          <p className="text-gray-300">
            You're <strong>10% over budget</strong> in the <strong>Food</strong> category. Consider reducing dining out expenses.
          </p>
        </div>
      </div>
    </div>
  );
}
