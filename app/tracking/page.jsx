"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function TrackingPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [laporanSaya, setLaporanSaya] = useState([]);
  const [selectedLaporan, setSelectedLaporan] = useState(null);

  // 1. SATPAM & AMBIL DATA
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
    } else {
      fetchRiwayat();
    }
  }, []);

  const fetchRiwayat = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/riwayat");

      console.log("Data Riwayat dari Go:", res.data);

      // FIX: Ambil dari res.data.riwayat sesuai dengan nama key di Go kamu
      const dataAsli = res.data.riwayat || [];

      setLaporanSaya(dataAsli);
    } catch (err) {
      console.error("Gagal ambil riwayat:", err);
      setLaporanSaya([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <div className="shell">
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
        role="user"
      />

      <div className="main">
        <Topbar
          title="Pelacakan Laporan"
          toggleSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="content-area">
          <div className="page-head" style={{ marginBottom: "32px" }}>
            <div className="page-head-left">
              <h1>Status Penukaran Anda</h1>
              <p>
                Pantau proses verifikasi laporan uang rusak Anda secara
                real-time.
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/upload")}
            >
              + Buat Laporan Baru
            </button>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title">Daftar Tiket Laporan</div>
            </div>

            <div className="table-wrapper">
              <table style={{ borderCollapse: "separate", borderSpacing: "0" }}>
                <thead>
                  <tr>
                    <th>Nomor Tiket</th>
                    <th>Nominal</th>
                    <th>Tanggal Jadwal</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {laporanSaya.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "var(--text3)",
                        }}
                      >
                        Belum ada laporan yang dikirim.
                      </td>
                    </tr>
                  ) : (
                    laporanSaya.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div
                            className="td-main"
                            style={{ color: "var(--green)" }}
                          >
                            {item.ticket_number}
                          </div>
                          <div className="td-sub">{item.jenis_kerusakan}</div>
                        </td>
                        <td>
                          <div className="td-main">
                            Rp {Number(item.nominal).toLocaleString("id-ID")}
                          </div>
                          <div className="td-sub">{item.jumlah} Lembar</div>
                        </td>
                        <td>
                          <div className="td-main">
                            {item.tanggal_penukaran}
                          </div>
                          <div className="td-sub">{item.sesi}</div>
                        </td>
                        <td>
                          <span
                            className={`badge badge-${(item.status || "menunggu").toLowerCase()}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="btn btn-outline"
                            style={{ padding: "6px 12px", fontSize: "11px" }}
                            onClick={() => setSelectedLaporan(item)}
                          >
                            👁️ Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL TIKET - VERSI LENGKAP */}
      {selectedLaporan && (
        <div className="modal-overlay" onClick={() => setSelectedLaporan(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "500px" }}
          >
            <div className="modal-header">
              {/* Menampilkan nomor tiket di header agar jelas */}
              <h3>Tiket #{selectedLaporan.ticket_number}</h3>
              <button
                className="close-btn"
                onClick={() => setSelectedLaporan(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {/* 1. Bagian Foto Bukti */}
              <div
                style={{
                  marginBottom: "20px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <label
                  className="form-label"
                  style={{
                    padding: "8px 12px",
                    display: "block",
                    background: "var(--bg3)",
                  }}
                >
                  📸 Foto Bukti Uang
                </label>
                <img
                  src={`http://localhost:8080${selectedLaporan.foto}`}
                  alt="Uang Rusak"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* 2. Grid Informasi Utama */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  padding: "10px",
                }}
              >
                <div>
                  <label
                    style={{
                      fontSize: "10px",
                      color: "var(--text3)",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Nominal
                  </label>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "var(--green)",
                    }}
                  >
                    Rp {Number(selectedLaporan.nominal).toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "10px",
                      color: "var(--text3)",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Status
                  </label>
                  <p>
                    <span
                      className={`badge badge-${selectedLaporan.status?.toLowerCase()}`}
                    >
                      {selectedLaporan.status}
                    </span>
                  </p>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "10px",
                      color: "var(--text3)",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    📅 Tanggal Kedatangan
                  </label>
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    {selectedLaporan.tanggal_penukaran || "-"}
                  </p>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "10px",
                      color: "var(--text3)",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    ⏰ Sesi Jam
                  </label>
                  <p style={{ fontSize: "14px", fontWeight: "600" }}>
                    {selectedLaporan.sesi || "-"}
                  </p>
                </div>
              </div>

              {/* 3. Catatan Tambahan (Jika ada) */}
              <div
                style={{
                  marginTop: "15px",
                  padding: "12px",
                  background: "var(--bg3)",
                  borderRadius: "8px",
                }}
              >
                <label
                  style={{
                    fontSize: "10px",
                    color: "var(--text3)",
                    fontWeight: "bold",
                  }}
                >
                  INFO KERUSAKAN
                </label>
                <p style={{ fontSize: "13px" }}>
                  {selectedLaporan.jenis_kerusakan} -{" "}
                  {selectedLaporan.catatan || "Tidak ada catatan tambahan."}
                </p>
              </div>

              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text3)",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                * Silakan tunjukkan tiket ini kepada petugas BI NTT sesuai
                jadwal di atas.
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                Cetak Ulang Tiket
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedLaporan(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: var(--card);
          border-radius: 16px;
          padding: 0;
          width: 90%;
          animation: zoomIn 0.2s ease;
          border: 1px solid var(--border2);
        }
        .modal-header {
          padding: 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .modal-body {
          padding: 20px;
        }
        .modal-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        small {
          font-size: 10px;
          color: var(--text3);
          font-weight: bold;
        }
        @keyframes zoomIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
