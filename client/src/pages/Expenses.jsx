import { useEffect, useState } from "react";

import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../services/expenseService";
import toast from "react-hot-toast";
import { CSVLink } from "react-csv";

function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchExpenses();
  }, [page]);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(page);

      setExpenses(data.expenses);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateExpense(editingId, {
          title,
          amount,
          category,
        });
        toast.success("Expense Updated");
      } else {
        await addExpense({
          title,
          amount,
          category,
        });
        toast.success("Expense Added Successfully");
      }

      setTitle("");
      setAmount("");
      setCategory("");
      setEditingId(null);

      fetchExpenses();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);

      fetchExpenses();
      toast.success("Expense Deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
  const sortedExpenses = [...filteredExpenses];
  if (sortOrder === "highest") {
    sortedExpenses.sort((a, b) => b.amount - a.amount);
  }

  if (sortOrder === "lowest") {
    sortedExpenses.sort((a, b) => a.amount - b.amount);
  }
  const csvData = sortedExpenses.map((expense) => ({
    Title: expense.title,
    Amount: expense.amount,
    Category: expense.category,
    Date: new Date(expense.date).toLocaleDateString(),
  }));

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">💰 Expenses</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-lg p-3 shadow-sm"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full border rounded-lg p-3 mt-4 shadow-sm"
      >
        <option value="All">All Categories</option>

        <option value="Food">Food</option>

        <option value="Travel">Travel</option>

        <option value="Shopping">Shopping</option>

        <option value="Bills">Bills</option>

        <option value="Entertainment">Entertainment</option>

        <option value="Other">Other</option>
      </select>
      <div className="mt-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border rounded-lg p-3 shadow-sm"
        >
          <option value="default">Default Order</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <input
            className="border rounded-lg p-3 w-full"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br />
          <br />

          <input
            className="border rounded-lg p-3 w-full"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <br />
          <br />

          <input
            className="border rounded-lg p-3 w-full"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <br />
          <br />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mt-4"
          >
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      </div>
      <div className="flex justify-end mb-4">
        <CSVLink
          data={csvData}
          filename={"expenses.csv"}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
        >
          📥 Export CSV
        </CSVLink>
      </div>

      <hr />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Amount</th>

                <th className="p-4 text-left">Category</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedExpenses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500">
                    📭 No expenses found.
                  </td>
                </tr>
              ) : (
                sortedExpenses.map((expense) => (
                  <tr key={expense._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{expense.title}</td>

                    <td className="p-4 font-semibold text-green-600">
                      ₹ {expense.amount}
                    </td>

                    <td className="p-4">{expense.category}</td>

                    <td className="p-4 space-x-2">
                      <button
                        onClick={() => {
                          setEditingId(expense._id);
                          setTitle(expense.title);
                          setAmount(expense.amount);
                          setCategory(expense.category);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Expenses;
