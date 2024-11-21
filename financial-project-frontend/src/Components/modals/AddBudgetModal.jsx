import React, { useState } from "react";
import SimpleSnackbar from "../Snackbar";

export default function AddBudgetModal({ isOpen, onClose, onAddBudget, budgetType, updateAPI }) {
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const apiUri = process.env.REACT_APP_API_URI;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!budget) {
      setMessage("Enter an amount")
      setOpen(true);
      return;
    }

    onAddBudget(parseFloat(budget));
    updateAPI(parseFloat(budget))
    setBudget("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Edit Budget</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">New {budgetType} Amount</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
          <button
            type="submit"
            onClick={onClose}
            className="ml-2 text-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
      <SimpleSnackbar message={message} duration={2000} setOpenState={setOpen} openState={open} />
    </div>
  );
}
