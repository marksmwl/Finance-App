import AddExpenseModal from "./modals/AddExpenseModal";
import { React, useState } from "react";

export default function RecentTransactions(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUri = process.env.REACT_APP_API_URI;

  const createTransaction = () => {};
  const updateTransaction = () => {};
  const deleteTransaction = (expenseId) => {
    const URL = `${apiUri}/deleteExpense/${expenseId}`;
    const OPTIONS = {
      method: "DELETE",
    };

    fetch(URL, OPTIONS).then((response) => {
      if (!response.ok) {
        return;
      }
      props.setTransactions((prev) =>
        prev.filter((exp) => exp.id !== expenseId)
      );
      props.updateCategories((prev) =>
        prev.map((category) => ({
          ...category,
          expenses: category.expenses.filter(
            (expense) => expense.id !== expenseId
          ),
        }))
      );
    });
  };

  // Get all user's categories

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // console.log(props.transactions)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addExpense = (expense) => {
    const newTransaction = {
      amount: expense.amount,
      description: expense.description,
      categoryId: expense.categoryId, // Generate a new unique ID

      //   date: new Date().toISOString().split("T")[0], // Get today's date in YYYY-MM-DD format
    };

    const URL = `${apiUri}/addExpense`;
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    };

    fetch(URL, OPTIONS)
      .then((response) => {
        if (!response.ok) {
          return null
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          newTransaction.id = data;
          props.setTransactions((prev) => [newTransaction, ...prev]);

          props.updateCategories((prev) =>
            prev.map((category) =>
              category.id == expense.categoryId
                ? {
                    ...category,
                    expenses: [...category.expenses, newTransaction], // Add new expense
                  }
                : category
            )
          );
        }
      })
      .catch(() => {
        console.log("error adding expense");
      });
  };
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 max-w-3xl m-auto">
        <h2 className="text-2xl font-bold mb-4">Expenses</h2>

        {!(props.categories.length === 0) ? (
          props.categories.reduce(
            (sum, category) =>
              category.expenses.length === 0 ? sum + 0 : sum + 1,
            0
          ) !== 0 ? (
            <ul className="max-h-48 overflow-y-scroll px-2 bg-slate-50 border border-gray-400 rounded-lg">
              {props.categories.map((category) =>
                category.expenses.map((expenses) => (
                  <li className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div>
                      <p className="font-semibold">{category.name}</p>
                      <p className="text-sm text-gray-500">
                        {expenses.description}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="text-lg font-bold mr-5">
                        ${expenses.amount}
                      </p>
                      <button onClick={() => deleteTransaction(expenses.id)}>
                        <span className="material-symbols-outlined text-2xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          ) : (
            <div></div>
          )
        ) : (
          <p className="text-blue-500 font-bold">
            Create a category to assign expenses to it
          </p>
        )}

        {/* Add New Expense Button */}
        {!(props.categories.length == 0) ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition mt-5"
            onClick={handleOpenModal}
          >
            + Add New Expense
          </button>
        ) : (
          <>
            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-600 transition mt-5">
              + Add New Expense
            </button>{" "}
            <br />
            {/* <small className="text-red-700">Add a Category first</small> */}
          </>
        )}
      </div>
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddExpense={addExpense} // Pass the callback
        categories={props.categories}
      />
    </>
  );
}
