import { useEffect, useState } from "react";
import {
  getDashboardData,
  getCategoryAnalytics,
} from "../services/dashboardService";
import SummaryCard from "../components/SummaryCard";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import { ClipLoader } from "react-spinners";

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
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-2">
            Welcome back,{" "}
            <span className="font-semibold">{user?.user?.name}</span> 👋
          </p>
        </div>
        {dashboardData ? (
          <>
            <div className="grid grid-cols-3 gap-8 mt-8 mb-10">
              <SummaryCard title="Balance" amount={dashboardData.balance} />

              <SummaryCard title="Income" amount={dashboardData.totalIncome} />

              <SummaryCard
                title="Expense"
                amount={dashboardData.totalExpense}
              />
            </div>
            <div className="grid grid-cols-3 gap-8 mt-6 mb-10">
              <SummaryCard
                title="Highest Expense"
                amount={dashboardData.highestExpense}
              />

              <SummaryCard
                title="Highest Income"
                amount={dashboardData.highestIncome}
              />

              <SummaryCard
                title="Transactions"
                amount={dashboardData.totalTransactions}
              />
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

            <h2 className="text-2xl font-bold mb-5 mt-8">
              Recent Transactions
            </h2>

            {dashboardData.recentTransactions.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
                📭 No Transactions Yet
              </div>
            ) : (
              dashboardData.recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="bg-white rounded-xl shadow-md p-5 mb-4 flex justify-between items-center hover:shadow-lg transition"
                >
                  <div>
                    <h3 className="font-bold text-lg">{transaction.title}</h3>

                    <p className="text-gray-500">
                      {transaction.category || transaction.source}
                    </p>

                    <p className="text-sm text-gray-400">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-xl font-bold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"} ₹
                      {transaction.amount}
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        transaction.type === "income"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <div className="flex justify-center mt-20">
            <ClipLoader size={45} color="#4f46e5" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
