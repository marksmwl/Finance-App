import React, { useState } from "react";
import SimpleSnackbar from "../Snackbar";

export default function AddExpenseModal({ isOpen, onClose, onAddExpense, categories }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState("");


  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) {
      setErrorMessage("Fill in all the fields")
      setOpen(true)
      return;
    }
    console.log(amount)
    // Call the parent callback with the form data
    onAddExpense({ categoryId: category, description: description, amount: parseFloat(parseFloat(amount).toFixed(2)) });

    // Clear inputs and close modal
    setCategory("");
    setDescription("");
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
              <option key={cat.id + "key"} value={cat.id}>
                {cat.name}
              </option>
            ))}
          
          </select>

          <label className="block mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          
          <label className="block mb-2">Amount</label>
          <input
            type="float"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
          <button
            type="button"
            onClick={()=>{
              onClose();
              setCategory("");
              setDescription("");
              setAmount("");
            }}
            className="ml-2 text-gray-500"
          >
            Cancel
          </button>
        </form>
        <SimpleSnackbar
        message={errorMessage}
        openState={open}
        setOpenState={setOpen}
        />
      </div>
    </div>
  );
}
