import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTasks, fetchCategories } from "../services/api";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        const fetchedCategories = await fetchCategories();
        setTasks(fetchedTasks);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const pendingTasks = tasks.filter((task) => !task.is_done).length;
  const taskCompletionPercent = tasks.length
    ? Math.round((tasks.filter((t) => t.is_done).length / tasks.length) * 100)
    : 0;
  const recentTasks = [...tasks]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);
  const activeCategories = categories.length;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen font-sans relative overflow-hidden">
      
    {/* Hero Section */}
    <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white rounded-2xl py-24 px-6 text-center overflow-hidden">

        <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl text-gray-300 font-extrabold drop-shadow-2xl max-w-5xl mx-auto leading-tight mb-8">
            Welcome to{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent animate-pulse drop-shadow-sm">
                MyTask Manager
              </span>
            </span>
        </h1>
        <p className="mt-8 text-2xl md:text-3xl max-w-3xl mx-auto drop-shadow-lg leading-relaxed text-blue-50 animate-pulse">
            Your all-in-one personal task management tool to keep you organized and productive every day.
        </p>
        <Link
            to="/tasks"
            className="mt-12 inline-block bg-gradient-to-r from-white to-blue-50 text-indigo-700 font-bold py-4 px-10 rounded-full shadow-2xl
            hover:shadow-3xl hover:scale-105 transition-all duration-300 transform hover:from-blue-50 hover:to-white group"
            aria-label="Start Managing Tasks"
        >
            <span className="relative flex items-center space-x-3">
              <span className="text-lg">Start Managing Tasks</span>
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              </span>
        </Link>
        </div>

      {/* Enhanced Decorative Elements */}
      <div className="absolute top-16 left-16 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-full animate-bounce"></div>
      <div className="absolute top-32 right-32 w-16 h-16 bg-gradient-to-br from-teal-300/40 to-transparent rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-16 left-24 w-24 h-24 bg-gradient-to-br from-purple-300/30 to-transparent rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-24 right-16 w-32 h-32 bg-gradient-to-br from-cyan-300/20 to-transparent rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
    </section>

    {/* Your Progress Overview */}
    <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pb-1">
        Your Progress Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Pending Tasks */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col items-center group hover:scale-105 border border-indigo-100">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-300 to-purple-700 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-3 text-indigo-600">Pending Tasks</h3>
          <p className="text-6xl font-bold bg-gradient-to-r from-indigo-300 to-purple-700 bg-clip-text text-transparent">{pendingTasks}</p>
        </div>

        {/* Active Categories */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col items-center group hover:scale-105 border border-teal-100">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-blue-400 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-3 text-gray-600">Active Categories</h3>
          <p className="text-6xl font-bold bg-gradient-to-r from-gray-400 to-blue-900 bg-clip-text text-transparent">{activeCategories}</p>
        </div>

        {/* Task Completion */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col items-center group hover:scale-105 border border-emerald-100">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-4 text-green-600">Task Completion</h3>
          <div className="w-full bg-gradient-to-r from-gray-100 to-gray-300 rounded-full h-4 overflow-hidden shadow-inner mb-3">
            <div className="bg-gradient-to-r from-green-300 to-green-600 h-4 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
              style={{ width: `${taskCompletionPercent}%` }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          <p className="text-2xl font-bold bg-gradient-to-r from-gray-400 to-green-500 bg-clip-text text-transparent">{taskCompletionPercent}%</p>
        </div>
      </div>
    </section>

    {/* Recent Tasks */}
    <section className="max-w-6xl mx-auto px-6 mb-24 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Recent Tasks</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="space-y-6">
        {recentTasks.map((task, index) => (
          <div
            key={task.id}
            className="group bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-500 flex justify-between items-center hover:scale-[1.02] hover:-translate-y-1 border border-gray-100 relative overflow-hidden"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animation: 'slideInUp 0.6s ease-out forwards'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative z-10 flex items-center space-x-6">
              <div className={`w-6 h-6 rounded-full shadow-lg group-hover:scale-125 transition-transform duration-300 ${
                task.is_done 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse'
              }`}>
                {task.is_done && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-2xl text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate group-hover:scale-105 transform origin-left" title={task.title}>
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2 text-lg" title={task.details}>
                  {task.details}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  📅 {new Date(task.due_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span
              className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold shadow-lg transition-all duration-300 group-hover:scale-105 ${
                task.is_done
                  ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                  : "bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border border-orange-200"
              }`}
            >
              {task.is_done ? (
                <>
                  <span className="text-green-600 text-lg">✓</span>
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <span className="text-yellow-500 text-lg animate-spin">⏳</span>
                  <span>Pending</span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* Feature Section */}
    <section className="container mx-auto py-20 px-6 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Powerful Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Feature Cards */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 text-center flex flex-col items-center group hover:scale-105 border border-indigo-100">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-xl">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 12l2 2 4-4"></path>
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">Manage Tasks</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Create, update, and track your tasks effortlessly in one convenient place.
          </p>
          <Link
            to="/tasks"
            className="text-indigo-600 font-bold hover:text-purple-600 transition-colors duration-300 group-hover:scale-110 transform inline-flex items-center space-x-2"
          >
            <span>Learn More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 text-center flex flex-col items-center group hover:scale-105 border border-teal-100">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-200 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-xl">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 7v10a4 4 0 004 4h10"></path>
              <path d="M7 3h10a4 4 0 014 4v10"></path>
              <path d="M12 7v10"></path>
              <path d="M7 12h10"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-blue-500 mb-4">Categories</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Organize your tasks by category to stay on top of your priorities.
          </p>
          <Link
            to="/categories"
            className="text-blue-500 font-bold hover:text-blue-700 transition-colors duration-300 group-hover:scale-110 transform inline-flex items-center space-x-2"
          >
            <span>Learn More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 text-center flex flex-col items-center group hover:scale-105 border border-purple-100">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-xl">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a7.5 7.5 0 0113 0" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-purple-700 mb-4">User Authentication</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Secure login and registration to protect your tasks and data.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-2 rounded-full font-bold hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Navigation Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl py-20 mx-6 mb-10 overflow-hidden animate-glow">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm animate-bounce mb-6">
              <svg className="w-10 h-10 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-gray-100 text-5xl font-extrabold mb-6 drop-shadow-2xl">Ready to get started?</h2>
          <p className="text-gray-800 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your productivity today. Join thousands of users who have revolutionized their task management.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
            <Link
              to="/tasks"
              className="group relative bg-gradient-to-r from-white via-blue-50 to-white text-indigo-700 py-5 px-12 rounded-full font-bold hover:shadow-2xl transition-all duration-500 shadow-xl transform hover:scale-110 overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center space-x-3">
                <span className="text-lg">Go to Tasks</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link
              to="/categories"
              className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 px-12 rounded-full font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-110 overflow-hidden"
            >
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative flex items-center space-x-3">
                <span className="text-lg">Go to Categories</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full animate-bounce shadow-lg"></div>
        <div className="absolute bottom-10 right-20 w-36 h-36 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full animate-bounce shadow-lg" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.8s'}}></div>
      </section>
    {/* Footer Section */}
      <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 mx-6 mb-6 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
        <div className="relative z-10 text-center px-6">
          <div className="mb-6">
            <div className="inline-block p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-2">
              MyTask Manager
            </h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Empowering productivity, one task at a time.
            </p>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              © 2024 MyTask Manager. Built with ❤️ for productivity enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;