import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // TODO: Call forgot password API
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="ISKCON Logo" className="h-12 w-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-sm text-center">
            Enter your registered email to receive a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primaryOrange focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primaryOrange text-white py-2 rounded-lg hover:bg-primaryOrangeDark transition font-medium"
          >
            Send Reset Link
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Back to{" "}
            <Link to="/login" className="text-primaryOrangeDark hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
