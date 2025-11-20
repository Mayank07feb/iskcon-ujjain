import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Call your login API here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="ISKCON Logo" className="h-12 w-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primaryOrange focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primaryOrange focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between text-sm">
            <Link
              to="/forgot-password"
              className="text-primaryOrangeDark hover:underline"
            >
              Forgot password?
            </Link>
            <Link
              to="/signup"
              className="text-primaryOrangeDark hover:underline"
            >
              Create account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-primaryOrange text-white py-2 rounded-lg hover:bg-primaryOrangeDark transition font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
