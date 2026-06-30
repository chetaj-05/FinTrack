import API from "./api";

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getCategoryAnalytics = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/dashboard/category-analytics",

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getMonthlyAnalytics = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/dashboard/monthly-analytics",

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
