import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Expense } from '../types/Expense';
import './UpdateExpense.css'; // Import the CSS file

interface UpdateExpenseParams {
  id: string;
}

const UpdateExpense: React.FC = () => {
  const { id } = useParams<any>();
  const navigate = useNavigate();
  const [expense, setExpense] = useState<Expense>({
    _id: '',
    description: '',
    value: 0,
    date: new Date(),
  });

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/expenses/${id}`);
        const expenseData: Expense = await response.json();
        setExpense(expenseData);
      } catch (error) {
        console.error('Error fetching expense:', error);
      }
    };

    fetchExpense();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => {
      if (name === 'date') {
        return { ...prevExpense, [name]: new Date(value) };
      }
      return { ...prevExpense, [name]: value };
    });
  };

  const handleUpdateExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });

      if (response.ok) {
        navigate('/expenses');
      } else {
        console.error('Failed to update expense:', response.status);
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Update Expense</h2>
      <form className='expense-form' onSubmit={handleUpdateExpense}>
        <div className='expense-form__controls'>
        <label className="form-group">
          Description:
          <input type="text" name="description" value={expense.description} onChange={handleInputChange} />
        </label>
        <label className="form-group">
          Value:
          <input type="number" name="value" value={expense.value} onChange={handleInputChange} />
        </label>
        {/* <label className="form-group">
          Date:
          <input type="date" name="date" value={expense.date.toISOString().split('T')[0]} onChange={handleInputChange} />
        </label> */}
        <div className='expense-form__actions'>
        <button type="submit" className="submit-button">Update</button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateExpense;
