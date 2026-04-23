"use client";

export default function TrackingPage() {
  return (
    <>
      <div className="page-head">
        <div className="page-head-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div className="sb-circle" style={{ width: '32px', height: '32px' }}>RC</div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text2)' }}>RupiahCare</span>
          </div>
          <h1>Lacak Laporan Saya</h1>
          <p>Pantau status pengajuan penukaran uang Anda secara real-time</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
        {/* Item 1: Diproses */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--text)' }}>#LPR-2024-001 — Rp 50.000 × 3</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Sobek · Bandung · 22 Apr 2026</div>
            </div>
            <span className="badge badge-diproses">Diproses</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '66%' }}></div></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: 'var(--text3)' }}>
            <span style={{ color: 'var(--green)' }}>Diterima ✓</span>
            <span style={{ color: 'var(--green)' }}>Diverifikasi ✓</span>
            <span>Dijadwalkan</span>
            <span>Selesai</span>
          </div>
        </div>

        {/* Item 2: Menunggu */}
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
              <div style={{ fontWeight: '700', color: 'var(--text)' }}>#LPR-2024-002 — Koin Rp 1.000 × 50</div>
              <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Koin · Surabaya · 22 Apr 2026</div>
            </div>
            <span className="badge badge-menunggu">Menunggu</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: '20%', background: 'var(--amber)' }}></div></div>
        </div>

        <button className="btn btn-primary" style={{ alignSelf: 'center', marginTop: '10px' }}>+ Buat Laporan Baru</button>
      </div>
    </>
  );
}