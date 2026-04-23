export default function Topbar({ title, toggleSidebar }) {
  return (
    <div className="topbar">
      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>☰</button>
        <div className="topbar-title">{title}</div>
      </div>
      
      <div className="topbar-right">
        <div className="search-bar">
          <input placeholder="Cari laporan atau NIK..." />
        </div>
        
        {/* Bagian ini yang memastikan susunan rapi */}
        <div className="topbar-actions">
          <span className="notif-icon">🔔</span>
          <div className="user-profile-mini">
            <div className="avatar-mini">B</div>
            <span className="profile-name">Bred Lobo</span>
          </div>
        </div>
      </div>
    </div>
  );
}