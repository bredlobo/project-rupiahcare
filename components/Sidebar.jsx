"use client";
import Link from "next/link";

export default function Sidebar({ isOpen, closeSidebar, role = "user" }) {
  return (
    /* Template literal ini akan menghasilkan 'sidebar open' jika isOpen true */
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sb-logo">
        <div className="sb-logomark">
          <div className="sb-circle">RC</div>
          <div className="sb-logomark-text">
            <div className="sb-name">RupiahCare</div>
            <div className="sb-tag">
              {role === "admin" ? "Admin" : "Pengguna"}
            </div>
          </div>
        </div>
        {/* Tombol X yang kamu buat di CSS .close-menu-btn */}
        <button className="close-menu-btn" onClick={closeSidebar}>
          ✕
        </button>
      </div>

      <div className="sb-nav" style={{ flex: 1 }}>
        <div className="sb-section">Menu Utama</div>

        {role === "admin" && (
          <Link href="/dashboard" className="nav-item">
            <span className="nav-icon" style={{ fontSize: "16px" }}>
              📊
            </span>
            <span className="nav-label">Overview</span>
          </Link>
        )}

        {role !== "admin" && (
          <>
            <Link href="/upload" className="nav-item">
              <span className="nav-icon" style={{ fontSize: "16px" }}>
                📤
              </span>
              <span className="nav-label">Buat Laporan</span>
            </Link>
            <Link href="/tracking" className="nav-item">
              <span className="nav-icon" style={{ fontSize: "16px" }}>
                📦
              </span>
              <span className="nav-label">Lacak Laporan</span>
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <div className="sb-section" style={{ marginTop: "20px" }}>
              Manajemen
            </div>
            <Link href="/users" className="nav-item">
              <span className="nav-icon" style={{ fontSize: "16px" }}>
                👥
              </span>
              <span className="nav-label">Pengguna</span>
            </Link>
            <Link href="/verification" className="nav-item">
              <span className="nav-icon" style={{ fontSize: "16px" }}>
                ✅
              </span>
              <span className="nav-label">Verifikasi Laporan</span>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
}
