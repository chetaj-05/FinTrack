import { useEffect, useState } from "react";
import {
  getIncome,
  addIncome,
  deleteIncome,
  updateIncome,
} from "../services/incomeService";
import toast from "react-hot-toast";

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
      setIncome(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
        toast.success("Income Updated");
      } else {
        await addIncome({
          title,
          amount,
          source,
        });
        toast.success("Income Added Successfully");
      }

      setTitle("");
      setAmount("");
      setSource("");
      setEditingId(null);

      fetchIncome();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteIncome(id);
      toast.success("Income Deleted");
      fetchIncome();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">💵 Income</h1>
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
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <br />
          <br />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mt-4"
          >
            {editingId ? "Update Income" : "Add Income"}
          </button>
        </form>
      </div>
      <hr />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Title</th>

              <th className="p-4 text-left">Amount</th>

              <th className="p-4 text-left">Source</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {income.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{item.title}</td>

                <td className="p-4 font-semibold text-green-600">
                  ₹ {item.amount}
                </td>

                <td className="p-4">{item.source}</td>

                <td className="p-4 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setEditingId(item._id);
                      setTitle(item.title);
                      setAmount(item.amount);
                      setSource(item.source);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Income;
