const mongoose = require("mongoose");


const ExpenseSchema = new mongoose.Schema({
    description: String,
    date: Date,
    type: String,
    value: Number,
  });

  ExpenseSchema.index({ description: 1 });

  const Expense = mongoose.model("Expense", ExpenseSchema);
  module.exports = Expense;
  