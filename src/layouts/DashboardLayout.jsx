import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dashboard pages
import DashboardHome from "../screens/dashboard/DashboardHome";
import BookingsPage from "../screens/dashboard/BookingsPage";
import BookBulkRoom from "../screens/dashboard/BookBulkRoom";
import BookingCalendar from "../screens/dashboard/BookingCalendar";
import RateCalendar from "../screens/dashboard/RateCalendar";
import AnalyticsPage from "../screens/dashboard/AnalyticsPage";
import UsersPage from "../screens/dashboard/UsersPage";
import SettingsPage from "../screens/dashboard/SettingsPage";
import FacilityBookingList from "../screens/dashboard/FacilityBookingList"; // Add this import

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="flex-shrink-0 h-full overflow-y-auto">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Routes inside Dashboard */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route index element={<DashboardHome />} /> {/* 👈 dashboard root */}
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="bulk-booking" element={<BookBulkRoom />} />
            <Route path="booking-calendar" element={<BookingCalendar />} />
            <Route path="rate-calendar" element={<RateCalendar />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="facility-booking-list" element={<FacilityBookingList />} /> {/* Add this route */}
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}