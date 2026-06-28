import { useEffect,useState  } from "react";
import { getDashboardData } from "../services/dashboardService";
import SummaryCard from "../components/SummaryCard";
 const user = JSON.parse(localStorage.getItem("user"));
function Dashboard() {

     const [dashboardData, setDashboardData] = useState(null);
     
    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboardData();

                setDashboardData(data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchDashboard();

    }, []);

    return (
    <div>

        <h1>Dashboard</h1>
          <h1>Welcome, {user.name} 👋</h1>
        {dashboardData ? (

            <div>
             
              
                <SummaryCard
                 title="Balance"
                     amount={dashboardData.balance}
                   />

<SummaryCard
    title="Income"
    amount={dashboardData.totalIncome}
/>

<SummaryCard
    title="Expense"
    amount={dashboardData.totalExpense}
/>
            </div>

        ) : (

            <h2>Loading...</h2>

        )}
        <h2>Recent Transactions</h2>

{
    dashboardData.recentTransactions.map((transaction) => (

        <div
            key={transaction._id}
            style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px"
            }}
        >

            <h3>{transaction.title}</h3>

            <p>₹ {transaction.amount}</p>

            <p>{transaction.category}</p>

        </div>

    ))
}

    </div>
);
}

export default Dashboard;