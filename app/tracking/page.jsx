"use client";
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function TrackingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 1. DATA DUMMY (Sesuai dengan yang ada di Dashboard)
  const dummyDatabase = [
    { tiket: "RC-001", nama: "Siti Rahayu", nominal: "Rp 150.000", status: "Menunggu", tanggal: "2026-04-26", sesi: "Sesi 1", lokasi: "Kupang" },
    { tiket: "RC-002", nama: "Ahmad Fauzi", nominal: "Koin x50", status: "Diproses", tanggal: "2026-04-26", sesi: "Sesi 2", lokasi: "Soe" },
    { tiket: "RC-003", nama: "Dewi Lestari", nominal: "Rp 100.000", status: "Selesai", tanggal: "2026-04-25", sesi: "Sesi 1", lokasi: "Atambua" },
  ];

  // 2. FUNGSI PENCARIAN (SIMULASI API)
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setIsLoading(true);
    setResult(null);
    setError('');

    // Simulasi delay jaringan selama 1.5 detik
    setTimeout(() => {
      const found = dummyDatabase.find(item => item.tiket.toUpperCase() === searchQuery.toUpperCase());
      
      if (found) {
        setResult(found);
      } else {
        setError('⚠️ Nomor tiket tidak ditemukan. Pastikan format benar (Contoh: RC-001)');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="shell">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} role="user" />
      
      <div className="main">
        <Topbar title="Lacak Laporan" toggleSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="content-area">
          <div className="page-head" style={{ textAlign: 'center', display: 'block', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>Lacak Status Penukaran</h1>
            <p style={{ color: 'var(--text3)' }}>Masukkan nomor tiket Anda untuk melihat progres verifikasi petugas BI</p>
          </div>

          {/* FORM PENCARIAN */}
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto 40px', padding: '30px' }}>
            <form onSubmit={handleSearch}>
              <div className="form-group">
                <label className="form-label">Nomor Tiket (ID Laporan)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Contoh: RC-001" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '1px' }}
                  />
                  <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ padding: '0 24px' }}>
                    {isLoading ? 'Mencari...' : 'Cari'}
                  </button>
                </div>
              </div>
            </form>
            {error && <p style={{ color: 'var(--red)', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>{error}</p>}
          </div>

          {/* HASIL TRACKING */}
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
              <p style={{ color: 'var(--text3)' }}>Menghubungkan ke Server Bank Indonesia...</p>
            </div>
          )}

          {result && (
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
              <div className="card-head" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text3)', textTransform: 'uppercase' }}>Status Saat Ini</div>
                  <h2 style={{ color: result.status === 'Selesai' ? 'var(--green)' : 'var(--amber)' }}>{result.status}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text3)' }}>ID Tiket</div>
                  <div style={{ fontWeight: '700' }}>{result.tiket}</div>
                </div>
              </div>

              <div style={{ padding: '30px 0' }}>
                {/* TIMELINE VISUAL */}
                <div className="tracking-timeline">
                  <div className={`t-step ${result.status === 'Menunggu' || result.status === 'Diproses' || result.status === 'Selesai' ? 'active' : ''}`}>
                    <div className="t-dot"></div>
                    <div className="t-label">Laporan Diterima</div>
                  </div>
                  <div className={`t-line ${result.status === 'Diproses' || result.status === 'Selesai' ? 'active' : ''}`}></div>
                  <div className={`t-step ${result.status === 'Diproses' || result.status === 'Selesai' ? 'active' : ''}`}>
                    <div className="t-dot"></div>
                    <div className="t-label">Dalam Verifikasi</div>
                  </div>
                  <div className={`t-line ${result.status === 'Selesai' ? 'active' : ''}`}></div>
                  <div className={`t-step ${result.status === 'Selesai' ? 'active' : ''}`}>
                    <div className="t-dot"></div>
                    <div className="t-label">Siap Ditukar</div>
                  </div>
                </div>
              </div>

              <div className="detail-list" style={{ background: 'var(--bg3)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text3)' }}>Nama Pelapor</label>
                    <p style={{ fontWeight: '600' }}>{result.nama}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text3)' }}>Nominal Uang</label>
                    <p style={{ fontWeight: '600', color: 'var(--green)' }}>{result.nominal}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text3)' }}>Jadwal Penukaran</label>
                    <p style={{ fontWeight: '600' }}>{result.tanggal} ({result.sesi})</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '11px', color: 'var(--text3)' }}>Lokasi Kantor</label>
                    <p style={{ fontWeight: '600' }}>KPwBI NTT - {result.lokasi}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .spinner { width: 40px; height: 40px; border: 4px solid var(--border); border-top: 4px solid var(--green); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .tracking-timeline { display: flex; align-items: center; justify-content: space-between; margin-bottom: 30px; position: relative; }
        .t-step { display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 2; flex: 1; }
        .t-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--border); transition: 0.3s; }
        .t-label { font-size: 11px; color: var(--text3); font-weight: 600; text-align: center; }
        .t-line { flex: 1; height: 2px; background: var(--border); margin: 0 -20px; margin-bottom: 20px; transition: 0.3s; }
        
        .t-step.active .t-dot { background: var(--green); box-shadow: 0 0 10px var(--green); }
        .t-step.active .t-label { color: var(--text); }
        .t-line.active { background: var(--green); }
      `}</style>
    </div>
  );
}