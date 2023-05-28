import { useState } from 'react';
import { Expense } from '../types/Expense';

const useExpenseCRUD = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = async (expense: Expense) => {
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

  const deleteExpense = async (id: string) => {
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

  return { expenses, addExpense, deleteExpense };
};

export default useExpenseCRUD;
