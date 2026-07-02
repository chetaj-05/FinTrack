const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
  const { title, amount, source, date } = req.body;

  if (!title || !amount || !source) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  const income = await Income.create({
    user: req.user._id,

    title,

    amount,

    source,

    date,
  });

  res.status(201).json(income);
};
exports.getIncome = async (req, res) => {
  const income = await Income.find({
    user: req.user._id,
  });

  res.json(income);
};
exports.deleteIncome = async (req, res) => {
  const income = await Income.findById(req.params.id);

  if (!income) {
    return res.status(404).json({
      message: "Income not found",
    });
  }

  if (income.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  await income.deleteOne();

  res.status(200).json({
    message: "Income Deleted Successfully",
  });
};
exports.updateIncome = async (req, res) => {
  const { title, amount, source, date } = req.body;

  const income = await Income.findById(req.params.id);

  if (!income) {
    return res.status(404).json({
      message: "Income not found",
    });
  }

  if (income.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  income.title = title || income.title;
  income.amount = amount || income.amount;
  income.source = source || income.source;
  income.date = date || income.date;

  const updatedIncome = await income.save();

  res.status(200).json(updatedIncome);
};
