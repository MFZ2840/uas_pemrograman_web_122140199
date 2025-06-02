import React, { useState, useEffect } from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import { fetchCategories, createCategory } from "../services/api";

const API_URL = "http://localhost:6543/api";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const addCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.description.trim()) return;
    try {
      await createCategory(newCategory);
      
      const updated = await fetchCategories();
      setCategories(updated);
      setNewCategory({ name: "", description: "" });
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-blue-300 pb-1">
            MyTask Manager
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Organize your life with smart categories
          </p>
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Category Form */}
        <CategoryForm
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          addCategory={addCategory}
        />

        {/* Category List */}
        <CategoryList categories={categories} setCategories={setCategories} />
      </div>
    </div>
  );
};

export default CategoryPage;
