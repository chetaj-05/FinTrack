import API from "./api";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getExpenses = async (page = 1) => {
  const response = await API.get(`/expenses?page=${page}`, getAuthConfig());
  return response.data;
};

export const addExpense = async (expenseData) => {
  const response = await API.post("/expenses", expenseData, getAuthConfig());

  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await API.delete(`/expenses/${id}`, getAuthConfig());

  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await API.put(
    `/expenses/${id}`,
    expenseData,
    getAuthConfig(),
  );

  return response.data;
};
