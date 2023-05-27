import React from 'react';
import { Expense } from '../types/Expense';

interface ExpenseItemProps {
  expense: Expense;
  onDeleteExpense: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDeleteExpense }) => {
  const { id, description, amount, date } = expense;

  const handleDeleteExpense = () => {
    onDeleteExpense(id);
  };

  return (
    <li>
      <div>
        <h3>{description}</h3>
        <p>{amount}</p>
        <p>{date.toISOString()}</p>
      </div>
      <button onClick={handleDeleteExpense}>Delete</button>
    </li>
  );
};

export default ExpenseItem;
