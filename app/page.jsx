// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";


// export default function Home() {
//   return (
//     <main className="bg-[#111] min-h-screen text-white flex flex-col items-center">
//       {/* Navbar */}
//       <nav className="w-full max-w-7xl flex justify-between items-center py-6 px-8 bg-[#222] rounded-b-lg">
//         <h1 className="text-2xl font-extrabold tracking-wide text-white">BudgetTrack</h1>
//         <ul className="hidden md:flex space-x-6 text-gray-300">
//           <li><Link href="/dashboard" className="hover:text-white transition">Dashb</Link></li>
//           <li><Link href="/budget" className="hover:text-white transition">Budget</Link></li>
//           <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
//           <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
//         </ul>
//         <div className="flex gap-4">
//         <div className="bg-blue-500 p-4 text-white">Tailwind is working</div>

//           <Link href="/login">
//             <button className="text-gray-300 hover:text-white transition">Sign in</button>
//           </Link>
//           <Link href="/signup">
//             <button className="px-5 py-2 bg-[#e63946] text-white rounded-md hover:bg-[#c71f32] transition">
//               Get started
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between py-20 px-8">
//         {/* Left Content */}
//         <div className="max-w-lg space-y-6">
//           <p className="text-gray-400 uppercase text-sm tracking-wide">• Manage your expenses</p>
//           <h2 className="text-5xl font-extrabold leading-tight">Track and manage your finances</h2>
//           <p className="text-gray-400 text-lg">Learn more about our financial tools</p>
//           <div className="flex gap-6">
//             <Link href="/signup">
//               <button className="px-6 py-3 bg-[#e63946] hover:bg-[#c71f32] text-white rounded-md shadow-md transition">
//                 Start now
//               </button>
//             </Link>
//             <Link href="/features">
//               <button className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-md transition">
//                 Explore features
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Right Side - Piggy Bank Illustration */}
//         <motion.div 
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <Image 
//             src="/images/piggy-bank.png" 
//             alt="Finance Management"
//             width={400} 
//             height={400}
//             className="rounded-lg shadow-lg"
//           />
//         </motion.div>
//       </section>

//       {/* Trusted by Section */}
//       <section className="py-8 text-center">
//         <p className="text-gray-400 text-sm">Trusted by individuals and teams at leading financial institutions</p>
//         <div className="flex gap-8 justify-center mt-4">
//           <span className="text-gray-500 text-2xl">🏦</span>
//           <span className="text-gray-500 text-2xl">💰</span>
//           <span className="text-gray-500 text-2xl">📊</span>
//           <span className="text-gray-500 text-2xl">💳</span>
//           <span className="text-gray-500 text-2xl">📈</span>
//         </div>
//       </section>
//     </main>
//   );
// }
// }
// export default function Home() {
//   return (
//     <div className="bg-blue-500 text-white text-3xl p-10">
//       If this text has a blue background, Tailwind is working!
//     </div>
//   );
// 
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full max-w-7xl flex justify-between items-center py-6 px-8 bg-[#1E1E1E] rounded-b-lg shadow-lg">
        <h1 className="text-2xl font-extrabold tracking-wide text-white">BudgetTrack</h1>
        <ul className="hidden md:flex space-x-6 text-gray-300">
          <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
          <li><Link href="/budget" className="hover:text-white transition">Budget</Link></li>
          <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
          <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
        </ul>
        <div className="flex gap-4">
          <Link href="/login">
            <button className="text-gray-300 hover:text-white transition">Sign in</button>
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2 bg-[#9146ff] text-white rounded-md hover:bg-[#7a32d8] transition">
              Get started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between py-20 px-8">
        {/* Left Content */}
        <div className="max-w-lg space-y-6">
          <p className="text-gray-400 uppercase text-sm tracking-wide">• Manage your expenses</p>
          <h2 className="text-5xl font-extrabold leading-tight">Track and manage your finances effortlessly</h2>
          <p className="text-gray-400 text-lg">Optimize your financial planning with intelligent insights</p>
          <div className="flex gap-6">
            <Link href="/signup">
              <button className="px-6 py-3 bg-[#9146ff] hover:bg-[#7a32d8] text-white rounded-md shadow-md transition">
                Start now
              </button>
            </Link>
            <Link href="/features">
              <button className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-md transition">
                Explore features
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Piggy Bank Illustration */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image 
            src="/images/piggy-bank.png" 
            alt="Finance Management"
            width={400} 
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </section>

      {/* Trusted by Section */}
      <section className="py-8 text-center">
        <p className="text-gray-400 text-sm">Trusted by professionals and businesses globally</p>
        <div className="flex gap-8 justify-center mt-4">
          <span className="text-gray-500 text-2xl">🏦</span>
          <span className="text-gray-500 text-2xl">💰</span>
          <span className="text-gray-500 text-2xl">📊</span>
          <span className="text-gray-500 text-2xl">💳</span>
          <span className="text-gray-500 text-2xl">📈</span>
        </div>
      </section>
    </main>
  );
}
