import AddBudgetModal from "./AddBudgetModal"
import {React, useState} from 'react'

export default function Budget() {
    const createBudget = () => {
    }
    const deleteBudget = () => {

    }
    const updateBudget = () => {

    }
    const getBudgets = () => {

    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalBudget, setTotalBudget] = useState(3000); // Total budget
    const [savingsGoal, setSavingsGoal] = useState(500); // Savings goal
    const [categories, setCategories] = useState([
      { id: 1, name: "Groceries", budget: 300 },
      { id: 2, name: "Rent", budget: 1200 },
      { id: 3, name: "Entertainment", budget: 200 },
    ]);
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const addCategoryBudget = (category, budget) => {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.name === category ? { ...cat, budget: cat.budget + budget } : cat
        )
      );
      handleCloseModal();
    };
  
    const remainingBudget = totalBudget - categories.reduce((sum, cat) => sum + cat.budget, 0);
  
    return (
      <>
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 max-w-3xl m-auto">
          <h2 className="text-2xl font-bold mb-4">Budget Manager</h2>
  
          <div className="mb-4">
            <p className="text-lg font-semibold">Total Budget: ${totalBudget}</p>
            <p className="text-lg font-semibold">Savings Goal: ${savingsGoal}</p>
            <p className={`text-lg font-semibold ${remainingBudget < 0 ? "text-red-500" : ""}`}>
              Remaining Budget: ${remainingBudget}
            </p>
          </div>
  
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center py-2 border-b border-gray-200"
              >
                <div>
                  <p className="font-semibold">{category.name}</p>
                </div>
                <p className="text-lg font-bold">${category.budget}</p>
              </li>
            ))}
          </ul>
  
          {/* Add Budget Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition mt-5"
            onClick={handleOpenModal}
          >
            + Add Budget
          </button>
        </div>
  
        {/* Add Budget Modal */}
        <AddBudgetModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddBudget={addCategoryBudget}
          categories={categories.map((cat) => cat.name)}
        />
      </>
    )
}