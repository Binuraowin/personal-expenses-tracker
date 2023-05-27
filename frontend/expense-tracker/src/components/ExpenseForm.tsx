import React, { useState } from 'react';
import { Expense } from '../types/Expense';
import './ExpenseForm.css';

interface ExpenseFormProps {
    onAddExpense: (expense: Expense) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const expense: Expense = {
            _id: Math.random().toString(),
            description,
            value: +value,
            date: new Date(date),
        };

        onAddExpense(expense);
        setDescription('');
        setValue('');
        setDate('');
    };

    return (
        <>
            <form className="expense-form" onSubmit={handleSubmit}>
                <div className="expense-form__controls">
                    <div className="expense-form__control">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="expense-form__control">
                        <label htmlFor="value">Value</label>
                        <input
                            type="number"
                            id="value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="expense-form__control">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="expense-form__actions">
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        </>

    );
};

export default ExpenseForm;
