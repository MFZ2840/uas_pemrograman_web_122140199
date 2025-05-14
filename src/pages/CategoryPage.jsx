import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState(null);

  // Fungsi untuk mengambil data kategori
  // const fetchCategories = async () => {
  //   // Gantilah dengan API yang sesuai
  //   const response = await fetch("http://localhost:5000/api/categories");
  //   const data = await response.json();
  //   setCategories(data);
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  // Fungsi untuk menambah kategori
  const addCategory = async () => {
    // Gantilah dengan API yang sesuai
    // const response = await fetch("http://localhost:5000/api/categories", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newCategory),
    // });
    // const data = await response.json();
    setCategories([...categories, newCategory]);
    setNewCategory({ name: "", description: "" });
  };

  // Fungsi untuk mengedit kategori
  const editCategory = async (id) => {
    const category = categories.find((cat) => cat.id === id);
    setEditingCategory(category);
  };

  // Fungsi untuk menyimpan kategori yang diedit
  const saveEditedCategory = async () => {
    // Gantilah dengan API yang sesuai
    // const response = await fetch(
    //   `http://localhost:5000/api/categories/${editingCategory.id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(editingCategory),
    //   }
    // );
    // const data = await response.json();
    const updatedCategories = categories.map((cat) =>
      cat.id === editingCategory.id ? editingCategory : cat
    );
    setCategories(updatedCategories);
    setEditingCategory(null);
  };

  // Fungsi untuk menghapus kategori
  const deleteCategory = async (id) => {
    // Gantilah dengan API yang sesuai
    // await fetch(`http://localhost:5000/api/categories/${id}`, {
    //   method: "DELETE",
    // });
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Categories</h1>

      {/* Form untuk Menambah Kategori */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="border p-2 rounded-md w-full mb-2"
          />
          <textarea
            placeholder="Category Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="border p-2 rounded-md w-full mb-4"
          />
          <button
            onClick={addCategory}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>
      </div>

      {/* Daftar Kategori */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Category List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-600">{category.name}</h3>
              <p className="text-gray-700">{category.description}</p>
              <div className="mt-4">
                <button
                  onClick={() => editCategory(category.id)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              {/* Filter Tugas Berdasarkan Kategori */}
              <div className="mt-4">
                <Link
                  to={`/tasks?category=${category.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  View Tasks in this Category
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Kategori (Jika Ada) */}
      {editingCategory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold">Edit Category</h3>
            <div className="mt-4">
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, name: e.target.value })
                }
                className="border p-2 rounded-md w-full mb-2"
              />
              <textarea
                value={editingCategory.description}
                onChange={(e) =>
                  setEditingCategory({ ...editingCategory, description: e.target.value })
                }
                className="border p-2 rounded-md w-full mb-4"
              />
              <button
                onClick={saveEditedCategory}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingCategory(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
