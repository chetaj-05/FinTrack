import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function IncomeExpenseChart({ income, expense }) {
  const data = {
    labels: ["Income", "Expense"],

    datasets: [
      {
        label: "Amount",

        data: [income, expense],

        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return <Bar data={data} />;
}

export default IncomeExpenseChart;
