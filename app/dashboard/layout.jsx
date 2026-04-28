// app/dashboard/layout.jsx
"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="shell">
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* TAMBAHKAN role="admin" DI SINI */}
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        role="admin"
      />

      <div className="main">
        <Topbar
          title="Overview Dashboard"
          toggleSidebar={() => setIsSidebarOpen(true)}
        />
        <div className="content-area">{children}</div>
      </div>
    </div>
  );
}
