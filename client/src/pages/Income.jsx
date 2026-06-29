import { useEffect, useState } from "react";
import {
  getIncome,
  addIncome,
  deleteIncome,
  updateIncome,
} from "../services/incomeService";

function Income() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");

  const [income, setIncome] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const data = await getIncome();
      console.log(data);
      setIncome(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateIncome(editingId, {
          title,
          amount,
          source,
        });
      } else {
        await addIncome({
          title,
          amount,
          source,
        });
      }

      setTitle("");
      setAmount("");
      setSource("");
      setEditingId(null);

      fetchIncome();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);

      fetchIncome();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Income</h1>
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
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          {editingId ? "Update Income" : "Add Income"}
        </button>
      </form>

      <hr />

      {income.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>

          <p>₹ {item.amount}</p>

          <p>{item.source}</p>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
          <button
            onClick={() => {
              setEditingId(item._id);

              setTitle(item.title);

              setAmount(item.amount);

              setSource(item.source);
            }}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default Income;
