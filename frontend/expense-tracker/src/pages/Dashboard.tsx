import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const [expenseData, setExpenseData] = useState<any>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);
  const fetchExpenses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/expenses');
      const expenses = await response.json();
      console.log(expenses);
      setExpenseData(expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Expense Patterns</h3>
        {expenseData ? (
          <PieChart width={400} height={300}>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {expenseData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>Loading expense patterns...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
