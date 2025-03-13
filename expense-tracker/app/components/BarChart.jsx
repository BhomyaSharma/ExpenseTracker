"use client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function BarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [{ label: "Expenses", data: [10, 20, 30], backgroundColor: "blue" }],
  };

  return <Bar data={data} />;
}
