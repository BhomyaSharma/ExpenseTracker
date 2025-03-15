// "use client";
// import { FaChartPie, FaMoneyBillWave, FaCogs } from "react-icons/fa";
// import Link from "next/link";

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
//         Dashboard Overview
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
//         <Link href="/budget" className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition">
//           <FaChartPie className="text-3xl text-blue-400" />
//           <span className="text-lg font-semibold">View Budget</span>
//         </Link>

//         <Link href="/transactions" className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition">
//           <FaMoneyBillWave className="text-3xl text-green-400" />
//           <span className="text-lg font-semibold">Manage Transactions</span>
//         </Link>

//         <Link href="/settings" className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg transform hover:scale-105 transition">
//           <FaCogs className="text-3xl text-yellow-400" />
//           <span className="text-lg font-semibold">Settings</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";
import { FaChartPie, FaMoneyBillWave, FaCogs } from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text tracking-wide mb-10">
        Dashboard Overview
      </h1>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
        {/* Budget Card */}
        <Link 
          href="/budget" 
          className="p-8 bg-[#1f1f1f] rounded-2xl flex flex-col items-center space-y-4 shadow-lg 
                     border border-gray-700 hover:border-indigo-400 
                     hover:shadow-indigo-500/50 transition-all duration-300"
        >
          <FaChartPie className="text-5xl text-indigo-300" />
          <span className="text-xl font-semibold">View Budget</span>
        </Link>

        {/* Transactions Card */}
        <Link 
          href="/transactions" 
          className="p-8 bg-[#1f1f1f] rounded-2xl flex flex-col items-center space-y-4 shadow-lg 
                     border border-gray-700 hover:border-green-400 
                     hover:shadow-green-500/50 transition-all duration-300"
        >
          <FaMoneyBillWave className="text-5xl text-green-300" />
          <span className="text-xl font-semibold">Manage Transactions</span>
        </Link>

        {/* Settings Card */}
        <Link 
          href="/settings" 
          className="p-8 bg-[#1f1f1f] rounded-2xl flex flex-col items-center space-y-4 shadow-lg 
                     border border-gray-700 hover:border-yellow-400 
                     hover:shadow-yellow-500/50 transition-all duration-300"
        >
          <FaCogs className="text-5xl text-yellow-300" />
          <span className="text-xl font-semibold">Settings</span>
        </Link>
      </div>
    </div>
  );
}
