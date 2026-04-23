"use client";
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function DashboardLayout({ children }) {
  // State untuk menyimpan status menu di HP (terbuka/tertutup)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="shell">
      {/* Layar gelap transparan saat menu HP terbuka */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      
      <div className="main">
        <Topbar title="Overview Dashboard" toggleSidebar={() => setIsSidebarOpen(true)} />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}