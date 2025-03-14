"use client";
import dynamic from "next/dynamic";

const PieChart = dynamic(() => import("../components/PieChart"), { ssr: false });

export default function Budget() {
  return (
    <div>
      <h1>Budget</h1>
      <PieChart />
    </div>
  );
}
