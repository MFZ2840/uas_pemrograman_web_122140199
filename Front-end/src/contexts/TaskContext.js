import React, { createContext, useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  const addTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const modifyTask = async (id, task) => {
    await updateTask(id, task);
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...task } : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, modifyTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
