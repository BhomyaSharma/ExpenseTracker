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
import dynamic from "next/dynamic";
import Link from "next/link";

const PieChart = dynamic(() => import("../components/PieChart"), { ssr: false });

export default function Budget() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Budget Overview
        </h1>
        <div className="flex justify-center">
          <PieChart />
        </div>
        <p className="text-gray-300 text-center mt-4">
          A breakdown of your financial distribution.
        </p>

        {/* View Details Button */}
        <Link href="/budget-details">
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

