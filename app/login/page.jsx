"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [sandi, setSandi] = useState("");
  const [showSandi, setShowSandi] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. Tembak API Go
      const res = await api.post("/login", {
        email: identifier,
        sandi: sandi,
      });

      // 2. Ambil Token dan Role dari response Backend
      const { token, role } = res.data;

      // 3. Simpan ke Cookies
      Cookies.set("token", token);
      Cookies.set("role", role);

      alert(`Login Berhasil sebagai ${role.toUpperCase()}!`);

      // 4. LOGIKA PENGALIHAN (Biar EL nggak nyasar ke Dashboard)
      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/upload"); // User dialihkan ke halaman Upload Laporan
      }
    } catch (err) {
      const pesanError =
        err.response?.data?.error || "Email/NIK atau Sandi salah!";
      alert(pesanError);
    }
  };

  const handleForgotPassword = () => {
    const email = prompt("Masukkan Email atau NIK untuk pemulihan:");
    if (email) alert(`Instruksi dikirim ke: ${email}`);
  };

  return (
    <div className="login-shell">
      {/* UI Kamu yang sudah keren jangan ada yang dikurangi */}
      <div className="login-right">
        <div className="login-box">
          <div className="login-title">Masuk ke Akun</div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label text-white">Email / NIK</label>
              <input
                className="form-input text-black"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ position: "relative" }}>
              <label className="form-label text-white">Kata Sandi</label>
              <input
                className="form-input text-black"
                type={showSandi ? "text" : "password"}
                value={sandi}
                onChange={(e) => setSandi(e.target.value)}
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
            <button type="submit" className="btn-full">
              Masuk Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
