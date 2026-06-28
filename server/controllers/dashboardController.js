const Expense = require("../models/Expense");

exports.getDashboard = async (req, res) => {

    const totalExpenses = await Expense.aggregate([

        {
            $match: {
                user: req.user._id
            }
        },

        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }

    ]);

    const recentTransactions = await Expense.find({
        user: req.user._id
    })
    .sort({ date: -1 })
    .limit(5);

    const totalTransactions = await Expense.countDocuments({
        user: req.user._id
    });

    res.status(200).json({

        totalExpenses:
            totalExpenses.length > 0
                ? totalExpenses[0].total
                : 0,

        totalTransactions,

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