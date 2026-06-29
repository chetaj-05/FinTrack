import { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
} from "../services/expenseService";

function Expenses() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();

      setExpenses(data.expenses);
    } catch (error) {
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
      } else {
        await addExpense({
          title,
          amount,
          category,
        });
      }

      setTitle("");
      setAmount("");
      setCategory("");
      setEditingId(null);

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Expenses</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      <hr />

      {expenses.map((expense) => (
        <div key={expense._id}>
          <h3>{expense.title}</h3>

          <p>₹ {expense.amount}</p>

          <p>{expense.category}</p>
          <button onClick={() => handleDelete(expense._id)}>Delete</button>
          <button
            onClick={() => {
              setEditingId(expense._id);

              setTitle(expense.title);

              setAmount(expense.amount);

              setCategory(expense.category);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default Expenses;
