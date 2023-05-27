import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { Expense } from '../types/Expense';

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/expenses');
      const expensesData = await response.json();
      setExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleAddExpense = async (expense: Expense) => {
    try {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        const createdExpense = await response.json();
        setExpenses((prevExpenses) => [createdExpense, ...prevExpenses]);
      } else {
        console.error('Failed to add expense:', response.status);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    console.log("called",id);
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
      } else {
        console.error('Failed to delete expense:', response.status);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div>
        <div></div>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
    </div>
  );
};

export default Expenses;
