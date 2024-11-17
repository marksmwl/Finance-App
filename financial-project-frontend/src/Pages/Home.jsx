import React, { useState } from "react";
import AddExpenseModal from "../Components/AddExpenseModal";
import BasicTabs from "../Components/TabComponent";

export default function UserHome({ userName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalBudget] = useState(2000); // Keep as a constant
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, category: "Groceries", amount: 50, date: "2024-11-10" },
    { id: 2, category: "Rent", amount: 800, date: "2024-11-01" },
    { id: 3, category: "Entertainment", amount: 120, date: "2024-10-29" },
  ]);

  const totalSpent = recentTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const remainingBudget = totalBudget - totalSpent;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addExpense = (expense) => {
    const newTransaction = {
      id: recentTransactions.length + 1, // Generate a new unique ID
      category: expense.category,
      amount: expense.amount,
      date: new Date().toISOString().split("T")[0], // Get today's date in YYYY-MM-DD format
    };

    setRecentTransactions((prev) => [newTransaction, ...prev]); // Add the new transaction to the top
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome!</h1>
      <p className="text-gray-600 mb-8 text-center">Here’s a quick overview of your finances this month.</p>

      {/* Quick Overview Cards */}
      <div className="flex justify-center mb-5">
        <div className="flex">
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h2 className="text-xl font-semibold">Total Budget</h2>
            <p className="text-2xl font-bold mt-2">${totalBudget}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h2 className="text-xl font-semibold">Total Spent</h2>
            <p className="text-2xl font-bold mt-2 text-red-500">${totalSpent}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md m-2">
            <h2 className="text-xl font-semibold">Remaining Budget</h2>
            <p className="text-2xl font-bold mt-2 text-green-500">${remainingBudget}</p>
          </div>
        </div>
      </div>

      <BasicTabs></BasicTabs>
      

      {/* Recent Transactions */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 max-w-3xl m-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>

        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-200">
              <div>
                <p className="font-semibold">{transaction.category}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <p className="text-lg font-bold">${transaction.amount}</p>
            </li>
          ))}
        </ul>

        {/* Add New Expense Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition mt-5"
        onClick={handleOpenModal}
      >
        + Add New Expense
      </button>
      </div>

      

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddExpense={addExpense} // Pass the callback
      />
    </div>
  );
}
