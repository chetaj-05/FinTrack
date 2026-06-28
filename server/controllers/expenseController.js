const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {

    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {

        return res.status(400).json({
            message: "Please fill all fields"
        });

    }

    const expense = await Expense.create({

        user: req.user._id,

        title,

        amount,

        category,

        date

    });

    res.status(201).json(expense);

};
exports.getExpenses = async (req, res) => {

    const { search, category, sort } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const query = {
        user: req.user._id
    };

    if (search) {
        query.title = {
            $regex: search,
            $options: "i"
        };
    }

    if (category) {
        query.category = category;
    }

    let sortOption = { date: -1 };

    if (sort === "newest") {
        sortOption = { date: -1 };
    }

    if (sort === "oldest") {
        sortOption = { date: 1 };
    }

    if (sort === "highest") {
        sortOption = { amount: -1 };
    }

    if (sort === "lowest") {
        sortOption = { amount: 1 };
    }

    const expenses = await Expense.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const totalExpenses = await Expense.countDocuments(query);

    res.status(200).json({
        page,
        limit,
        totalExpenses,
        totalPages: Math.ceil(totalExpenses / limit),
        count: expenses.length,
        expenses
    });

};
exports.deleteExpense = async (req, res) => {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.status(404).json({
            message: "Expense not found"
        });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    await expense.deleteOne();

    res.status(200).json({
        message: "Expense deleted successfully"
    });

};
exports.updateExpense = async (req, res) => {

    const { title, amount, category, date } = req.body;

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
        return res.status(404).json({
            message: "Expense not found"
        });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;

    const updatedExpense = await expense.save();

    res.status(200).json(updatedExpense);
};