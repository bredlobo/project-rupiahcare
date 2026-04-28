"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Tambahkan ini untuk pindah halaman
import api from "@/lib/axios"; // Import jembatan ke Go

export default function RegisterPage() {
  const router = useRouter();

  // 1. STATE MANAGEMENT
  const [formData, setFormData] = useState({
    namaDepan: "",
    namaBelakang: "",
    NIK: "",
    noHP: "",
    email: "",
    sandi: "",
    konfirmasi: "",
  });

  const [showSandi, setShowSandi] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading tombol

  // 2. HANDLER INPUT
  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "NIK" || name === "noHP") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 3. LOGIKA PENDAFTARAN (Koneksi ke Backend Go)
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi Sederhana
    if (formData.NIK.length !== 16) {
      setError("⚠️ NIK harus tepat 16 digit!");
      return;
    }
    if (formData.sandi.length < 8) {
      setError("⚠️ Kata sandi minimal 8 karakter!");
      return;
    }
    if (formData.sandi !== formData.konfirmasi) {
      setError("⚠️ Konfirmasi kata sandi tidak cocok!");
      return;
    }

    setLoading(true);

    try {
      // KIRIM KE BACKEND GO
      const res = await api.post("/register", {
        nama_lengkap: `${formData.namaDepan} ${formData.namaBelakang}`,
        email: formData.email,
        no_hp: formData.noHP,
        nik: formData.NIK,
        sandi: formData.sandi,
      });

      // Jika Sukses (Gunakan pesan asli dari Go)
      alert(res.data.message || "Pendaftaran Berhasil!");
      router.push("/"); // Pindahkan user ke halaman Login
    } catch (err) {
      // Jika Gagal (Misal NIK sudah terdaftar)
      const pesanError =
        err.response?.data?.error || "Pendaftaran gagal, cek koneksi server.";
      setError(`❌ ${pesanError}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="outer-tabs">
        <Link href="/" className="outer-tab">
          🔐 Login
        </Link>
        <Link href="/register" className="outer-tab active">
          📝 Daftar
        </Link>
      </div>

      <div className="login-shell">
        <div className="login-left">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "36px",
            }}
          >
            <div className="sb-circle">RC</div>
            <div>
              <div className="sb-name">RupiahCare</div>
              <div className="sb-tag">Bank Indonesia</div>
            </div>
          </div>
          <div className="login-tagline">
            Bergabung bersama <span>Pejuang Rupiah</span> NTT
          </div>
          <p className="login-desc">
            Daftarkan diri Anda untuk mempermudah proses penukaran uang tidak
            layak edar melalui layanan resmi BI.
          </p>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-title">Buat Akun Baru</div>
            <div className="login-sub">Silakan lengkapi data diri Anda</div>

            {error && (
              <div
                style={{
                  background: "var(--red-bg)",
                  color: "var(--red)",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  marginBottom: "16px",
                  border: "1px solid var(--red)",
                  fontWeight: "600",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Depan</label>
                  <input
                    type="text"
                    name="namaDepan"
                    className="form-input"
                    placeholder="Budi"
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nama Belakang</label>
                  <input
                    type="text"
                    name="namaBelakang"
                    className="form-input"
                    placeholder="Santoso"
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">NIK (16 Digit)</label>
                <input
                  type="text"
                  name="NIK"
                  className="form-input"
                  placeholder="3273..."
                  maxLength="16"
                  value={formData.NIK}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor HP</label>
                <input
                  type="text"
                  name="noHP"
                  className="form-input"
                  placeholder="0812..."
                  value={formData.noHP}
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="budi@email.com"
                  onChange={handleInput}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ position: "relative" }}>
                  <label className="form-label">Kata Sandi</label>
                  <input
                    type={showSandi ? "text" : "password"}
                    name="sandi"
                    className="form-input"
                    placeholder="Min. 8 Karakter"
                    onChange={handleInput}
                    required
                  />
                  <span
                    onClick={() => setShowSandi(!showSandi)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      bottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {showSandi ? "🙈" : "👁️"}
                  </span>
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <label className="form-label">Konfirmasi</label>
                  <input
                    type={showKonfirmasi ? "text" : "password"}
                    name="konfirmasi"
                    className="form-input"
                    placeholder="Ulangi sandi"
                    onChange={handleInput}
                    required
                  />
                  <span
                    onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      bottom: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {showKonfirmasi ? "🙈" : "👁️"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn-full"
                style={{ marginTop: "10px" }}
                disabled={loading}
              >
                {loading ? "Memproses..." : "Daftar Sekarang →"}
              </button>
            </form>

            <div className="switch-text">
              Sudah punya akun? <Link href="/">Masuk di sini</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
