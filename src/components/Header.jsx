import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png"; // optional small logo in header

export default function Header({ setSidebarOpen }) {
  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-30">
      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-700 hover:text-primary transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Title with optional small logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="h-8 w-auto object-contain hidden md:block"
        />
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* User avatar / profile */}
      <div className="flex items-center gap-3">
        <span className="hidden md:block text-gray-700 font-medium">
          John Doe
        </span>
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-primary transition-all"
        />
      </div>
    </header>
  );
}
