"use client";

export default function Topbar({ title, toggleSidebar }) {
  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Tombol ini akan memanggil setIsSidebarOpen(true) dari layout */}
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
            <div
              className="user-avatar"
              style={{ width: "34px", height: "34px" }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Bred Lobo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
