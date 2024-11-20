import React, { useState } from "react";

export default function AddBudgetModal({ isOpen, onClose, onAddBudget, categories }) {
  const [category, setCategory] = useState(categories[0] || "");
  const [budget, setBudget] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !budget) {
      alert("Please fill in all fields.");
      return;
    }

    onAddBudget(category, parseFloat(budget));
    setCategory(categories[0] || "");
    setBudget("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Add Budget</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="block mb-2">Budget Amount</label>
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
