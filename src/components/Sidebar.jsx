import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon, // Add this import
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

export default function Sidebar({ sidebarOpen, setSidebarOpen, logout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Home", path: "/dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { label: "Bookings", path: "/dashboard/bookings", icon: <CalendarDaysIcon className="w-5 h-5" /> },
    { label: "Booking Calendar", path: "/dashboard/booking-calendar", icon: <CalendarDaysIcon className="w-5 h-5" /> },
    { label: "Rate Calendar", path: "/dashboard/rate-calendar", icon: <CurrencyRupeeIcon className="w-5 h-5" /> },
    { label: "Bulk Booking", path: "/dashboard/bulk-booking", icon: <UserGroupIcon className="w-5 h-5" /> },
    { label: "Facility Booking List", path: "/dashboard/facility-booking-list", icon: <DocumentTextIcon className="w-5 h-5" /> }, // Add this menu item
    { label: "Analytics", path: "/dashboard/analytics", icon: <ChartBarIcon className="w-5 h-5" /> },
    { label: "Users", path: "/dashboard/users", icon: <UsersIcon className="w-5 h-5" /> },
    { label: "Settings", path: "/dashboard/settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static z-50 bg-white shadow-md w-64 h-screen flex flex-col transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header - Matched to main Header height */}
        <div className="px-4 py-4 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="ISKCON Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-bold text-primaryOrange">
              ISKCON Ujjain
            </span>
          </div>
          <button
            className="md:hidden text-gray-600 hover:text-primaryOrange transition"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive =
              currentPath === item.path ||
              (item.path === "/dashboard" && currentPath === "/dashboard/");
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? "bg-primaryOrange/10 text-primaryOrange font-semibold border-l-4 border-primaryOrange"
                    : "text-gray-700 hover:bg-primaryOrangeLight/30 hover:text-primaryOrange"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t bg-white">
          <button
            onClick={logout || (() => {})}
            className="flex items-center gap-2 text-gray-700 hover:text-primaryOrange transition font-medium"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}