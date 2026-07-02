const express = require("express");

const app = express();

const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const cors = require("cors");

dotenv.config();
console.log(process.env.MONGO_URI);

connectDB();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/budget", budgetRoutes);
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-project-name.vercel.app"],
    credentials: true,
  }),
);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Welcome to FinTrack API 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
