import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BasicTabs from "../Components/TabComponent";
import NavBar from "../Components/NavBar";
import Budget from "../Components/Budget";

export default function UserHome() {
  const [totalBudget, setTotalBudget] = useState(0);
  const [savings, setSavings] = useState(0); // Savings goal
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [username, setUsername] = useState("Guest");
  const apiUri = process.env.REACT_APP_API_URI;
  const navigate = useNavigate();

  useEffect(()=>{
    const userId = localStorage.getItem("userid");

    if (userId == null) {
      navigate("/")
      return
    }
  })

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (userId == null) {
      return;
    }

    const URL = `${apiUri}/user/${userId}`;
    const OPTIONS = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(URL, OPTIONS)
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUsername(data.name);
          const budget = data.budget || 0;
          const savings = data.savings || 0;
          setTotalBudget(budget);
          setSavings(savings);
        }
      });
  }, []);


  const [categories, setCategories] = useState([]);

  let totalSpent = recentTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  )
  .toFixed(2);
  let remainingBudget = totalBudget - totalSpent;

  return (
    <div className=" bg-gray-100 min-h-screen">
      <NavBar></NavBar>
      {/* Welcome Message */}
      <h1 className="text-xl font-bold mb-4 mt-5 ml-5 text-center">
        Welcome {username}!
      </h1>

      {/* Quick Overview Cards */}
      <div className="p-3">
        <div className="flex flex-wrap justify-center items-center mb-5 ">
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

        <Budget
          categories={categories}
          updateCategories={setCategories}
          totalBudget={totalBudget}
          setTotalBudget={setTotalBudget}
          savings={savings}
          setSavings={setSavings}
        />
      </div>

      <BasicTabs
        categories={categories}
        updateCategories={setCategories}
        transactions={recentTransactions}
        updateTransactions={setRecentTransactions}
        totalBudget={totalBudget}
        setTotalBudget={setTotalBudget}
        savings={savings}
        setSavings={setSavings}
      ></BasicTabs>
    </div>
  );
}
