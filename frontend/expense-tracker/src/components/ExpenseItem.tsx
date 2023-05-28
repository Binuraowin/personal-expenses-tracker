import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Expense } from '../types/Expense';
import './ExpenseItem.css';
import { RiPencilFill, RiDeleteBin2Fill } from 'react-icons/ri';

interface ExpenseItemProps {
    expense: Expense;
    onDeleteExpense: (id: string) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDeleteExpense }) => {
    const navigate = useNavigate();
    const { _id, description, value, date } = expense;
    const newDate = new Date(date)
    console.log(`Expense`, newDate)
    const handleDeleteExpense = () => {
        onDeleteExpense(_id);
    };
    const handleUpdate = () => {
        navigate(`/expenses/update/${expense._id}`);
    };

    return (
        <>
            <li className="expense-item">
                <div className="expense-item__info">
                    <h3 className="expense-item__description">{description}</h3>
                    <p className="expense-item__value">Value: {value}</p>
                    <p className="expense-item__date">Date: {newDate.toLocaleDateString()}</p>
                </div>
                <div className="expense-item__actions">
                    <div className="expense-item__update-btn">
                        <button onClick={handleUpdate}>
                            <RiPencilFill className="expense-item__icon" />
                            <span>Update</span>
                        </button>
                    </div>
                    <div className="expense-item__delete-btn">
                        <button onClick={handleDeleteExpense}>
                            <RiDeleteBin2Fill className="expense-item__icon" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </li>
        </>
    );
};

export default ExpenseItem;
