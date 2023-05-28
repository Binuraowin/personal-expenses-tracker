import { useEffect, useState } from 'react';
import { Expense } from '../types/Expense';

const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/expenses');
        const expensesData = await response.json();
        setExpenses(expensesData);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  return expenses;
};

export default useFetchExpenses;
