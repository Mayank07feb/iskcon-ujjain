import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DashboardHome from "./DashboardHome";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboardHome");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "dashboardHome":
        return <DashboardHome />;
      case "analytics":
        return <div className="p-6">📊 Analytics Page</div>;
      case "users":
        return <div className="p-6">👥 Users Page</div>;
      case "settings":
        return <div className="p-6">⚙️ Settings Page</div>;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
}
