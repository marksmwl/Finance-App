import AddExpenseModal from "./AddExpenseModal";
import { React, useState } from "react";

export default function RecentTransactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalBudget] = useState(2000); // Keep as a constant
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, category: "Groceries", amount: 50, date: "2024-11-10" },
    { id: 2, category: "Rent", amount: 800, date: "2024-11-01" },
    { id: 3, category: "Entertainment", amount: 120, date: "2024-10-29" },
  ]);

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
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 max-w-3xl m-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>

        <ul>
          {recentTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
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
    </>
  );
}
