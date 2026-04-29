"use client";
import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);
  const [activeKerusakan, setActiveKerusakan] = useState("Sobek");
  const jenisKerusakan = [
    "Sobek",
    "Lusuh / Pudar",
    "Terbakar",
    "Berlubang",
    "Basah / Berjamur",
    "Koin Langka",
  ];

  // --- DAFTAR LOKASI RESMI BI ---
  const daftarLokasiBI = [
    "KPw BI Provinsi NTT (Kupang)",
    "Kas Keliling Pasar Inpres",
    "Kas Keliling Atambua",
    "Kas Keliling Maumere",
    "Kas Keliling Labuan Bajo",
  ];

  const [nominal, setNominal] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [catatan, setCatatan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [sesi, setSesi] = useState("Sesi 1 (09:00 - 11:00)");
  const [lokasi, setLokasi] = useState(""); // TAMBAHAN: State Lokasi

  const [fotoFile, setFotoFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    if (!token || role != "user") {
      alert("Hanya warga (User) yang bisa membuat laporan!");
      router.push(role === "admin" ? "/dashboard" : "/");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setErrorMsg("");
    }
  };

  const handleNominalChange = (e) => {
    setNominal(e.target.value.replace(/[^0-9]/g, ""));
  };

  const handleJumlahChange = (e) => {
    setJumlah(e.target.value.replace(/[^0-9]/g, ""));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ticketNumber);
    alert("Nomor tiket berhasil disalin!");
  };

  const lanjutLangkah = async () => {
    setErrorMsg("");

    if (step === 1) {
      if (!nominal || !jumlah) {
        setErrorMsg("⚠️ Mohon isi Nominal dan Jumlah lembar terlebih dahulu!");
        return;
      }
    } else if (step === 2) {
      if (!fotoFile) {
        setErrorMsg("⚠️ Mohon upload foto bukti uang!");
        return;
      }
    } else if (step === 3) {
      // TAMBAHAN: Validasi Tanggal & Lokasi
      if (!tanggal || !lokasi) {
        setErrorMsg("⚠️ Mohon tentukan tanggal dan lokasi penukaran!");
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        const formData = new FormData();
        formData.append("jenis_kerusakan", activeKerusakan);
        formData.append("nominal", nominal);
        formData.append("jumlah", jumlah);
        formData.append("tanggal_penukaran", tanggal);
        formData.append("sesi", sesi);
        formData.append("lokasi", lokasi); // TAMBAHAN: Kirim Lokasi ke Go
        formData.append("foto", fotoFile);
        formData.append("catatan", catatan);

        const res = await api.post("/user/lapor", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setTicketNumber(res.data.ticket_number || "RC-SUCCESS");
        setIsSuccess(true);
      } catch (err) {
        setErrorMsg(
          err.response?.data?.error ||
            "Gagal mengirim laporan. Cek koneksi server.",
        );
      }
    }
  };

  if (loading) return null;

  if (isSuccess) {
    return (
      <div className="shell">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => setIsSidebarOpen(false)}
          role="user"
        />
        <div
          className="main"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg1)",
          }}
        >
          <div
            id="printable-ticket"
            className="card"
            style={{ maxWidth: "480px", textAlign: "center", padding: "40px" }}
          >
            <div
              className="no-print"
              style={{ fontSize: "64px", marginBottom: "20px" }}
            >
              🎉
            </div>
            <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>
              Laporan Terkirim!
            </h1>
            <p
              style={{
                color: "var(--text3)",
                fontSize: "14px",
                marginBottom: "32px",
              }}
            >
              Simpan tiket ini untuk dibawa ke lokasi <b>{lokasi}</b> sesuai
              jadwal.
            </p>

            <div
              style={{
                background: "var(--bg3)",
                padding: "24px",
                borderRadius: "12px",
                border: "2px dashed var(--green)",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "var(--text3)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Nomor Tiket Anda
              </div>
              <div
                id="ticket-number"
                style={{
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "var(--green)",
                  letterSpacing: "2px",
                }}
              >
                {ticketNumber}
              </div>
              <button
                className="no-print"
                onClick={copyToClipboard}
                style={{
                  marginTop: "12px",
                  background: "none",
                  border: "none",
                  color: "var(--green)",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Salin Nomor Tiket
              </button>
            </div>

            <div className="no-print" style={{ display: "flex", gap: "12px" }}>
              <button
                className="btn btn-outline"
                onClick={() => window.print()}
                style={{ flex: 1, justifyContent: "center" }}
              >
                Cetak PDF
              </button>
              <button
                className="btn btn-primary"
                onClick={() => router.push("/tracking")}
                style={{ flex: 1, justifyContent: "center" }}
              >
                Lacak Status
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          title="Buat Laporan Baru"
          toggleSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="content-area">
          <div className="page-head" style={{ marginBottom: "32px" }}>
            <h1>Buat Laporan Baru</h1>
            <p>Proses pelaporan uang tidak layak edar wilayah NTT</p>
          </div>

          <div
            className="progress-steps"
            style={{ maxWidth: "800px", marginBottom: "40px" }}
          >
            {[
              { s: 1, n: "Data Uang" },
              { s: 2, n: "Foto Bukti" },
              { s: 3, n: "Lokasi & Waktu" },
              { s: 4, n: "Konfirmasi" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: item.s === 4 ? "none" : 1,
                }}
              >
                <div
                  className={`step ${step > item.s ? "done" : step === item.s ? "active" : ""}`}
                >
                  <div className="step-circle">
                    {step > item.s ? "✓" : item.s}
                  </div>
                  <div className="step-label">{item.n}</div>
                </div>
                {item.s !== 4 && (
                  <div
                    className={`step-line ${step > item.s ? "done" : ""}`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          <div
            className="two-col"
            style={{ gridTemplateColumns: "1fr 380px", gap: "24px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {step === 1 && (
                <div className="card" style={{ padding: "24px" }}>
                  <div className="card-title" style={{ marginBottom: "20px" }}>
                    Detail Kondisi Uang
                  </div>
                  <div className="form-group">
                    <label className="form-label">Jenis Kerusakan</label>
                    <div className="chip-group">
                      {jenisKerusakan.map((j) => (
                        <div
                          key={j}
                          className={`chip ${activeKerusakan === j ? "active" : ""}`}
                          onClick={() => setActiveKerusakan(j)}
                        >
                          {j}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: "20px" }}>
                    <div className="form-group">
                      <label className="form-label">Nominal Rupiah</label>
                      <input
                        className="form-input"
                        placeholder="Rp 100,000"
                        value={nominal}
                        onChange={handleNominalChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Jumlah Lembar</label>
                      <input
                        className="form-input"
                        placeholder="5"
                        value={jumlah}
                        onChange={handleJumlahChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="card" style={{ padding: "24px" }}>
                  <div className="card-title">Lokasi & Jadwal Penukaran</div>

                  {/* TAMBAHAN: Dropdown Lokasi yang ditentukan BI */}
                  <div className="form-group" style={{ margin: "16px 0" }}>
                    <label className="form-label">Titik Lokasi Penukaran</label>
                    <select
                      className="form-input"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      style={{ background: "var(--bg3)" }}
                    >
                      <option value="">-- Pilih Lokasi Terdekat --</option>
                      {daftarLokasiBI.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Tanggal Kedatangan</label>
                      <input
                        type="date"
                        className="form-input"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sesi Waktu</label>
                      <select
                        className="form-input"
                        value={sesi}
                        onChange={(e) => setSesi(e.target.value)}
                        style={{ background: "var(--bg3)" }}
                      >
                        <option>Sesi 1 (09:00 - 11:00)</option>
                        <option>Sesi 2 (11:00 - 13:00)</option>
                        <option>Sesi 3 (13:00 - 15:00)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div
                  className="card"
                  style={{
                    padding: "24px",
                    border: "1px solid var(--green)",
                    background: "var(--green-bg)",
                  }}
                >
                  <div className="card-title" style={{ color: "var(--green)" }}>
                    Ringkasan Laporan
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px",
                      marginTop: "16px",
                    }}
                  >
                    <div>
                      <small style={{ color: "var(--text3)" }}>JENIS</small>
                      <p>{activeKerusakan}</p>
                    </div>
                    <div>
                      <small style={{ color: "var(--text3)" }}>NOMINAL</small>
                      <p>Rp {Number(nominal).toLocaleString("id-ID")}</p>
                    </div>
                    <div>
                      <small style={{ color: "var(--text3)" }}>LOKASI</small>
                      <p>{lokasi}</p>
                    </div>
                    <div>
                      <small style={{ color: "var(--text3)" }}>JADWAL</small>
                      <p>
                        {tanggal} ({sesi.split(" ")[1]})
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: "sticky", top: "24px" }}>
              <div className="card" style={{ padding: "24px" }}>
                <div className="card-title">Foto Bukti Uang</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div
                  className="upload-drop"
                  style={{
                    borderColor: fotoFile ? "var(--green)" : "var(--border2)",
                    background: fotoFile
                      ? "rgba(16, 185, 129, 0.1)"
                      : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <div style={{ fontSize: "24px" }}>
                    {fotoFile ? "✅" : "📸"}
                  </div>
                  <div style={{ fontSize: "13px" }}>
                    {fotoFile ? fotoFile.name : "Ambil/Upload Foto"}
                  </div>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "var(--text3)",
                      marginTop: "4px",
                    }}
                  >
                    Wajib terlihat nomor seri uang
                  </p>
                </div>
              </div>

              <div
                className="card"
                style={{ padding: "20px", marginTop: "20px" }}
              >
                {errorMsg && (
                  <div
                    style={{
                      color: "var(--red)",
                      background: "var(--red-bg)",
                      padding: "10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    {errorMsg}
                  </div>
                )}
                <button
                  className="btn btn-primary"
                  onClick={lanjutLangkah}
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {step === 4
                    ? "Kirim Laporan BI"
                    : "Lanjut Tahap Berikutnya →"}
                </button>
                {step > 1 && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setStep(step - 1)}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      border: "none",
                      justifyContent: "center",
                    }}
                  >
                    Kembali
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
