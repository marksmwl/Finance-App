import React, { useState } from "react";
import SimpleSnackbar from "../Snackbar";

export default function AddCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [open, setOpen] = useState(false);



  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("d")
    if (!categoryName) {
      setMessage("Enter a category name")
      setOpen(true);
      return;
    }
    else if (!budget) {
      setMessage("Enter a budget amount")
      setOpen(true);
      return;
    }


    onAddCategory(categoryName, budget);
    setCategoryName(""); // Reset input
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
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
        <SimpleSnackbar message={message} duration={2000} setOpenState={setOpen} openState={open} />
      </div>
    </div>
  );
}
