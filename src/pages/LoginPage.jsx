import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fungsi untuk menangani login
  const handleLogin = (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (email && password) {
      alert("Login successful!");
      // Redirect atau fungsi login lainnya bisa ditambahkan di sini
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h1>

      {/* Form Login */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>

        {/* Link to Register Page */}
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
