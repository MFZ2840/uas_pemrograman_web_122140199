import React, { useState } from "react";

const TaskForm = ({ onAdd, categories }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    details: "",
    category_id: "",
    due_date: "",
  });

  const isAddTaskValid =
    newTask.title.trim() !== "" &&
    newTask.details.trim() !== "" &&
    newTask.category_id !== "" &&
    newTask.due_date !== "";

  const handleSubmit = async () => {
    if (!isAddTaskValid) return;
    await onAdd(newTask);
    setNewTask({ title: "", details: "", category_id: "", due_date: "" });
  };

  return (
    <section className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 mb-16 border border-white/20">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mr-4">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-700">Add New Task</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-2xl p-4 pr-12 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <div className="relative">
            <select
              value={newTask.category_id}
              onChange={(e) => setNewTask({ ...newTask, category_id: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <textarea
              placeholder="Task Description"
              value={newTask.details}
              onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-2xl p-4 pr-12 h-24 resize-none focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 mb-2 font-semibold text-sm uppercase tracking-wide">Due Date</label>
            <input
              type="date"
              value={newTask.due_date}
              onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
              className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isAddTaskValid}
        className={`w-full mt-8 font-bold py-4 rounded-2xl shadow-xl transition-all duration-300 transform ${
          isAddTaskValid
            ? "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isAddTaskValid ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Task</span>
          </span>
        ) : (
          "Please fill all fields"
        )}
      </button>
    </section>
  );
};

export default TaskForm;
