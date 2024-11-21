import React, { useState } from "react";
import BasicTabs from "../Components/TabComponent";
import NavBar from "../Components/NavBar";

export default function UserHome({ userName }) {
  const [totalBudget, setTotalBudget] = useState(2000);
  const [recentTransactions, setRecentTransactions] = useState([

  ]);

  const [categories, setCategories] = useState([]);

  let totalSpent = recentTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  let remainingBudget = totalBudget - totalSpent;

  return (
    <div className=" bg-gray-100 min-h-screen">
      <NavBar></NavBar>
      {/* Welcome Message */}
      <h1 className="text-xl font-bold mb-4 mt-5 ml-5 text-center">Welcome!</h1>

      {/* Quick Overview Cards */}

      <div className="flex flex-wrap justify-center items-center mb-5 bg-slate-200 p-3">
        <div className="bg-white p-3 rounded-lg shadow-md m-2 flex justify-between min-w-72">
          <h2 className="font-semibold">Total Budget</h2>
          <p className="text-xl font-bold mt-2">${totalBudget}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md m-2 flex justify-between min-w-72">
          <h2 className="font-semibold">Total Spent</h2>
          <p className="text-xl font-bold mt-2 text-red-500">${totalSpent}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md m-2 flex justify-between min-w-72">
          <h2 className="font-semibold">Remaining Budget</h2>
          <p className="text-xl font-bold mt-2 text-green-500">
            ${remainingBudget}
          </p>
        </div>
      </div>

      <BasicTabs
        categories={categories}
        updateCategories={setCategories}
        updateTransactions={setRecentTransactions}
      ></BasicTabs>
    </div>
  );
}
