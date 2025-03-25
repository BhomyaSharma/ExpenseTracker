"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";
import { FaUsers, FaShieldAlt, FaChartLine } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1E1E2E] via-[#22223B] to-[#312244] text-white">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 bg-opacity-80 backdrop-blur-md shadow-md">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
          BudgetTrack
        </h1>
        <div className="space-x-6">
          <Link href="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
          <Link href="/budget" className="text-gray-300 hover:text-white">Budget</Link>
          <Link href="/features" className="text-gray-300 hover:text-white">Features</Link>
          <Link href="/support" className="text-gray-300 hover:text-white">Support</Link>
          <Link href="/login">
            <button className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-400 transition">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="text-left max-w-lg">
          <motion.h1 
            className="text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Smart Financial <span className="text-pink-400">Tracking</span> at Your Fingertips
          </motion.h1>
          <p className="mt-4 text-gray-300 text-lg">
            Gain control over your expenses with AI-driven insights, budgeting tools, and real-time tracking.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link href="/signup">
              <motion.button 
                className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-500 transition shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                Get Started
              </motion.button>
            </Link>
            <Link href="/features">
              <motion.button 
                className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </div>
        
        {/* Illustration */}
        <motion.div 
          className="mt-10 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/finance-illustration.png" alt="Finance Tracking" className="w-[450px] drop-shadow-xl" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold text-white">Why Choose <span className="text-pink-400">BudgetTrack?</span></h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
          {[
            { icon: <FaChartLine />, title: "Real-Time Tracking", desc: "Monitor your expenses with live analytics and insights." },
            { icon: <FaShieldAlt />, title: "Secure & Private", desc: "We prioritize data security with encrypted storage." },
            { icon: <FaUsers />, title: "AI-Powered Insights", desc: "Get smart suggestions based on spending patterns." }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-gray-900 rounded-lg shadow-lg flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl text-pink-400">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-3">{feature.title}</h3>
              <p className="text-gray-300 mt-2">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold">What Our Users Say</h2>
        <div className="mt-10 flex flex-col md:flex-row gap-6 px-10">
          {["John Doe", "Sarah Lee", "Mike Ross"].map((user, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center max-w-md mx-auto"
              whileHover={{ scale: 1.05 }}
            >
              <FiCheckCircle className="text-4xl text-green-400" />
              <p className="text-gray-300 mt-3">"This app completely changed how I manage my money. Highly recommend!"</p>
              <h4 className="mt-3 font-bold">{user}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-center">
        <h2 className="text-4xl font-bold text-white">Ready to Take Control of Your Finances?</h2>
        <p className="mt-3 text-lg text-white">Sign up now and start tracking your expenses like a pro.</p>
        <Link href="/signup">
          <motion.button 
            className="mt-6 px-8 py-3 bg-white text-pink-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
            whileHover={{ scale: 1.1 }}
          >
            Get Started
          </motion.button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-6 mt-10">
        <p className="text-gray-400">© 2025 BudgetTrack | All rights reserved.</p>
      </footer>
    </main>
  );
}
