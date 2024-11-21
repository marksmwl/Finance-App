import AddBudgetModal from "./modals/AddBudgetModal";
import { React, useState } from "react";

export default function Budget(props) {
  const [isTotalModalOpen, setIsTotalModalOpen] = useState(false);
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  const apiUri = process.env.REACT_APP_API_URI;

  const updateBudget = (amount) => {
    const userId = localStorage.getItem("userid");

    const budget = {
      budget: amount,
    };
    const URL = `${apiUri}/${userId}/budget`;
    const OPTIONS = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
    };

    fetch(URL, OPTIONS)
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .catch(() => {
        return;
      });
  };
  const updateSavings = (savings) => {
    const userId = localStorage.getItem("userid");

    const body = {
      amount: savings,
    };
    const URL = `${apiUri}/${userId}/savings`;
    const OPTIONS = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
          // console.log(data);
          props.setTransactions([]);
          props.updateCategories(data);
          data.map((category) =>
            category.expenses.map((expenses) => {
              props.setTransactions((prev) => [expenses, ...prev]);
            })
          );
        }
      })
      .catch(() => {
        return;
      });
  };

  const remainingBudget =
    props.totalBudget -
    (Array.isArray(props.categories)
      ? props.categories.reduce((sum, cat) => sum + Number(cat.budget || 0), 0)
      : 0);

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 max-w-4xl m-auto z-50">
        <h2 className="text-2xl font-bold mb-4">Manage Budgets</h2>

        <div className="mb-4">
          <div className="flex">
            <p className="text-lg font-semibold mr-2">
              Total Budget: ${props.totalBudget}
            </p>
            <button onClick={() => setIsTotalModalOpen(true)}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
          <div className="flex mb-5">
            <p
              className={`text-lg font-semibold mr-2 ${
                remainingBudget < 0 ? "text-red-500" : ""
              }`}
            >
              Unallocated Budget: ${remainingBudget}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <p className="text-lg font-semibold mr-2">
                Savings Goal: ${props.savings}
              </p>
              <button
                className="mb-5"
                onClick={() => setIsSavingsModalOpen(true)}
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <small>
              {props.savings > props.totalBudget ? (
                <p className="text-red-600 font-semibold">
                  Your savings goal is higher than your budget!
                </p>
              ) : props.totalBudget -
                  props.categories.reduce(
                    (total, category) =>
                      total +
                      category.expenses.reduce(
                        (sum, expense) => sum + Number(expense.amount || 0),
                        0
                      ),
                    0
                  ) <
                props.savings ? (
                <p className="text-red-600 font-semibold">
                  You can still save{" "}
                  {props.totalBudget -
                    props.categories.reduce(
                      (total, category) =>
                        total +
                        category.expenses.reduce(
                          (sum, expense) => sum + Number(expense.amount || 0),
                          0
                        ),
                      0
                    )}
                  .
                </p>
              ) : (
                <p className="text-green-600 font-semibold">
                  On track to reaching your savings goal.
                </p>
              )}{" "}
            </small>
          </div>
        </div>

        {!(props.categories.length === 0) ? (
          <ul className="max-h-32 overflow-y-scroll px-2 bg-slate-50 border border-gray-400 rounded-lg">
            {props.categories.map((category) => (
              <li className="flex justify-between items-center py-2 border-b border-gray-200">
                {category.expenses.reduce(
                  (sum, expense) => sum + expense.amount,
                  0
                ) > category.budget ? (
                  <>
                    <div className="flex">
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-red-600 ml-1">(Exceeding Budget)</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">
                        $
                        {category.expenses
                          .reduce(
                            (sum, expense) => sum + parseFloat(expense.amount),
                            0
                          )
                          .toFixed(2)}{" "}
                        / {category.budget}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="font-semibold">{category.name}</p>
                    </div>
                    <p className="text-lg font-bold">
                      $
                      {category.expenses.reduce(
                        (sum, expense) => sum + expense.amount,
                        0
                      )}{" "}
                      / {category.budget}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-bold text-blue-500">
            Create a category to manage its budget here
          </p>
        )}

        {/* 
        {!(props.categories.length == 0) ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition mt-5"
            onClick={handleOpenModal}
          >
            + Add Budget
          </button>
        ) : (
          <>
            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-600 transition mt-5">
              + Add Budget
            </button>{" "}
            <br />
            <small className="text-red-700">Add a Category first</small>
          </>
        )}
        */}
      </div>

      <AddBudgetModal
        isOpen={isTotalModalOpen}
        onClose={() => setIsTotalModalOpen(false)}
        onAddBudget={props.setTotalBudget}
        budgetType={"Total Budget"}
        updateAPI={updateBudget}
      />

      <AddBudgetModal
        isOpen={isSavingsModalOpen}
        onClose={() => setIsSavingsModalOpen(false)}
        onAddBudget={props.setSavings}
        budgetType={"Desired Savings"}
        updateAPI={updateSavings}
      />
    </>
  );
}
