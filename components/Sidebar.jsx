import Link from 'next/link';

// Kita tambahkan prop 'role' di sini. Jika tidak diisi, otomatis dianggap 'user'
export default function Sidebar({ isOpen, closeSidebar, role = "user" }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sb-logo">
        <div className="sb-logomark">
          <div className="sb-circle">RC</div>
          <div>
            <div className="sb-name">RupiahCare</div>
            {/* Tag di bawah nama aplikasi berubah sesuai role */}
            <div className="sb-tag">{role === 'admin' ? 'Admin BI' : 'Pengguna'}</div>
          </div>
        </div>
        {/* Tombol silang untuk menutup menu di HP */}
        <button className="close-menu-btn" onClick={closeSidebar}>✕</button>
      </div>

      <div className="sb-nav">
        <div className="sb-section">Menu Utama</div>

        {/* --- MENU OVERVIEW: HANYA MUNCUL JIKA ADMIN --- */}
        {role === 'admin' && (
          <Link href="/dashboard" className="nav-item">
            <span className="nav-icon" style={{ fontSize: '16px' }}>📊</span>
            <span className="nav-label">Overview</span>
          </Link>
        )}

        {/* --- MENU INI MUNCUL UNTUK SEMUA ORANG --- */}
        <Link href="/upload" className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>📤</span>
          <span className="nav-label">Buat Laporan</span>
        </Link>

        <Link href="/tracking" className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>📦</span>
          <span className="nav-label">Lacak Laporan</span>
        </Link>

        {/* --- MENU MANAJEMEN: HANYA MUNCUL JIKA ADMIN --- */}
        {role === 'admin' && (
          <>
            <div className="sb-section" style={{marginTop: '20px'}}>Manajemen</div>
            <div className="nav-item">
              <span className="nav-icon" style={{ fontSize: '16px' }}>👥</span>
              <span className="nav-label">Pengguna</span>
            </div>
          </>
        )}
      </div>

      <div className="sb-user">
        <div className="user-avatar">B</div>
        <div>
          <div className="user-name">Bred Lobo</div>
          {/* Jabatan berubah sesuai role */}
          <div className="user-role">{role === 'admin' ? 'Petugas BI' : 'Warga'}</div>
        </div>
      </div>
    </aside>
  );
}