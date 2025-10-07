import React from "react";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png"; // adjust the path as per your project structure

export default function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
  logout, // optional logout function
}) {
  const menuItems = [
    { label: "Home", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Analytics", icon: <ChartBarIcon className="w-5 h-5" /> },
    { label: "Users", icon: <UsersIcon className="w-5 h-5" /> },
    { label: "Settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 bg-white shadow-lg w-64 h-screen flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="ISKCON Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-bold text-primary">ISKCON Ujjain</span>
          </div>
          <button
            aria-label="Close sidebar"
            className="md:hidden text-gray-600 hover:text-primary transition"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActivePage(item.label.toLowerCase());
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-200 ${
                activePage === item.label.toLowerCase()
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-200 hover:text-primary"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={logout || (() => {})}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition font-medium"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
