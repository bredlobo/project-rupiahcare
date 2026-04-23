import Link from 'next/link';

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sb-logo">
        <div className="sb-logomark">
          <div className="sb-circle">RC</div>
          <div>
            <div className="sb-name">RupiahCare</div>
            <div className="sb-tag">Admin BI</div>
          </div>
        </div>
        {/* Tombol silang untuk menutup menu di HP */}
        <button className="close-menu-btn" onClick={closeSidebar}>✕</button>
      </div>

      <div className="sb-nav">
        <div className="sb-section">Menu Utama</div>
        <Link href="/dashboard" className="nav-item active" onClick={closeSidebar}><span className="nav-label">📊 Overview</span></Link>
        <Link href="/dashboard/upload" className="nav-item" onClick={closeSidebar}><span className="nav-label">📤 Buat Laporan</span></Link>
        <Link href="/dashboard/tracking" className="nav-item" onClick={closeSidebar}><span className="nav-label">📦 Lacak Laporan</span></Link>

        <div className="sb-section" style={{marginTop: '20px'}}>Manajemen</div>
        <div className="nav-item"><span className="nav-label">👥 Pengguna</span></div>
      </div>

      <div className="sb-user">
        <div className="user-avatar">B</div>
        <div>
          <div className="user-name">Bred Lobo</div>
          <div className="user-role">Petugas BI</div>
        </div>
      </div>
    </aside>
  );
}