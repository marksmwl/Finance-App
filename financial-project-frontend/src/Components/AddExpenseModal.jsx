// AddExpenseModal.js

export default function AddExpenseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Add Expense</h3>
        <form>
          <label className="block mb-2">Category</label>
          <input type="text" className="border p-2 rounded w-full mb-4" />
          
          <label className="block mb-2">Amount</label>
          <input type="number" className="border p-2 rounded w-full mb-4" />
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
          <button onClick={onClose} className="ml-2 text-gray-500">Cancel</button>
        </form>
      </div>
    </div>
  );
}
