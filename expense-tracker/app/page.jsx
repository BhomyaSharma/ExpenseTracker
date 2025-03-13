"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center relative text-white">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 animate-gradient"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[200px] h-[200px] bg-white/20 blur-3xl rounded-full absolute top-10 left-20 animate-pulse"></div>
        <div className="w-[150px] h-[150px] bg-white/10 blur-3xl rounded-full absolute bottom-10 right-20 animate-bounce"></div>
      </div>

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Track Your Expenses Like a Pro!
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl text-center text-gray-200 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        AI-powered financial tracking with beautiful insights.
      </motion.p>

      <motion.div
        className="mt-6 z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link href="/signup">
          <button className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-full shadow-2xl hover:scale-110 hover:bg-indigo-200 transition transform duration-300">
            Get Started 🚀
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
