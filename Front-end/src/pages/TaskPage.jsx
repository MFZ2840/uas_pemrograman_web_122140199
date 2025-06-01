import { useEffect, useState } from "react";
import {
  fetchTasks,
  fetchCategories,
  createTask,
  updateTask,
  deleteTask,
  markTaskDone,
} from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";
import TaskCard from "../components/TaskCard";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchTasks().then(setTasks);
    fetchCategories().then(setCategories);
  }, []);

  const handleAddTask = async (newTask) => {
    await createTask(newTask);
    const updated = await fetchTasks();
    setTasks(updated);
  };

  const handleEditTask = async (task) => {
    await updateTask(task.id, task);
    const updated = await fetchTasks();
    setTasks(updated);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleCompleteTask = async (id) => {
    await markTaskDone(id);
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, is_done: true } : t
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => String(task.category_id) === selectedCategory)
    : tasks;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Container */}
      <div className="px-8 py-8 relative z-10 w-full">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4 pb-2.5">
            Manage Your Tasks
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, organize, and track your tasks efficiently with our intuitive task management system.
          </p>
        </div>

        {/* Add Form */}
        <TaskForm onAdd={handleAddTask} categories={categories} />
        <TaskFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Filter Section */}
        <TaskFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                categories={categories}
                onEdit={() => {}}
                onSaveEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleCompleteTask}
              />
            ))
          ) : (
            <p className="text-gray-500">No tasks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
