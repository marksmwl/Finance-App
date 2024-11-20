import React, { useState } from "react";

export default function AddExpenseModal({ isOpen, onClose, onAddExpense, categories }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) {
      alert("Please fill in all fields.");
      return;
    }
    // Call the parent callback with the form data
    onAddExpense({ category, amount: parseFloat(amount) });

    // Clear inputs and close modal
    setCategory("");
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Add Expense</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat)=> (
              <option key={cat.id} value={cat.name.toLowerCase()}>
                {cat.name}
              </option>
            ))}
          
          </select>
          
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
