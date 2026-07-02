const Expense = require("../models/Expense");
const Income = require("../models/Income");

exports.getDashboard = async (req, res) => {
  const userId = req.user._id;

  const income = await Income.find({ user: userId });

  const expenses = await Expense.find({ user: userId });

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;
  const highestExpense =
    expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;

  const highestIncome =
    income.length > 0 ? Math.max(...income.map((i) => i.amount)) : 0;

  const totalTransactions = income.length + expenses.length;

  const recentTransactions = [
    ...income.map((item) => ({
      ...item.toObject(),
      type: "income",
    })),

    ...expenses.map((item) => ({
      ...item.toObject(),
      type: "expense",
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  res.status(200).json({
    totalIncome,
    totalExpense,
    balance,

    highestExpense,
    highestIncome,
    totalTransactions,

    recentTransactions,
  });
};
exports.getCategoryAnalytics = async (req, res) => {
  const analytics = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },

    {
      $group: {
        _id: "$category",

        total: {
          $sum: "$amount",
        },
      },
    },

    {
      $sort: {
        total: -1,
      },
    },
  ]);

  res.status(200).json(analytics);
};
exports.getMonthlyAnalytics = async (req, res) => {
  const monthlyData = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },

    {
      $group: {
        _id: {
          year: { $year: "$date" },

          month: { $month: "$date" },
        },

        total: {
          $sum: "$amount",
        },
      },
    },

    {
      $sort: {
        "_id.year": 1,

        "_id.month": 1,
      },
    },
  ]);

  res.status(200).json(monthlyData);
};
exports.getReportData = async (req, res) => {
  const userId = req.user._id;

  const incomes = await Income.find({ user: userId });
  const expenses = await Expense.find({ user: userId });

  const report = {};

  incomes.forEach((income) => {
    const date = new Date(income.date);

    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!report[key]) {
      report[key] = {
        month: key,
        income: 0,
        expense: 0,
      };
    }

    report[key].income += income.amount;
  });

  expenses.forEach((expense) => {
    const date = new Date(expense.date);

    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!report[key]) {
      report[key] = {
        month: key,
        income: 0,
        expense: 0,
      };
    }

    report[key].expense += expense.amount;
  });

  const finalReport = Object.values(report).map((item) => ({
    ...item,
    saving: item.income - item.expense,
  }));

  res.status(200).json(finalReport);
};
