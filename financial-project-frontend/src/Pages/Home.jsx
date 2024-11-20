import React, { useState } from "react";
import BasicTabs from "../Components/TabComponent";
import NavBar from "../Components/NavBar";

export default function UserHome({ userName }) {
  const [totalBudget, setTotalBudget] = useState(2000);
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, category: "Groceries", amount: 50, date: "2024-11-10" },
    { id: 2, category: "Rent", amount: 800, date: "2024-11-01" },
    { id: 3, category: "Entertainment", amount: 120, date: "2024-10-29" },
  ]);

  const [categories, setCategories] = useState([]);

  let totalSpent = recentTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  let remainingBudget = totalBudget - totalSpent;

  

  return (
    <div className=" bg-gray-100 min-h-screen">
      <NavBar></NavBar>
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

      <BasicTabs categories={categories} updateCategories={setCategories}></BasicTabs>
    </div>
  );
}
