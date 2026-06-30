import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpensePieChart({ analytics }) {
  const data = {
    labels: analytics.map((item) => item._id),

    datasets: [
      {
        data: analytics.map((item) => item.total),

        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#ef4444",
          "#eab308",
          "#8b5cf6",
          "#06b6d4",
        ],
      },
    ],
  };

  return <Pie data={data} />;
}

export default ExpensePieChart;
