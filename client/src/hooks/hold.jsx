// import { useEffect, useState } from "react";
// import {
//   getDashboardData,
//   getCategoryAnalytics,
// } from "../services/dashboardService";
// import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
// import ExpensePieChart from "../components/charts/ExpensePieChart";
// import { ClipLoader } from "react-spinners";

// const user = JSON.parse(localStorage.getItem("user"));

// const StatCard = ({ title, amount, icon, color }) => (
//   <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
//     <div className="flex items-center justify-between mb-4">
//       <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//         {title}
//       </p>
//       <div
//         className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${color}`}
//       >
//         {icon}
//       </div>
//     </div>
//     <p className="text-2xl font-bold text-gray-900 dark:text-white">
//       {typeof amount === "number" && title !== "Transactions"
//         ? `₹${amount.toLocaleString()}`
//         : amount}
//     </p>
//   </div>
// );

// function Dashboard() {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [categoryAnalytics, setCategoryAnalytics] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const data = await getDashboardData();
//         setDashboardData(data);
//         const analytics = await getCategoryAnalytics();
//         setCategoryAnalytics(analytics);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//           Dashboard
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400 mt-1">
//           Welcome back,{" "}
//           <span className="font-semibold text-indigo-500">
//             {user?.user?.name}
//           </span>{" "}
//           👋
//         </p>
//       </div>

//       {dashboardData ? (
//         <>
//           {/* Stat Cards Row 1 */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             <StatCard
//               title="Balance"
//               amount={dashboardData.balance}
//               icon="💰"
//               color="bg-indigo-100 dark:bg-indigo-900/40"
//             />
//             <StatCard
//               title="Income"
//               amount={dashboardData.totalIncome}
//               icon="📈"
//               color="bg-green-100 dark:bg-green-900/40"
//             />
//             <StatCard
//               title="Expense"
//               amount={dashboardData.totalExpense}
//               icon="📉"
//               color="bg-red-100 dark:bg-red-900/40"
//             />
//           </div>

//           {/* Stat Cards Row 2 */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             <StatCard
//               title="Highest Expense"
//               amount={dashboardData.highestExpense}
//               icon="⚠️"
//               color="bg-orange-100 dark:bg-orange-900/40"
//             />
//             <StatCard
//               title="Highest Income"
//               amount={dashboardData.highestIncome}
//               icon="🏆"
//               color="bg-yellow-100 dark:bg-yellow-900/40"
//             />
//             <StatCard
//               title="Transactions"
//               amount={dashboardData.totalTransactions}
//               icon="🔄"
//               color="bg-purple-100 dark:bg-purple-900/40"
//             />
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
//               <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
//                 Income vs Expense
//               </h2>
//               <IncomeExpenseChart
//                 income={dashboardData.totalIncome}
//                 expense={dashboardData.totalExpense}
//               />
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
//               <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-4">
//                 Spending by Category
//               </h2>
//               <ExpensePieChart analytics={categoryAnalytics} />
//             </div>
//           </div>

//           {/* Recent Transactions */}
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//               Recent Transactions
//             </h2>

//             {dashboardData.recentTransactions.length === 0 ? (
//               <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-12 text-center">
//                 <p className="text-4xl mb-3">📭</p>
//                 <p className="text-gray-500 dark:text-gray-400 font-medium">
//                   No transactions yet
//                 </p>
//                 <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
//                   Add your first expense or income to get started
//                 </p>
//               </div>
//             ) : (
//               <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
//                 {dashboardData.recentTransactions.map((transaction, index) => (
//                   <div
//                     key={transaction._id}
//                     className={`flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
//                       ${index !== 0 ? "border-t border-gray-100 dark:border-gray-700" : ""}`}
//                   >
//                     {/* Left */}
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg
//                           ${
//                             transaction.type === "income"
//                               ? "bg-green-100 dark:bg-green-900/40"
//                               : "bg-red-100 dark:bg-red-900/40"
//                           }`}
//                       >
//                         {transaction.type === "income" ? "💵" : "💸"}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900 dark:text-white text-sm">
//                           {transaction.title}
//                         </p>
//                         <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
//                           {transaction.category || transaction.source} •{" "}
//                           {new Date(transaction.date).toLocaleDateString(
//                             "en-IN",
//                             {
//                               day: "numeric",
//                               month: "short",
//                               year: "numeric",
//                             },
//                           )}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Right */}
//                     <div className="text-right">
//                       <p
//                         className={`font-bold text-base ${
//                           transaction.type === "income"
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {transaction.type === "income" ? "+" : "-"}₹
//                         {transaction.amount.toLocaleString()}
//                       </p>
//                       <span
//                         className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block
//                           ${
//                             transaction.type === "income"
//                               ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
//                               : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
//                           }`}
//                       >
//                         {transaction.type}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="flex justify-center mt-32">
//           <ClipLoader size={40} color="#6366f1" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useTheme } from "../context/ThemeContext";

// const navItems = [
//   { to: "/dashboard", icon: "🏠", label: "Dashboard" },
//   { to: "/expenses", icon: "💸", label: "Expenses" },
//   { to: "/income", icon: "💵", label: "Income" },
//   { to: "/budget", icon: "🎯", label: "Budget" },
//   { to: "/reports", icon: "📈", label: "Reports" },
//   { to: "/profile", icon: "👤", label: "Profile" },
// ];

// function Layout({ children }) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const { darkMode, toggleTheme } = useTheme();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
//       {/* Mobile toggle */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
//         onClick={() => setOpen(!open)}
//       >
//         {open ? "✕" : "☰"}
//       </button>

//       {/* Overlay for mobile */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-screen w-64 z-40
//           bg-slate-900 dark:bg-gray-900
//           border-r border-slate-800
//           flex flex-col
//           transform transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0
//         `}
//       >
//         {/* Logo */}
//         <div className="p-6 border-b border-slate-800">
//           <h1 className="text-2xl font-bold text-white tracking-tight">
//             💰 FinTrack
//           </h1>
//           <p className="text-slate-400 text-sm mt-1">Personal Finance</p>
//         </div>

//         {/* User info */}
//         <div className="px-6 py-4 border-b border-slate-800">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
//               {user?.user?.name?.[0]?.toUpperCase() || "U"}
//             </div>
//             <div>
//               <p className="text-white text-sm font-semibold">
//                 {user?.user?.name}
//               </p>
//               <p className="text-slate-400 text-xs">Member</p>
//             </div>
//           </div>
//         </div>

//         {/* Nav links */}
//         <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
//           {navItems.map(({ to, icon, label }) => (
//             <NavLink
//               key={to}
//               to={to}
//               onClick={() => setOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
//                 ${
//                   isActive
//                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30"
//                     : "text-slate-400 hover:bg-slate-800 hover:text-white"
//                 }`
//               }
//             >
//               <span className="text-base">{icon}</span>
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Bottom: theme toggle + logout */}
//         <div className="px-4 py-6 border-t border-slate-800 flex flex-col gap-3">
//           <button
//             onClick={toggleTheme}
//             className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
//           >
//             <span>{darkMode ? "☀️" : "🌙"}</span>
//             {darkMode ? "Light Mode" : "Dark Mode"}
//           </button>

//           <button
//             onClick={logout}
//             className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
//           >
//             <span>🚪</span>
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 md:ml-64 min-h-screen transition-colors duration-300">
//         <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
//       </main>
//     </div>
//   );
// }

// export default Layout;

// import { useEffect, useState } from "react";

// import {
//   getExpenses,
//   addExpense,
//   deleteExpense,
//   updateExpense,
// } from "../services/expenseService";
// import toast from "react-hot-toast";
// import { CSVLink } from "react-csv";

// function Expenses() {
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");

//   const [expenses, setExpenses] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortOrder, setSortOrder] = useState("default");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchExpenses();
//   }, [page]);

//   const fetchExpenses = async () => {
//     try {
//       const data = await getExpenses(page);

//       setExpenses(data.expenses);
//       setTotalPages(data.totalPages);
//     } catch (error) {
//       toast.error("Something went wrong");
//       console.log(error);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         await updateExpense(editingId, {
//           title,
//           amount,
//           category,
//         });
//         toast.success("Expense Updated");
//       } else {
//         await addExpense({
//           title,
//           amount,
//           category,
//         });
//         toast.success("Expense Added Successfully");
//       }

//       setTitle("");
//       setAmount("");
//       setCategory("");
//       setEditingId(null);

//       fetchExpenses();
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       await deleteExpense(id);

//       fetchExpenses();
//       toast.success("Expense Deleted");
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   const filteredExpenses = expenses.filter((expense) => {
//     const matchesSearch = expense.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "All" || expense.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });
//   const sortedExpenses = [...filteredExpenses];
//   if (sortOrder === "highest") {
//     sortedExpenses.sort((a, b) => b.amount - a.amount);
//   }

//   if (sortOrder === "lowest") {
//     sortedExpenses.sort((a, b) => a.amount - b.amount);
//   }
//   const csvData = sortedExpenses.map((expense) => ({
//     Title: expense.title,
//     Amount: expense.amount,
//     Category: expense.category,
//     Date: new Date(expense.date).toLocaleDateString(),
//   }));

//   return (
//     <div>
//       <h1 className="text-4xl font-bold mb-8">💰 Expenses</h1>
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="🔍 Search expenses..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full border rounded-lg p-3 shadow-sm"
//         />
//       </div>
//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="w-full border rounded-lg p-3 mt-4 shadow-sm"
//       >
//         <option value="All">All Categories</option>

//         <option value="Food">Food</option>

//         <option value="Travel">Travel</option>

//         <option value="Shopping">Shopping</option>

//         <option value="Bills">Bills</option>

//         <option value="Entertainment">Entertainment</option>

//         <option value="Other">Other</option>
//       </select>
//       <div className="mt-4">
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//           className="w-full border rounded-lg p-3 shadow-sm"
//         >
//           <option value="default">Default Order</option>
//           <option value="highest">Highest Amount</option>
//           <option value="lowest">Lowest Amount</option>
//         </select>
//       </div>
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <form onSubmit={handleSubmit}>
//           <input
//             className="border rounded-lg p-3 w-full"
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           <br />
//           <br />

//           <input
//             className="border rounded-lg p-3 w-full"
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />

//           <br />
//           <br />

//           <input
//             className="border rounded-lg p-3 w-full"
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />

//           <br />
//           <br />

//           <button
//             type="submit"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mt-4"
//           >
//             {editingId ? "Update Expense" : "Add Expense"}
//           </button>
//         </form>
//       </div>
//       <div className="flex justify-end mb-4">
//         <CSVLink
//           data={csvData}
//           filename={"expenses.csv"}
//           className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
//         >
//           📥 Export CSV
//         </CSVLink>
//       </div>

//       <hr />

//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-4 text-left">Title</th>

//                 <th className="p-4 text-left">Amount</th>

//                 <th className="p-4 text-left">Category</th>

//                 <th className="p-4 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {sortedExpenses.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-10 text-gray-500">
//                     📭 No expenses found.
//                   </td>
//                 </tr>
//               ) : (
//                 sortedExpenses.map((expense) => (
//                   <tr key={expense._id} className="border-t hover:bg-gray-50">
//                     <td className="p-4">{expense.title}</td>

//                     <td className="p-4 font-semibold text-green-600">
//                       ₹ {expense.amount}
//                     </td>

//                     <td className="p-4">{expense.category}</td>

//                     <td className="p-4 space-x-2">
//                       <button
//                         onClick={() => {
//                           setEditingId(expense._id);
//                           setTitle(expense.title);
//                           setAmount(expense.amount);
//                           setCategory(expense.category);
//                         }}
//                         className="bg-blue-500 text-white px-3 py-1 rounded"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => handleDelete(expense._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="flex justify-center items-center gap-4 mt-8">
//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//           className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           Previous
//         </button>

//         <span className="font-semibold">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           onClick={() => setPage(page + 1)}
//           disabled={page === totalPages}
//           className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Expenses;
