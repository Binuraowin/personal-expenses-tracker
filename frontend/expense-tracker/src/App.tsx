import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import './App.css'; 
import UpdateExpense from './components/UpdateExpense';

const App: React.FC = () => {
  return (
    <Router>
      <div>
      <nav className="navbar">
      <h1 className="navbar__logo">Expense Tracker</h1>
      <ul className="navbar__links">
        <li className="navbar__link"><Link to="/">Dashboard</Link></li>
        <li className="navbar__link"><Link to="/expenses">Expenses</Link></li>
      </ul>
    </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/update/:id" element={<UpdateExpense/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
