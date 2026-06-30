import { useEffect, useState } from "react";
import { getReportData } from "../services/reportService";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function Reports() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const data = await getReportData();
      setReport(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-green-600 text-white rounded-xl p-6">
          <h3 className="text-lg">Highest Income Month</h3>

          <h1 className="text-3xl font-bold mt-2">
            ₹ {Math.max(...report.map((r) => r.income), 0)}
          </h1>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-6">
          <h3 className="text-lg">Highest Expense Month</h3>

          <h1 className="text-3xl font-bold mt-2">
            ₹ {Math.max(...report.map((r) => r.expense), 0)}
          </h1>
        </div>

        <div className="bg-indigo-600 text-white rounded-xl p-6">
          <h3 className="text-lg">Highest Saving</h3>

          <h1 className="text-3xl font-bold mt-2">
            ₹ {Math.max(...report.map((r) => r.saving), 0)}
          </h1>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-8">📈 Financial Reports</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={report}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 5px 15px rgba(0,0,0,.15)",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              dataKey="income"
              stroke="#16a34a"
              strokeWidth={3}
              animationDuration={1200}
            />

            <Line
              type="monotone"
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              dataKey="expense"
              stroke="#dc2626"
              strokeWidth={3}
              animationDuration={1200}
            />

            <Line
              type="monotone"
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              dataKey="saving"
              stroke="#4f46e5"
              strokeWidth={3}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Reports;
