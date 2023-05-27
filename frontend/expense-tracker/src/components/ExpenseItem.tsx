import React from 'react';
import { Expense } from '../types/Expense';
import './ExpenseItem.css';

interface ExpenseItemProps {
    expense: Expense;
    onDeleteExpense: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDeleteExpense }) => {
    const { _id, description, value, date } = expense;
    console.log(`Expense`, expense)
    const handleDeleteExpense = () => {
        onDeleteExpense(_id);
    };

    return (
        <>
            <li className="expense-item">
                <div className="expense-item__info">
                    <h3 className="expense-item__description">{description}</h3>
                    <p className="expense-item__value">Value: {value}</p>
                    {/* <p className="expense-item__date">Date: {date}</p> */}
                </div>
                <button className="expense-item__delete-btn" onClick={handleDeleteExpense}>
                    Delete
                </button>
            </li>
        </>
    );
};

export default ExpenseItem;
