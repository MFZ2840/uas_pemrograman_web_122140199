import React, { useState } from "react";
// import { Link } from "react-router-dom";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Pekerjaan" },
    { id: 2, name: "Kuliah/Belajar" },
    { id: 3, name: "Pribadi" },
    { id: 4, name: "Kesehatan" },
    { id: 5, name: "Keuangan" },
    { id: 6, name: "Proyek" },
    { id: 7, name: "Hobi" },
    { id: 8, name: "Sosial" }
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category_id: "",
    due_date: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fungsi untuk menambah tugas
  const addTask = async () => {
    // Gantilah dengan API yang sesuai
    // const response = await fetch("http://localhost:5000/api/tasks", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newTask),
    // });
    // const data = await response.json();
    setTasks([...tasks, newTask]); // Simulasi penambahan tugas di front-end
    setNewTask({
      title: "",
      description: "",
      category_id: "",
      due_date: "",
    });
  };

  // Fungsi untuk mengedit tugas
  const editTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    setEditingTask(task);
  };

  // Fungsi untuk menyimpan tugas yang diedit
  const saveEditedTask = async () => {
    // Gantilah dengan API yang sesuai
    // const response = await fetch(`http://localhost:5000/api/tasks/${editingTask.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(editingTask),
    // });
    // const data = await response.json();
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? editingTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  // Fungsi untuk menghapus tugas
  const deleteTask = async (id) => {
    // Gantilah dengan API yang sesuai
    // await fetch(`http://localhost:5000/api/tasks/${id}`, {
    //   method: "DELETE",
    // });
    setTasks(tasks.filter((task) => task.id !== id)); // Simulasi penghapusan tugas di front-end
  };

  // Fungsi untuk menandai tugas sebagai selesai
  const markAsCompleted = async (id) => {
    // Gantilah dengan API yang sesuai
    // const response = await fetch(`http://localhost:5000/api/tasks/${id}/complete`, {
    //   method: "PATCH",
    // });
    // const data = await response.json();
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, is_done: true } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tugas berdasarkan kategori
  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category_id === selectedCategory)
    : tasks;

  // Fungsi untuk menentukan status tugas
  const getTaskStatus = (dueDate) => {
    const today = new Date();
    const taskDueDate = new Date(dueDate);
    if (taskDueDate < today) {
      return "Missing";
    }
    return "Pending";
  };

  return (
    <div className="container mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Tasks</h1>

      {/* Form untuk Menambah Tugas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add New Task</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-2 rounded-md w-full mb-2"
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="border p-2 rounded-md w-full mb-2"
          />
          <select
            value={newTask.category_id}
            onChange={(e) =>
              setNewTask({ ...newTask, category_id: e.target.value })
            }
            className="border p-2 rounded-md w-full mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="block mt-2 mb-2">Due Date</label>
          <input
            type="date"
            value={newTask.due_date}
            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
            className="border p-2 rounded-md w-full mb-4"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Filter Berdasarkan Kategori */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Daftar Tugas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Task List</h2>
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-gray-500">Due: {task.due_date}</p>
                <p
                  className={`mt-2 ${
                    getTaskStatus(task.due_date) === "Missing"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {getTaskStatus(task.due_date)}
                </p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => editTask(task.id)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  {!task.is_done && (
                    <button
                      onClick={() => markAsCompleted(task.id)}
                      className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Tugas (Jika Ada) */}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold">Edit Task</h3>
            <div className="mt-4">
              <input
                type="text"
                value={editingTask.title}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, title: e.target.value })
                }
                className="border p-2 rounded-md w-full mb-2"
              />
              <textarea
                value={editingTask.description}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, description: e.target.value })
                }
                className="border p-2 rounded-md w-full mb-2"
              />
              <input
                type="date"
                value={editingTask.due_date}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, due_date: e.target.value })
                }
                className="border p-2 rounded-md w-full mb-4"
              />
              <button
                onClick={saveEditedTask}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingTask(null)}
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

export default TaskPage;
``
