import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Groceries" },
    { id: 2, name: "Rent" },
    { id: 3, name: "Entertainment" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addCategory = (categoryName) => {
    const newCategory = {
      id: categories.length + 1,
      name: categoryName,
    };

    setCategories((prev) => [...prev, newCategory]); // Add the new category to the list
    handleCloseModal();
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 max-w-3xl m-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <p className="font-semibold">{category.name}</p>
            </li>
          ))}
        </ul>

        {/* Add New Category Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition mt-5"
          onClick={handleOpenModal}
        >
          + Add New Category
        </button>
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddCategory={addCategory}
      />
    </>
  );
}
