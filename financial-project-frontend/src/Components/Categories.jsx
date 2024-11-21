import React, { useState } from "react";
import AddCategoryModal from "./modals/AddCategoryModal";
import { useEffect } from "react";

export default function Categories(props) {
  const [categories, setCategories] = [
    props.categories,
    props.updateCategories,
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUri = process.env.REACT_APP_API_URI;

  const deleteCategory = (categoryId) => {
    const URL = `${apiUri}/deleteCategory/${categoryId}`;
    const OPTIONS = {
      method: "DELETE",
    };

    fetch(URL, OPTIONS).then((response) => {
      if (!response.ok) {
        return;
      }
      props.setTransactions((prev) =>
        prev.filter((exp) => exp.id == categoryId)
      );
      props.updateCategories((prev) =>
        prev.filter((category) => category.id != categoryId)
      );
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Get all user's categories
  useEffect(() => {
    // This code runs once when the component is loaded
    const userId = localStorage.getItem("userid");

    const URL = `${apiUri}/${userId}/getCategories`;
    const OPTIONS = {
      method: "GET",
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
          setCategories(data);
          data.map((category) =>
            category.expenses.map((expenses) => {
              props.setTransactions((prev) => [expenses, ...prev]);
            })
          );
        }
      });
  }, []); // The empty array ensures this only runs on mount and unmount

  const addCategory = (categoryName, budget) => {
    const newCategory = {
      name: categoryName,
      budget: budget,
      userId: localStorage.getItem("userid"),
    };

    const URL = `${apiUri}/addCategory`;
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    };

    fetch(URL, OPTIONS)
    .then((response) => {
      if (!response.ok) {
        return
      }
      return response.json()
    })
    .then((json)=>{
      newCategory.id = json;
      newCategory.expenses = [];
      props.updateCategories((prev) => {
        const updatedCategories = [...prev, newCategory];
        console.log("Updated Categories inside setter:", updatedCategories);
        return updatedCategories;
      });

    })
    
    handleCloseModal();
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 max-w-3xl m-auto">
        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

        { !(props.categories.length === 0) ?

          <ul className="max-h-48 overflow-y-scroll p-2 bg-slate-50 border border-gray-400 rounded-lg">
            {categories.map((category) => (
              <li className="flex justify-between items-center py-2 border-b border-gray-200">
                <p className="font-semibold">{category.name}</p>
                <button onClick={() => deleteCategory(category.id)}>
                  <span className="material-symbols-outlined text-2xl">
                    delete
                  </span>
                </button>
              </li>
            ))}
          </ul>
          :
          <p></p>
        }

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
