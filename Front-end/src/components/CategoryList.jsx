import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:6543/api";

const CategoryList = ({ categories, setCategories }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const editCategory = (id) => {
    const selected = categories.find((cat) => cat.id === id);
    if (selected) {
      setEditingCategory(selected);
      setFormData({
        name: selected.name,
        description: selected.description,
      });
    }
  };

  const saveEditedCategory = async () => {
    try {
      const res = await fetch(`${API_URL}/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update category");

      const updated = categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      );

      setCategories(updated);
      setEditingCategory(null);
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Categories
        </h2>
        <p className="text-gray-600 text-lg">Manage and organize your task categories</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">No categories yet</h3>
          <p className="text-gray-500 text-lg">Create your first category to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl p-8 transition-all duration-500 hover:scale-[1.02] relative overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards"
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-gray-100">
                <div className="flex space-x-3">
                  <button
                    onClick={() => editCategory(category.id)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-200 hover:from-yellow-500 hover:to-yellow-500 text-white py-2.5 px-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2.5 px-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Delete
                  </button>
                </div>
                <Link
                  to={`/tasks?category=${category.id}`}
                  className="group/link bg-gradient-to-r from-blue-600 sm:to-blue-500 hover:from-blue-700 sm:hover:to-blue-600 text-white py-2.5 px-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center">
                    View Tasks
                    <svg className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🎨 MODAL: Styled with gradient and icons */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-gray-400 bg-opacity-80 border border-gray-400 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden transform animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Edit Category
              </h3>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Category Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 pl-12 text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
              </div>

              <div className="relative">
                <textarea
                  placeholder="Category Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-2xl p-4 pl-12 pt-4 h-32 resize-none text-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                />
                <div className="absolute left-4 top-4">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={saveEditedCategory}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Save Changes
                </span>
              </button>
              <button
                onClick={() => setEditingCategory(null)}
                className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white py-3 px-8 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryList;
