import React from "react";
import {
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2 sm:mt-0">
          Welcome back 👋, here’s your latest summary
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-2xl font-semibold mt-1">₹2,34,500</h2>
            </div>
            <BanknotesIcon className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <h2 className="text-2xl font-semibold mt-1">1,245</h2>
            </div>
            <UserGroupIcon className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">New Signups</p>
              <h2 className="text-2xl font-semibold mt-1">120</h2>
            </div>
            <ChartBarIcon className="w-10 h-10 text-primary" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">System Health</p>
              <h2 className="text-2xl font-semibold mt-1 text-green-600">
                99.9%
              </h2>
            </div>
            <Cog6ToothIcon className="w-10 h-10 text-primary" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex justify-between text-gray-700">
            <span>🧾 Payment received from Ramesh Kumar</span>
            <span className="text-gray-500 text-sm">2h ago</span>
          </li>
          <li className="py-3 flex justify-between text-gray-700">
            <span>👤 New user registered: Anjali Sharma</span>
            <span className="text-gray-500 text-sm">5h ago</span>
          </li>
          <li className="py-3 flex justify-between text-gray-700">
            <span>⚙️ Server backup completed successfully</span>
            <span className="text-gray-500 text-sm">8h ago</span>
          </li>
          <li className="py-3 flex justify-between text-gray-700">
            <span>💬 Support ticket resolved</span>
            <span className="text-gray-500 text-sm">1d ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
