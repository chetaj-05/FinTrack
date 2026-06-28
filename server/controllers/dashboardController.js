const Expense = require("../models/Expense");
const Income = require("../models/Income");

exports.getDashboard = async (req, res) => {

   const userId = req.user._id;

    const income = await Income.find({ user: userId });

    const expenses = await Expense.find({ user: userId });

    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    const balance = totalIncome - totalExpense;

    const recentTransactions = [

        ...income.map(item => ({
            ...item.toObject(),
            type: "income"
        })),

        ...expenses.map(item => ({
            ...item.toObject(),
            type: "expense"
        }))

    ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

    res.status(200).json({

        totalIncome,

        totalExpense,

        balance,

        recentTransactions

    });
};
exports.getCategoryAnalytics = async (req, res) => {

    const analytics = await Expense.aggregate([

        {
            $match: {
                user: req.user._id
            }
        },

        {
            $group: {

                _id: "$category",

                total: {

                    $sum: "$amount"

                }

            }

        },

        {

            $sort: {

                total: -1

            }

        }

    ]);

    res.status(200).json(analytics);

};
exports.getMonthlyAnalytics = async (req, res) => {

    const monthlyData = await Expense.aggregate([

        {
            $match: {
                user: req.user._id
            }
        },

        {
            $group: {

                _id: {

                    year: { $year: "$date" },

                    month: { $month: "$date" }

                },

                total: {

                    $sum: "$amount"

                }

            }

        },

        {
            $sort: {

                "_id.year": 1,

                "_id.month": 1

            }

        }

    ]);

    res.status(200).json(monthlyData);

};
