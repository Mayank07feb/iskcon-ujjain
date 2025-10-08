import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Dashboard pages
import DashboardHome from "./dashboard/DashboardHome";
import BookingsPage from "./dashboard/BookingsPage";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboardHome");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Render page based on activePage state
  const renderPage = () => {
    const pages = {
      dashboardHome: <DashboardHome />,
      bookings: <BookingsPage />,
      analytics: <div className="p-6 text-gray-700 text-xl">📊 Analytics Page</div>,
      users: <div className="p-6 text-gray-700 text-xl">👥 Users Page</div>,
      settings: <div className="p-6 text-gray-700 text-xl">⚙️ Settings Page</div>,
    };
    return pages[activePage] || <DashboardHome />;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
