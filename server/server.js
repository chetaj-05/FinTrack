const express = require("express");

const app = express();

const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const dns=require("dns");
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]
)

dotenv.config();
console.log(process.env.MONGO_URI);

connectDB();
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/expenses", expenseRoutes);


const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Welcome to FinTrack API 🚀");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});