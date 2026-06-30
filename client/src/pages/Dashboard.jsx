import { useEffect, useState } from "react";
import {
  getDashboardData,
  getCategoryAnalytics,
} from "../services/dashboardService";
import SummaryCard from "../components/SummaryCard";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";

const user = JSON.parse(localStorage.getItem("user"));

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
        const analytics = await getCategoryAnalytics();

        setCategoryAnalytics(analytics);
        console.log("Category Analytics:", analytics);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user.name} 👋</h2>

      {dashboardData ? (
        <>
          <div className="grid grid-cols-3 gap-8 mt-8 mb-10">
            <SummaryCard title="Balance" amount={dashboardData.balance} />

            <SummaryCard title="Income" amount={dashboardData.totalIncome} />

            <SummaryCard title="Expense" amount={dashboardData.totalExpense} />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-xl shadow-md p-6">
              <IncomeExpenseChart
                income={dashboardData.totalIncome}
                expense={dashboardData.totalExpense}
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <ExpensePieChart analytics={categoryAnalytics} />
            </div>
          </div>

          <h2>Recent Transactions</h2>

          {dashboardData.recentTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white rounded-xl shadow-md p-5 mb-5"
            >
              <h3 className="text-xl font-semibold">{transaction.title}</h3>
              <p className="text-green-600 font-bold text-lg">
                ₹ {transaction.amount}
              </p>

              <p className="text-gray-500">
                {transaction.category || transaction.source}
              </p>
            </div>
          ))}
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Dashboard;
