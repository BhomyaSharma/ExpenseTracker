import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-800 via-blue-600 to-indigo-900">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-10 w-96">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl py-2 font-semibold hover:scale-105 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
