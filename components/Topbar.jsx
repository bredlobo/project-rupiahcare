"use client";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Topbar({ title, toggleSidebar }) {
  const [userName, setUserName] = useState('Petugas'); // Nama default

  useEffect(() => {
    // 1. Ambil nama yang disimpan di Cookies saat login
    const savedName = Cookies.get("namaUser");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // 2. Ambil inisial (huruf pertama) untuk Avatar
  const inisial = userName.charAt(0).toUpperCase();

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="topbar-title">{title}</div>
      </div>

      <div className="topbar-right">
        <div className="search-bar">
          <span>🔍</span>
          <input type="text" placeholder="Cari data..." />
        </div>

        <div className="topbar-actions">
          <button className="notif-btn">
            <span className="notif-icon">🔔</span>
            <span className="notif-dot"></span>
          </button>

          <div className="user-profile-mini">
            {/* Avatar sekarang mengambil huruf depan nama user secara otomatis */}
            <div
              className="user-avatar"
              style={{ 
                width: "34px", 
                height: "34px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              {inisial}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Nama sekarang mengikuti variabel userName */}
              <span style={{ fontSize: "14px", fontWeight: "600" }}>{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}