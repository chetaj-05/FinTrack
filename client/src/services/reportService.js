import API from "./api";

export const getReportData = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/dashboard/report", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
