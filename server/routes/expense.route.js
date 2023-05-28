const Expense = require("../controllers/expense.controller");
const express = require("express");

const ExpenseRouter = express.Router();

ExpenseRouter.post("/", Expense.create);

ExpenseRouter.get("/", Expense.findAll);
ExpenseRouter.get("/:id", Expense.findOne);
ExpenseRouter.put("/:id", Expense.update);
ExpenseRouter.delete("/:id", Expense.delete);

module.exports = ExpenseRouter;
