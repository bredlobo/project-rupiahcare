"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios'; 
import Cookies from 'js-cookie';

export default function DashboardOverview() {
  const router = useRouter();
  const [allLaporan, setAllLaporan] = useState([]); // Inisialisasi awal tetap Array
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (!token || role !== 'admin') {
      router.push('/');
    } else {
      fetchLaporan();
    }
  }, [router]);

  const fetchLaporan = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/laporan");
      
      // --- PERBAIKAN KRUSIAL ---
      // Kita cek: Kalau res.data itu Array, pakai langsung. 
      // Kalau dia Object yang punya properti 'data', ambil properti itu.
      // Kalau dua-duanya nggak ada, kasih Array kosong [].
      const rawData = res.data;
      const dataFinal = Array.isArray(rawData) ? rawData : (rawData.data || []);
      
      setAllLaporan(dataFinal);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      setAllLaporan([]); // Jaga-jaga agar tetap Array jika API error
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, nextStatus) => {
    try {
      await api.put(`/admin/laporan/${id}`, { status: nextStatus });
      setAllLaporan(prev => prev.map(item => item.id === id ? { ...item, status: nextStatus } : item));
      if (selectedLaporan?.id === id) {
        setSelectedLaporan({ ...selectedLaporan, status: nextStatus });
      }
    } catch (err) {
      alert("Gagal update status!");
    }
  };

  // --- PENGAMAN UNTUK FILTER & STATS ---
  // Kita pastikan 'dataAman' selalu berbentuk Array sebelum di-filter
  const dataAman = Array.isArray(allLaporan) ? allLaporan : [];

  const totalMenunggu = dataAman.filter(l => l.status === 'Menunggu').length;
  const totalDiproses = dataAman.filter(l => l.status === 'Diproses').length;
  const totalSelesai = dataAman.filter(l => l.status === 'Selesai').length;

  const filteredData = filterStatus === 'Semua' 
    ? dataAman 
    : dataAman.filter(laporan => laporan.status === filterStatus);

  if (loading) return <div className="login-shell text-white p-10">Memvalidasi Data Laporan...</div>;

  return (
    <>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Monitoring RupiahCare</h1>
          <p>Panel Kontrol Utama Petugas Bank Indonesia NTT</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Laporan</div>
          <div className="stat-val">{dataAman.length}</div>
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
                    <div className="td-main">{laporan.User?.nama_lengkap || "User BI"}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{laporan.ticket_number}</div>
                  </td>
                  <td>Rp {parseInt(laporan.nominal || 0).toLocaleString('id-ID')}</td>
                  <td>
                    <div style={{ fontSize: '12px', fontWeight: '600' }}>{laporan.tanggal_penukaran}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text3)' }}>{laporan.sesi}</div>
                  </td>
                  <td>
                    <span className={`badge badge-${(laporan.status || "").toLowerCase()}`}>
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

      {/* MODAL DETAIL (Logika & UI tetap asli punya kamu) */}
      {selectedLaporan && (
        <div className="modal-overlay" onClick={() => setSelectedLaporan(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detail Laporan {selectedLaporan.ticket_number}</h3>
              <button className="close-btn" onClick={() => setSelectedLaporan(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-img-box">
                  <label className="form-label">Foto Bukti Uang</label>
                  <img 
                    src={`http://localhost:8080${selectedLaporan.foto}`} 
                    alt="Bukti Uang" 
                    className="img-preview" 
                  />
                </div>
                <div className="detail-info-box">
                  <div className="info-item"><label>Nama Pelapor</label><p>{selectedLaporan.User?.nama_lengkap}</p></div>
                  <div className="info-item"><label>Nominal</label><p style={{color:'var(--green)', fontWeight:'700'}}>Rp {parseInt(selectedLaporan.nominal || 0).toLocaleString('id-ID')}</p></div>
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
        .img-preview { width: 100%; border-radius: 12px; border: 1px solid var(--border); margin-top: 8px; max-height: 250px; object-fit: cover; }
        .info-item { margin-bottom: 16px; }
        .info-item label { font-size: 11px; color: var(--text3); text-transform: uppercase; }
        .modal-footer { padding: 20px; border-top: 1px solid var(--border); display: flex; gap: 12px; justify-content: flex-end; }
      `}</style>
    </>
  );
}