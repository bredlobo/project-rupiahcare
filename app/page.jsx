"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// --- TAMBAHAN WAJIB ---
import api from '@/lib/axios'; 
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(''); 
  const [sandi, setSandi] = useState('');
  const [showSandi, setShowSandi] = useState(false);
  const router = useRouter();

  // --- LOGIKA BARU TANPA MENGUBAH IDENTIFIER ---
const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post("/login", { 
        email: identifier, 
        sandi: sandi 
      });
      
      const { token, role, nama } = res.data;

      Cookies.set("token", token);
      Cookies.set("role", role);
      Cookies.set("namaUser", nama);

      if (role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/upload'); 
      }

    } catch (err) {
      const pesanError = err.response?.data?.error || "Gagal masuk! Cek koneksi server.";
      alert(pesanError); 
    }
  };
  
  const handleForgotPassword = () => {
    const email = prompt("Masukkan Email atau NIK Anda untuk pemulihan akun:");
    if (email) alert(`Instruksi pemulihan telah dikirim ke: ${email}`);
  };

  // --- SELURUH UI DI BAWAH INI ADALAH KODE ASLI KAMU (TIDAK ADA YANG DIHAPUS) ---
  return (
    <>
      <div className="outer-tabs">
        <Link href="/" className="outer-tab active">🔐 Login</Link>
        <Link href="/register" className="outer-tab">📝 Daftar</Link>
      </div>

      <div className="login-shell">
        <div className="login-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
            <div className="sb-circle">RC</div>
            <div>
              <div className="sb-name">RupiahCare</div>
              <div className="sb-tag">Bank Indonesia NTT</div>
            </div>
          </div>
          <h1 className="login-tagline">Selamat Datang <span>Kembali.</span></h1>
          <p className="login-desc">Masuk untuk mengelola laporan penukaran uang Anda dan memantau status verifikasi secara real-time di wilayah NTT.</p>
          
          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <div className="login-feat"><div className="feat-dot"></div><div className="feat-text">Koneksi aman terenkripsi SSL</div></div>
             <div className="login-feat"><div className="feat-dot"></div><div className="feat-text">Akses langsung ke pusat bantuan BI</div></div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-box">
            <div className="login-title">Masuk ke Akun</div>
            <div className="login-sub">Masukkan kredensial Anda untuk melanjutkan</div>
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email / NIK</label>
                <input 
                  className="form-input" 
                  placeholder="el@gmail.com atau NIK" 
                  type="text" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group" style={{ position: 'relative' }}>
                <label className="form-label">Kata Sandi</label>
                <input 
                  className="form-input" 
                  placeholder="Masukkan kata sandi" 
                  type={showSandi ? "text" : "password"} 
                  value={sandi}
                  onChange={(e) => setSandi(e.target.value)}
                  required 
                />
                <span 
                  onClick={() => setShowSandi(!showSandi)} 
                  style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer', fontSize: '14px' }}
                >
                  {showSandi ? '🙈' : '👁️'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text2)', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--green)' }} /> Ingat saya
                </label>
                <span onClick={handleForgotPassword} style={{ fontSize: '12px', color: 'var(--green)', fontWeight: '600', cursor: 'pointer' }}>
                  Lupa sandi?
                </span>
              </div>
              
              <button type="submit" className="btn-full">Masuk Sekarang</button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>Atau masuk dengan</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            </div>

            <button type="button" className="btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '12px' }}>
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" width="18" alt="Google" />
              Google Account
            </button>

            <div className="switch-text">Belum punya akun? <Link href="/register">Daftar di sini</Link></div>
          </div>
        </div>
      </div>
    </>
  );
}