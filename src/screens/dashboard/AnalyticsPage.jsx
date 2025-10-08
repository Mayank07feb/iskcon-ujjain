import React from "react";
import { CurrencyRupeeIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl text-gray-900">₹3,45,678</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <UserGroupIcon className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Total Guests</p>
            <p className="text-2xl text-gray-900">1,234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
