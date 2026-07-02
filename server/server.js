const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const budgetRoutes = require("./routes/budgetRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json()); // <-- BEFORE routes

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to FinTrack API 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
