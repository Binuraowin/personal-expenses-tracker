const express = require("express");
const ExpensesRoutes= require("./expense.route")
const APIRouter = express.Router();

APIRouter.use("/expenses", ExpensesRoutes);


module.exports = APIRouter;
