"use client";
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Link from 'next/link';

export default function TrackingPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="shell">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      
      {/* Sidebar Warga */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} role="user" />
      
      <div className="main">
        <Topbar title="Lacak Laporan" toggleSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="content-area">
          
          {/* HEADER HALAMAN */}
          <div className="page-head" style={{ marginBottom: '32px' }}>
            <div className="page-head-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div className="sb-circle" style={{ width: '36px', height: '36px', fontSize: '14px' }}>RC</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)', lineHeight: '1' }}>RupiahCare</div>
                  <div style={{ fontSize: '10px', color: 'var(--text3)', letterSpacing: '0.5px', marginTop: '4px' }}>PANTAU STATUS LAPORAN</div>
                </div>
              </div>
              <h1>Lacak Laporan Saya</h1>
              <p>Pantau status pengajuan penukaran uang Anda secara real-time</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
            
            {/* =========================================
                ITEM 1: DIPROSES
                ========================================= */}
            <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
              {/* Kotak Ikon Kiri */}
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px', color: 'var(--text2)' }}>
                💳
              </div>
              {/* Konten Kanan */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text)', fontSize: '15px' }}>#LPR-2024-001 — Rp 50.000 × 3</div>
                  <span className="badge badge-diproses">Diproses</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Sobek · Bandung · 22 Apr 2026</div>

                <div className="progress-bar" style={{ marginTop: '16px' }}>
                  <div className="progress-fill" style={{ width: '66%', background: 'var(--green)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', fontWeight: '600' }}>
                  <span style={{ color: 'var(--green)' }}>Diterima ✓</span>
                  <span style={{ color: 'var(--blue)' }}>Diverifikasi ✓</span>
                  <span style={{ color: 'var(--blue)' }}>Dijadwalkan ✓</span>
                  <span style={{ color: 'var(--text3)' }}>Selesai</span>
                </div>
              </div>
            </div>

            {/* =========================================
                ITEM 2: MENUNGGU
                ========================================= */}
            <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px', color: 'var(--text2)' }}>
                🕒
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text)', fontSize: '15px' }}>#LPR-2024-002 — Koin Rp 1.000 × 50</div>
                  <span className="badge badge-menunggu">Menunggu</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Koin · Surabaya · 22 Apr 2026</div>

                <div className="progress-bar" style={{ marginTop: '16px' }}>
                  <div className="progress-fill" style={{ width: '25%', background: 'var(--amber)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', fontWeight: '600' }}>
                  <span style={{ color: 'var(--green)' }}>Diterima ✓</span>
                  <span style={{ color: 'var(--text3)' }}>Diverifikasi</span>
                  <span style={{ color: 'var(--text3)' }}>Dijadwalkan</span>
                  <span style={{ color: 'var(--text3)' }}>Selesai</span>
                </div>
              </div>
            </div>

            {/* =========================================
                ITEM 3: SELESAI (Highlight Hijau)
                ========================================= */}
            <div className="card" style={{ padding: '20px', display: 'flex', gap: '16px', border: '1px solid var(--green)', background: 'rgba(34, 200, 122, 0.03)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--green-bg)', border: '1px solid rgba(34, 200, 122, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px', color: 'var(--green)' }}>
                ✓
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text)', fontSize: '15px' }}>#LPR-2024-003 — Rp 100.000 × 2</div>
                  <span className="badge badge-selesai">Selesai</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Lusuh · Jakarta · 18 Apr 2026 · Ditukar di Kantor BI Jakarta</div>

                <div className="progress-bar" style={{ marginTop: '16px' }}>
                  <div className="progress-fill" style={{ width: '100%', background: 'var(--green)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', fontWeight: '600' }}>
                  <span style={{ color: 'var(--green)' }}>Diterima ✓</span>
                  <span style={{ color: 'var(--green)' }}>Diverifikasi ✓</span>
                  <span style={{ color: 'var(--green)' }}>Dijadwalkan ✓</span>
                  <span style={{ color: 'var(--green)' }}>Selesai ✓</span>
                </div>
              </div>
            </div>

            {/* =========================================
                TOMBOL BUAT LAPORAN BARU
                ========================================= */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Link href="/upload">
                <button className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>
                  + Buat Laporan Baru
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}