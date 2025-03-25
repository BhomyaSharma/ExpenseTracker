// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export default function PieChart() {
//   const data = {
//     labels: ["Food", "Rent", "Entertainment", "Savings"],
//     datasets: [
//       {
//         label: "Expenses",
//         data: [300, 600, 200, 500],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//       },
//     ],
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense Breakdown</h3>
//       <Pie data={data} />
//     </div>
//   );
// }
"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const data = {
    labels: ["Rent", "Food", "Transport", "Utilities"],
    datasets: [
      {
        data: [1200, 400, 150, 100],
        backgroundColor: ["#FF6B6B", "#FFD93D", "#1E90FF", "#38D39F"],
        hoverBackgroundColor: ["#FF4C4C", "#FFC300", "#1C86EE", "#32C77A"],
        borderWidth: 2,
        borderColor: "#222",
        hoverOffset: 8, // Increases size slightly on hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.raw;
            let total = data.datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = ((value / total) * 100).toFixed(1) + "%";
            return `${tooltipItem.label}: $${value} (${percentage})`;
          },
        },
      },
    },
  };

  return (
    <div className="w-72 h-72 mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
}
