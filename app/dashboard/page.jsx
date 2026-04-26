"use client";
import { useState } from 'react';

export default function DashboardOverview() {
  // 1. DATA DALAM STATE (Agar bisa diupdate statusnya)
  const [allLaporan, setAllLaporan] = useState([
    { id: 1, tiket: "RC-001", nama: "Siti Rahayu", nominal: "Rp 150.000", kota: "Kupang", status: "Menunggu", tanggal: "2026-04-26", sesi: "Sesi 1", jenis: "Sobek", foto: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400" },
    { id: 2, tiket: "RC-002", nama: "Ahmad Fauzi", nominal: "Koin x50", kota: "Soe", status: "Diproses", tanggal: "2026-04-26", sesi: "Sesi 2", jenis: "Koin Langka", foto: "https://images.unsplash.com/photo-1625206140502-861c16606004?w=400" },
    { id: 3, tiket: "RC-003", nama: "Dewi Lestari", nominal: "Rp 100.000", kota: "Atambua", status: "Selesai", tanggal: "2026-04-25", sesi: "Sesi 1", jenis: "Lusuh", foto: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400" },
    { id: 4, tiket: "RC-004", nama: "Rudi Hermawan", nominal: "Rp 200.000", kota: "Kupang", status: "Menunggu", tanggal: "2026-04-27", sesi: "Sesi 3", jenis: "Terbakar", foto: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400" },
    { id: 5, tiket: "RC-005", nama: "Budi Santoso", nominal: "Rp 50.000", kota: "Maumere", status: "Diproses", tanggal: "2026-04-27", sesi: "Sesi 1", jenis: "Berlubang", foto: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400" },
    { id: 6, tiket: "RC-006", nama: "Lina Marlina", nominal: "Rp 10.000", kota: "Ende", status: "Menunggu", tanggal: "2026-04-28", sesi: "Sesi 2", jenis: "Basah", foto: "https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=400" },
  ]);

  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  // 2. LOGIKA STATISTIK DINAMIS
  const totalMenunggu = allLaporan.filter(l => l.status === 'Menunggu').length;
  const totalDiproses = allLaporan.filter(l => l.status === 'Diproses').length;
  const totalSelesai = allLaporan.filter(l => l.status === 'Selesai').length;

  // 3. LOGIKA FILTER DATA
  const filteredData = filterStatus === 'Semua' 
    ? allLaporan 
    : allLaporan.filter(laporan => laporan.status === filterStatus);

  const updateStatus = (id, nextStatus) => {
    setAllLaporan(allLaporan.map(item => item.id === id ? { ...item, status: nextStatus } : item));
    if (selectedLaporan && selectedLaporan.id === id) {
      setSelectedLaporan({ ...selectedLaporan, status: nextStatus });
    }
  };

  return (
    <>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Monitoring RupiahCare</h1>
          <p>Panel Kontrol Utama Petugas Bank Indonesia NTT</p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Laporan</div>
          <div className="stat-val">{allLaporan.length}</div>
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
          
          {/* FITUR SORTIR / FILTER */}
          <div className="chip-group">
            {['Semua', 'Menunggu', 'Diproses', 'Selesai'].map(cat => (
              <div 
                key={cat} 
                className={`chip ${filterStatus === cat ? 'active' : ''}`} 
                onClick={() => setFilterStatus(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
        
        {/* FITUR SCROLL: Menambahkan max-height dan overflow */}
        <div className="table-wrapper" style={{ maxHeight: '450px', overflowY: 'auto' }}>
          <table style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: 'var(--card)' }}>
              <tr>
                <th>Pelapor</th>
                <th>Nominal</th>
                <th>Jadwal Kedatangan</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((laporan) => (
                <tr key={laporan.id}>
                  <td>
                    <div className="td-main">{laporan.nama}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{laporan.tiket}</div>
                  </td>
                  <td>{laporan.nominal}</td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: '600' }}>{laporan.tanggal}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{laporan.sesi}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${laporan.status.toLowerCase()}`}>
                      {laporan.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => setSelectedLaporan(laporan)}>
                      🔍 Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL (Tetap Ada) */}
      {selectedLaporan && (
        <div className="modal-overlay" onClick={() => setSelectedLaporan(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detail Laporan {selectedLaporan.tiket}</h3>
              <button className="close-btn" onClick={() => setSelectedLaporan(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-img-box">
                  <label className="form-label">Foto Bukti Uang</label>
                  <img src={selectedLaporan.foto} alt="Uang Rusak" className="img-preview" />
                </div>
                <div className="detail-info-box">
                  <div className="info-item"><label>Nama Pelapor</label><p>{selectedLaporan.nama}</p></div>
                  <div className="info-item"><label>Jenis Kerusakan</label><p>{selectedLaporan.jenis}</p></div>
                  <div className="info-item"><label>Nominal</label><p style={{color:'var(--green)', fontWeight:'700'}}>{selectedLaporan.nominal}</p></div>
                  <div className="info-item"><label>Status Saat Ini</label><p>{selectedLaporan.status}</p></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {selectedLaporan.status === 'Menunggu' && (
                <button className="btn btn-primary" onClick={() => updateStatus(selectedLaporan.id, 'Diproses')}>Terima & Proses</button>
              )}
              {selectedLaporan.status === 'Diproses' && (
                <button className="btn" style={{background:'var(--green)', color:'white'}} onClick={() => updateStatus(selectedLaporan.id, 'Selesai')}>Selesaikan</button>
              )}
              <button className="btn btn-outline" onClick={() => setSelectedLaporan(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
        .modal-content { background: var(--card); width: 90%; max-width: 700px; border-radius: 16px; border: 1px solid var(--border); overflow: hidden; animation: slideUp 0.3s ease; }
        .modal-header { padding: 20px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .modal-body { padding: 24px; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .img-preview { width: 100%; border-radius: 12px; border: 1px solid var(--border); margin-top: 8px; }
        .info-item { margin-bottom: 16px; }
        .info-item label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; }
        .modal-footer { padding: 20px; border-top: 1px solid var(--border); display: flex; gap: 12px; justify-content: flex-end; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @media (max-width: 600px) { .detail-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}