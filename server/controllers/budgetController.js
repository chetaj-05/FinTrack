const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

// Create or Update Budget
exports.setBudget = async (req, res) => {

    const { category, limit } = req.body;

    if (!category || !limit) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const budget = await Budget.findOneAndUpdate(
        {
            user: req.user._id,
            category
        },
        {
            limit
        },
        {
            returnDocument: "after",
            upsert: true,
            runValidators: true
        }
    );

    res.status(200).json(budget);

};

// Get Budgets
exports.getBudgets = async (req, res) => {

    const budgets = await Budget.find({
        user: req.user._id
    });

    const result = [];

    for (const budget of budgets) {

        const expenses = await Expense.find({
            user: req.user._id,
            category: budget.category
        });

        const spent = expenses.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        result.push({

            ...budget.toObject(),

            spent,

            remaining: budget.limit - spent

        });

    }

    res.status(200).json(result);

};

// Delete Budget
exports.deleteBudget = async (req, res) => {

    const budget = await Budget.findById(req.params.id);

    if (!budget) {
        return res.status(404).json({
            message: "Budget not found"
        });
    }

    if (budget.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    await budget.deleteOne();

    res.status(200).json({
        message: "Budget Deleted Successfully"
    });

};