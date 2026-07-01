import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getBudgets, setBudget, deleteBudget } from "../services/budgetService";

function Budget() {
  const [budgets, setBudgets] = useState([]);

  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (err) {
      toast.error("Failed to load budgets");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!limit) {
      toast.error("Enter budget amount");
      return;
    }

    try {
      await setBudget({
        category,
        limit,
      });

      toast.success("Budget Saved");

      setLimit("");

      fetchBudgets();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);

      toast.success("Budget Deleted");

      fetchBudgets();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">🎯 Budget Manager</h1>

      {/* Form */}

      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            placeholder="Budget Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="border rounded-lg p-3"
          />

          <button className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Save Budget
          </button>
        </form>
      </div>

      {/* Budget Cards */}

      <div className="grid md:grid-cols-2 gap-6">
        {budgets.length === 0 ? (
          <div className="text-gray-500">No Budgets Yet</div>
        ) : (
          budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;

            return (
              <div
                key={budget._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">{budget.category}</h2>

                  <button
                    onClick={() => handleDelete(budget._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-5 space-y-2">
                  <p>
                    <b>Budget :</b> ₹{budget.limit}
                  </p>

                  <p>
                    <b>Spent :</b> ₹{budget.spent}
                  </p>

                  <p>
                    <b>Remaining :</b> ₹{budget.remaining}
                  </p>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 mt-6">
                  <div
                    className={`h-4 rounded-full ${
                      percentage < 70
                        ? "bg-green-500"
                        : percentage < 100
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-sm">{percentage.toFixed(0)}% Used</p>

                {budget.remaining < 0 && (
                  <p className="text-red-600 font-semibold mt-3">
                    ⚠ Budget Exceeded by ₹{Math.abs(budget.remaining)}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Budget;
