"use client";
import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("../components/BarChart"), { ssr: false });

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <BarChart />
    </div>
  );
}
