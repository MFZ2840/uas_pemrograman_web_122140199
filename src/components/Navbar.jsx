import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-between items-center">
        {/* Left: Tasks & Categories */}
        <div className="flex space-x-4">
          <li>
            <Link to="/tasks" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/categories" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Categories
            </Link>
          </li>
        </div>

        {/* Center: Home */}
        <div className="mx-auto">
          <li>
            <Link to="/" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Home
            </Link>
          </li>
        </div>

        {/* Right: Login & Register */}
        <div className="flex space-x-4">
          <li>
            <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md">
              Register
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
