"use client";
import { useState } from 'react';

export default function DashboardOverview() {
  // 1. DATA DENGAN TAMBAHAN TANGGAL & SESI
  const [allLaporan, setAllLaporan] = useState([
    { id: 1, nama: "Siti Rahayu", nominal: "Rp 150.000", kota: "Bandung", status: "Menunggu", tanggal: "2026-04-26", sesi: "Sesi 1" },
    { id: 2, nama: "Ahmad Fauzi", nominal: "Koin x50", kota: "Surabaya", status: "Diproses", tanggal: "2026-04-26", sesi: "Sesi 2" },
    { id: 3, nama: "Dewi Lestari", nominal: "Rp 100.000 x2", kota: "Jakarta", status: "Selesai", tanggal: "2026-04-25", sesi: "Sesi 1" },
    { id: 4, nama: "Rudi Hermawan", nominal: "Rp 20.000 x10", kota: "Medan", status: "Menunggu", tanggal: "2026-04-27", sesi: "Sesi 3" },
  ]);

  const [filterStatus, setFilterStatus] = useState('Semua');

  // Statistik Otomatis
  const totalLaporan = allLaporan.length;
  const totalMenunggu = allLaporan.filter(l => l.status === 'Menunggu').length;
  const totalDiproses = allLaporan.filter(l => l.status === 'Diproses').length;
  const totalSelesai = allLaporan.filter(l => l.status === 'Selesai').length;

  const updateStatus = (id, nextStatus) => {
    const updated = allLaporan.map(item => {
      if (item.id === id) return { ...item, status: nextStatus };
      return item;
    });
    setAllLaporan(updated);
  };

  const filteredData = filterStatus === 'Semua' 
    ? allLaporan 
    : allLaporan.filter(laporan => laporan.status === filterStatus);

  return (
    <>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Monitoring RupiahCare</h1>
          <p>Manajemen Operasional Penukaran NTT</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Laporan</div>
          <div className="stat-val">{totalLaporan}</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-label">Menunggu</div>
          <div className="stat-val">{totalMenunggu}</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Diproses</div>
          <div className="stat-val">{totalDiproses}</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Selesai</div>
          <div className="stat-val">{totalSelesai}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">Antrean Penukaran</div>
          <div className="chip-group">
            {['Semua', 'Menunggu', 'Diproses', 'Selesai'].map(cat => (
              <div key={cat} className={`chip ${filterStatus === cat ? 'active' : ''}`} onClick={() => setFilterStatus(cat)}>
                {cat}
              </div>
            ))}
          </div>
        </div>
        
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Pelapor</th>
                <th>Nominal</th>
                <th>Jadwal Kedatangan</th> {/* KOLOM BARU */}
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((laporan) => (
                <tr key={laporan.id}>
                  <td><div className="td-main">{laporan.nama}</div></td>
                  <td>{laporan.nominal}</td>
                  <td>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{laporan.tanggal}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{laporan.sesi}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${laporan.status.toLowerCase()}`}>
                      {laporan.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {laporan.status === 'Menunggu' && (
                      <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => updateStatus(laporan.id, 'Diproses')}>
                        Terima
                      </button>
                    )}
                    {laporan.status === 'Diproses' && (
                      <button className="btn" style={{ padding: '4px 10px', fontSize: '11px', background: 'var(--green)', color: 'white' }} onClick={() => updateStatus(laporan.id, 'Selesai')}>
                        Selesaikan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}