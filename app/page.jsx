"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { FaUsers, FaShieldAlt, FaChartLine, FaRocket } from "react-icons/fa";

export default function Home() {
  // Variants for animations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-12 py-4 bg-gray-900/80 backdrop-blur-lg shadow-lg transition-all duration-300">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          BudgetTrack
        </h1>
        <div className="flex items-center space-x-8">
        <Link href="/dashboard" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 font-medium">
  Dashboard
</Link>
          <Link href="/budget" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 font-medium">
  Budget
</Link>
          <Link href="/transactions" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 font-medium">
            Transactions
          </Link>
          
          <Link href="/support" className="text-gray-300 hover:text-pink-400 transition-colors duration-200 font-medium">
            Support
          </Link>
          <Link href="/login">
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-24">
        <motion.div
          className="text-left max-w-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Smart Financial <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">Tracking</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg lg:text-xl leading-relaxed">
            Take control of your finances with AI-driven insights, powerful budgeting tools, and real-time expense tracking.
          </p>
          <div className="mt-8 flex space-x-4">
            <Link href="/signup">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="/features">
              <motion.button
                className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <img src="/finance-illustration.png" alt="Finance Tracking" className="w-[400px] lg:w-[500px] drop-shadow-2xl" />
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-gray-800/50 text-center"
      >
        <h2 className="text-4xl lg:text-5xl font-bold">
          Why Choose <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">BudgetTrack?</span>
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-16">
          {[
            { icon: <FaChartLine className="text-5xl text-pink-400" />, title: "Real-Time Tracking", desc: "Monitor your expenses with live analytics and actionable insights." },
            { icon: <FaShieldAlt className="text-5xl text-pink-400" />, title: "Secure & Private", desc: "Your data is protected with state-of-the-art encryption." },
            { icon: <FaUsers className="text-5xl text-pink-400" />, title: "AI-Powered Insights", desc: "Get personalized suggestions based on your spending habits." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-900/50 rounded-2xl shadow-xl flex flex-col items-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-center"
      >
        <h2 className="text-4xl lg:text-5xl font-bold">Our Impact</h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 lg:px-16">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "$5M+", label: "Tracked Expenses" },
            { number: "4.8/5", label: "User Rating" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-900/50 rounded-2xl shadow-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-3xl font-bold text-pink-400">{stat.number}</h3>
              <p className="text-gray-300 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-gray-900 text-center"
      >
        <h2 className="text-4xl lg:text-5xl font-bold">What Our Users Say</h2>
        <div className="mt-12 flex flex-col md:flex-row gap-8 px-6 lg:px-16">
          {["John Doe", "Sarah Lee", "Mike Ross"].map((user, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-800/50 rounded-2xl shadow-xl flex flex-col items-center max-w-md mx-auto backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <FiCheckCircle className="text-5xl text-green-400" />
              <p className="text-gray-300 mt-4 leading-relaxed">
                "This app completely transformed how I manage my finances. Highly recommend!"
              </p>
              <h4 className="mt-4 text-xl font-semibold">{user}</h4>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-center"
      >
        <h2 className="text-4xl lg:text-5xl font-bold">Ready to Master Your Finances?</h2>
        <p className="mt-4 text-lg text-gray-100 max-w-2xl mx-auto">
          Join thousands of users and start tracking your expenses with BudgetTrack today.
        </p>
        <Link href="/signup">
          <motion.button
            className="mt-8 px-10 py-4 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-8">
        <p className="text-gray-400">© 2025 BudgetTrack | All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <Link href="/privacy" className="text-gray-300 hover:text-pink-400 transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-gray-300 hover:text-pink-400 transition-colors duration-200">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-pink-400 transition-colors duration-200">
            Contact Us
          </Link>
        </div>
      </footer>
    </main>
  );
}
// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { FiCheckCircle } from "react-icons/fi";
// import { FaUsers, FaShieldAlt, FaChartLine } from "react-icons/fa";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-[#1E1E2E] via-[#22223B] to-[#312244] text-white">
      
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-10 py-6 bg-opacity-80 backdrop-blur-md shadow-md">
//         <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
//           BudgetTrack
//         </h1>
//         <div className="space-x-6">
//           <Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
//           <Link href="/budget" className="text-gray-300 hover:text-white">Budget</Link>
//           <Link href="/features" className="text-gray-300 hover:text-white">Features</Link>
//           <Link href="/support" className="text-gray-300 hover:text-white">Support</Link>
//           <Link href="/login">
//             <button className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-400 transition">
//               Sign In
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
//         <div className="text-left max-w-lg">
//           <motion.h1 
//             className="text-5xl font-bold leading-tight"
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Smart Financial <span className="text-pink-400">Tracking</span> at Your Fingertips
//           </motion.h1>
//           <p className="mt-4 text-gray-300 text-lg">
//             Gain control over your expenses with AI-driven insights, budgeting tools, and real-time tracking.
//           </p>
//           <div className="mt-6 flex space-x-4">
//             <Link href="/signup">
//               <motion.button 
//                 className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-500 transition shadow-lg"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 Get Started
//               </motion.button>
//             </Link>
//             <Link href="/features">
//               <motion.button 
//                 className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition shadow-lg"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 Learn More
//               </motion.button>
//             </Link>
//           </div>
//         </div>
        
//         {/* Illustration */}
//         <motion.div 
//           className="mt-10 md:mt-0"
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <img src="/finance-illustration.png" alt="Finance Tracking" className="w-[450px] drop-shadow-xl" />
//         </motion.div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 bg-gray-800 text-center">
//         <h2 className="text-4xl font-bold text-white">Why Choose <span className="text-pink-400">BudgetTrack?</span></h2>
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
//           {[
//             { icon: <FaChartLine />, title: "Real-Time Tracking", desc: "Monitor your expenses with live analytics and insights." },
//             { icon: <FaShieldAlt />, title: "Secure & Private", desc: "We prioritize data security with encrypted storage." },
//             { icon: <FaUsers />, title: "AI-Powered Insights", desc: "Get smart suggestions based on spending patterns." }
//           ].map((feature, index) => (
//             <motion.div 
//               key={index} 
//               className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="text-4xl text-pink-400">{feature.icon}</div>
//               <h3 className="text-xl font-semibold mt-3">{feature.title}</h3>
//               <p className="text-gray-300 mt-2">{feature.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16 bg-gray-900 text-center">
//         <h2 className="text-4xl font-bold">What Our Users Say</h2>
//         <div className="mt-10 flex flex-col md:flex-row gap-6 px-10">
//           {["John Doe", "Sarah Lee", "Mike Ross"].map((user, index) => (
//             <motion.div 
//               key={index} 
//               className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center max-w-md mx-auto"
//               whileHover={{ scale: 1.05 }}
//             >
//               <FiCheckCircle className="text-4xl text-green-400" />
//               <p className="text-gray-300 mt-3">"This app completely changed how I manage my money. Highly recommend!"</p>
//               <h4 className="mt-3 font-bold">{user}</h4>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-center">
//         <h2 className="text-4xl font-bold text-white">Ready to Take Control of Your Finances?</h2>
//         <p className="mt-3 text-lg text-white">Sign up now and start tracking your expenses like a pro.</p>
//         <Link href="/signup">
//           <motion.button 
//             className="mt-6 px-8 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
//             whileHover={{ scale: 1.1 }}
//           >
//             Get Started
//           </motion.button>
//         </Link>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-center py-6 mt-10">
//         <p className="text-gray-400">© 2025 BudgetTrack | All rights reserved.</p>
//       </footer>
//     </main>
//   );
// }
