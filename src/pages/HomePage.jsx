import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-12 px-6 bg-blue-600 text-white">
        <h1 className="text-4xl font-extrabold">Welcome to MyTask Manager</h1>
        <p className="mt-4 text-lg">
          A personal task management solution that helps you stay organized
          and productive.
        </p>
        <Link
          to="/tasks"
          className="mt-8 inline-block px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200"
        >
          Start Managing Tasks
        </Link>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto py-12 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-600">Manage Tasks</h3>
          <p className="mt-4 text-gray-700">
            Create, update, and track tasks easily in one place.
          </p>
          <Link
            to="/tasks"
            className="mt-4 inline-block text-blue-500 hover:text-blue-700"
          >
            Learn More
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-600">Categories</h3>
          <p className="mt-4 text-gray-700">
            Organize your tasks into categories to stay organized.
          </p>
          <Link
            to="/categories"
            className="mt-4 inline-block text-blue-500 hover:text-blue-700"
          >
            Learn More
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-600">User Authentication</h3>
          <p className="mt-4 text-gray-700">
            Secure login and registration system to manage your tasks safely.
          </p>
          <div className="mt-4">
            <Link
              to="/login"
              className="inline-block text-blue-500 hover:text-blue-700 mr-4"
            >
              Login
            </Link>
            |
            <Link
              to="/register"
              className="inline-block text-blue-500 hover:text-blue-700 ml-4"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="bg-blue-600 py-6">
        <div className="text-center">
          <h2 className="text-white text-2xl font-bold mb-4">Ready to get started?</h2>
          <div className="flex justify-center space-x-4">
            <Link
              to="/tasks"
              className="bg-white text-blue-600 py-2 px-6 rounded-md hover:bg-blue-100 transition duration-200"
            >
              Go to Tasks
            </Link>
            <Link
              to="/categories"
              className="bg-white text-blue-600 py-2 px-6 rounded-md hover:bg-blue-100 transition duration-200"
            >
              Go to Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
