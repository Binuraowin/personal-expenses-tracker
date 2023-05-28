const Expense = require("../models/expense.model");

exports.create = async (req, res, next) => {
  const { description, date, type, value } = req.body;

  try {
    const expense = new Expense({ description, date, type, value });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};


exports.findAll = async (req, res, next) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const foundExpense = await Expense.findOne({_id:req.params.id});
    if (!foundExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(foundExpense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
};


exports.update = async (req, res, next) => {
  const id = req.params.id;
  const { description, date, type, value } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { description, date, type, value },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
};
exports.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(deletedExpense);
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
