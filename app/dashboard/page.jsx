"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Cookies from "js-cookie";

export default function DashboardOverview() {
  const router = useRouter();
  const [allLaporan, setAllLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- STATE FILTER BARU ---
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterLokasi, setFilterLokasi] = useState("Semua");
  const [filterSesi, setFilterSesi] = useState("Semua");
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  // Daftar Lokasi & Sesi untuk Dropdown (Harus sama dengan di Upload Page)
  const daftarLokasiBI = ["KPw BI Provinsi NTT (Kupang)", "Kas Keliling Pasar Inpres", "Kas Keliling Atambua", "Kas Keliling Maumere", "Kas Keliling Labuan Bajo"];
  const daftarSesi = ["Sesi 1 (09:00 - 11:00)", "Sesi 2 (11:00 - 13:00)", "Sesi 3 (13:00 - 15:00)"];

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role !== "admin") {
      router.push("/");
    } else {
      // 1. Ambil data pertama kali
      fetchLaporan();

      // 2. TAMBAHAN: Polling otomatis setiap 10 detik
      const interval = setInterval(() => {
        console.log("Auto-updating data...");
        fetchLaporan(false); // Kirim false agar tidak memicu loading screen (flicker)
      }, 5000);

      // 3. TAMBAHAN: Cleanup interval saat pindah halaman
      return () => clearInterval(interval);
    }
  }, [router]);

  // MODIFIKASI: Tambahkan parameter isInitial
  const fetchLaporan = async (isInitial = true) => {
    try {
      // Hanya tampilkan loading screen jika ini pemanggilan pertama kali
      if (isInitial && allLaporan.length === 0) setLoading(true);
      
      const res = await api.get("/admin/laporan");
      const rawData = res.data;
      const dataFinal = Array.isArray(rawData) ? rawData : rawData.data || [];
      setAllLaporan(dataFinal);
    } catch (err) {
      console.error("Gagal ambil data:", err);
      setAllLaporan([]);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  const updateStatus = async (id, nextStatus) => {
    try {
      await api.put(`/admin/laporan/${id}`, { status: nextStatus });
      setAllLaporan((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
      );
      if (selectedLaporan?.id === id) {
        setSelectedLaporan({ ...selectedLaporan, status: nextStatus });
      }
    } catch (err) {
      alert("Gagal update status!");
    }
  };

  const dataAman = Array.isArray(allLaporan) ? allLaporan : [];

  const totalMenunggu = dataAman.filter((l) => l.status === "Menunggu").length;
  const totalDiproses = dataAman.filter((l) => l.status === "Diproses").length;
  const totalSelesai = dataAman.filter((l) => l.status === "Selesai").length;

  // --- LOGIKA FILTER BERLAPIS (STATUS + LOKASI + SESI) ---
  const filteredData = dataAman.filter((laporan) => {
    const matchStatus = filterStatus === "Semua" || laporan.status === filterStatus;
    const matchLokasi = filterLokasi === "Semua" || laporan.lokasi === filterLokasi;
    const matchSesi = filterSesi === "Semua" || laporan.sesi === filterSesi;
    return matchStatus && matchLokasi && matchSesi;
  });

  // --- LOGIKA SORTING (TETAP ADA: TANGGAL TERDEKAT DI ATAS) ---
  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.tanggal_penukaran);
    const dateB = new Date(b.tanggal_penukaran);
    if (dateA - dateB !== 0) return dateA - dateB;
    return (a.sesi || "").localeCompare(b.sesi || "");
  });

  if (loading) return <div className="login-shell text-white p-10">Memvalidasi Data Laporan...</div>;

  return (
    <>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Monitoring RupiahCare 📡</h1>
          <p>Panel Kontrol Utama Petugas Bank Indonesia NTT (Auto-update)</p>
        </div>
      </div>

      {/* Stats Grid tetap sama */}
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-label">Total Filtered</div><div className="stat-val">{sortedData.length}</div></div>
        <div className="stat-card amber"><div className="stat-label">Menunggu</div><div className="stat-val">{dataAman.filter(l => l.status === "Menunggu").length}</div></div>
        <div className="stat-card blue"><div className="stat-label">Diproses</div><div className="stat-val">{totalDiproses || dataAman.filter(l => l.status === "Diproses").length}</div></div>
        <div className="stat-card green"><div className="stat-label">Selesai</div><div className="stat-val">{totalSelesai || dataAman.filter(l => l.status === "Selesai").length}</div></div>
      </div>

      <div className="card">
        <div className="card-head" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          <div className="card-title">Antrean Penukaran</div>
          
          {/* TOOLBAR FILTER */}
          <div style={{ display: 'flex', gap: '12px', width: '100%', flexWrap: 'wrap' }}>
            {/* Filter Status */}
            <select className="inp" style={{ width: '150px' }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="Semua">Semua Status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>

            {/* Filter Lokasi (Crucial for petugas di titik tertentu) */}
            <select className="inp" style={{ width: '220px' }} value={filterLokasi} onChange={(e) => setFilterLokasi(e.target.value)}>
              <option value="Semua">Semua Lokasi NTT</option>
              {daftarLokasiBI.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>

            {/* Filter Sesi */}
            <select className="inp" style={{ width: '180px' }} value={filterSesi} onChange={(e) => setFilterSesi(e.target.value)}>
              <option value="Semua">Semua Sesi</option>
              {daftarSesi.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="table-wrapper" style={{ maxHeight: "450px", overflowY: "auto" }}>
          <table style={{ borderCollapse: "separate", borderSpacing: "0" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "var(--card)" }}>
              <tr>
                <th>No. Tiket</th>
                <th>Pelapor</th>
                <th>Nominal</th>
                <th>Lokasi</th>
                <th>Jadwal Kedatangan</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((laporan) => (
                <tr key={laporan.id}>
                  <td><div style={{ fontWeight: "700", color: "var(--green)" }}>{laporan.ticket_number || laporan.kode_laporan}</div></td>
                  <td><div className="td-main">{laporan.User?.nama_lengkap || "User BI"}</div></td>
                  <td>Rp {parseInt(laporan.nominal || 0).toLocaleString("id-ID")}</td>
                  <td><div style={{ fontSize: "11px", fontWeight: "600" }}>{laporan.lokasi || "-"}</div></td>
                  <td>
                    <div style={{ fontSize: "12px", fontWeight: "600" }}>{laporan.tanggal_penukaran}</div>
                    <div style={{ fontSize: "10px", color: "var(--text3)" }}>{laporan.sesi}</div>
                  </td>
                  <td><span className={`badge badge-${(laporan.status || "").toLowerCase()}`}>{laporan.status}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-outline" style={{ padding: "6px 12px", fontSize: "11px" }} onClick={() => setSelectedLaporan(laporan)}>🔍 Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedLaporan && (
        <div className="modal-overlay" onClick={() => setSelectedLaporan(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detail Tiket {selectedLaporan.ticket_number}</h3>
              <button className="close-btn" onClick={() => setSelectedLaporan(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-img-box">
                  <label className="form-label">Foto Bukti Uang</label>
                  <img src={`http://localhost:8080${selectedLaporan.foto}`} className="img-preview" />
                </div>
                <div className="detail-info-box">
                   <div className="info-item"><label>Lokasi Penukaran</label><p style={{ fontWeight: '700', color: 'var(--blue)' }}>{selectedLaporan.lokasi}</p></div>
                   <div className="info-item"><label>Nama Pelapor</label><p>{selectedLaporan.User?.nama_lengkap}</p></div>
                   <div className="info-item"><label>Nominal</label><p style={{ color: "var(--green)", fontWeight: "700" }}>Rp {parseInt(selectedLaporan.nominal || 0).toLocaleString("id-ID")}</p></div>
                   <div className="info-item"><label>Jadwal</label><p>{selectedLaporan.tanggal_penukaran} | {selectedLaporan.sesi}</p></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {/* TAMBAHAN: Tombol Update Status agar Admin bisa bekerja langsung */}
              {selectedLaporan.status === "Menunggu" && (
                <button className="btn btn-primary" onClick={() => updateStatus(selectedLaporan.id, "Diproses")}>Terima & Proses</button>
              )}
              {selectedLaporan.status === "Diproses" && (
                <button className="btn" style={{ background: "var(--green)", color: "white" }} onClick={() => updateStatus(selectedLaporan.id, "Selesai")}>Selesaikan</button>
              )}
              <button className="btn btn-outline" onClick={() => setSelectedLaporan(null)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Style asli kamu tetap terjaga */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .modal-content {
          background: var(--card);
          width: 90%;
          max-width: 700px;
          border-radius: 16px;
          border: 1px solid var(--border);
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        .modal-header {
          padding: 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-body {
          padding: 24px;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .img-preview {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border);
          margin-top: 8px;
          max-height: 250px;
          object-fit: cover;
        }
        .info-item {
          margin-bottom: 16px;
        }
        .info-item label {
          font-size: 11px;
          color: var(--text3);
          text-transform: uppercase;
          font-weight: bold;
        }
        .modal-footer {
          padding: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}