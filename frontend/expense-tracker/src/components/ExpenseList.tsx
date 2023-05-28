import React, { useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import { Expense } from '../types/Expense';
import './ExpenseList.css';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  const [maxExpenseAmount] = useState(10000.0);
  const [filter, setFilter] = useState('');
  const [filteredDescriptions, setFilteredDescriptions] = useState<string[]>([]);

  const calculateTotalMonthlyExpense = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const filteredExpenses = expenses.filter((expense) => {
      const expenseMonth = new Date(expense.date).getMonth();
      const expenseYear = new Date(expense.date).getFullYear();
      return expenseMonth === currentMonth && expenseYear === currentYear;
    });
    const totalExpense = filteredExpenses.reduce((total, expense) => total + expense.value, 0);
    return totalExpense;
  };

  useEffect(() => {
    const totalMonthlyExpense = calculateTotalMonthlyExpense();
    const maxExpenseLimit = maxExpenseAmount * 0.9;
    if (totalMonthlyExpense >= maxExpenseLimit) {
      alert('You are close to reaching the monthly expense limit!');
    }

    const descriptions = Array.from(new Set(expenses.map((expense) => expense.description)));
    setFilteredDescriptions(descriptions);
  }, [expenses, maxExpenseAmount]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(filter.toLowerCase())
  );
  if (filteredExpenses.length === 0) {
    return (
      <div className="expense-list">
        <p>No expenses found.</p>
        <div className="expense-list__filter">
          <select value={filter} onChange={handleFilterChange}>
            <option value="">All Descriptions</option>
            {filteredDescriptions.map((description) => (
              <option key={description} value={description}>
                {description}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <div className="expense-list__filter">
        <select value={filter} onChange={handleFilterChange}>
          <option value="">All Descriptions</option>
          {filteredDescriptions.map((description) => (
            <option key={description} value={description}>
              {description}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredExpenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} onDeleteExpense={onDeleteExpense} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
