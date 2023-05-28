import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import ExpenseList from '../components/ExpenseList/ExpenseList';
import { Expense } from '../types/Expense';

const Expenses: React.FC = () => {
  
  return (
    <div>
      <ExpenseForm />
      <ExpenseList/>
    </div>
  );
};

export default Expenses;
