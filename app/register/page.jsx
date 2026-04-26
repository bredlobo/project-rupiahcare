"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  // 1. STATE MANAGEMENT
  const [formData, setFormData] = useState({
    namaDepan: '',
    namaBelakang: '',
    NIK: '',
    noHP: '',
    email: '',
    sandi: '',
    konfirmasi: ''
  });

  const [showSandi, setShowSandi] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [error, setError] = useState('');

  // 2. HANDLER INPUT (Dengan Sanitasi Angka)
  const handleInput = (e) => {
    const { name, value } = e.target;
    
    if (name === 'NIK' || name === 'noHP') {
      // Hanya izinkan angka
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 3. LOGIKA VALIDASI
  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (formData.NIK.length !== 16) {
      setError('⚠️ NIK harus tepat 16 digit!');
      return;
    }
    if (formData.sandi.length < 8) {
      setError('⚠️ Kata sandi minimal 8 karakter!');
      return;
    }
    if (formData.sandi !== formData.konfirmasi) {
      setError('⚠️ Konfirmasi kata sandi tidak cocok!');
      return;
    }

    // Jika sukses
    console.log("Data pendaftaran:", formData);
    alert("✅ Pendaftaran berhasil! Silakan cek OTP di nomor HP Anda.");
  };

  return (
    <>
      {/* Navigasi Tab Luar */}
      <div className="outer-tabs">
        <Link href="/" className="outer-tab">🔐 Login</Link>
        <Link href="/register" className="outer-tab active">📝 Daftar</Link>
        <Link href="/dashboard" className="outer-tab">📊 Dashboard Admin</Link>
        <Link href="/upload" className="outer-tab">📤 Upload Laporan</Link>
        <Link href="/tracking" className="outer-tab">📦 Tracking</Link>
      </div>

      <div className="login-shell">
        {/* SISI KIRI: BRANDING & INFO */}
        <div className="login-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
            <div className="sb-circle">RC</div>
            <div>
              <div className="sb-name">RupiahCare</div>
              <div className="sb-tag">Bank Indonesia</div>
            </div>
          </div>
          <div className="login-tagline">Bergabung bersama <span>400 ribu+</span> warga peduli Rupiah</div>
          <p className="login-desc">Daftarkan diri Anda untuk mempermudah proses penukaran uang tidak layak edar melalui layanan resmi Bank Indonesia.</p>
          
          <div style={{ marginTop: '32px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '1px' }}>Persyaratan Data</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)' }}></div>
                <div style={{ fontSize: '13px', color: 'var(--text2)' }}>NIK sesuai KTP asli</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)' }}></div>
                <div style={{ fontSize: '13px', color: 'var(--text2)' }}>Nomor HP aktif (untuk verifikasi)</div>
              </div>
            </div>
          </div>
        </div>

        {/* SISI KANAN: FORMULIR */}
        <div className="login-right">
          <div className="login-box">
            <div className="login-title">Buat Akun Baru</div>
            <div className="login-sub">Silakan lengkapi data diri Anda</div>

            {/* Error Message */}
            {error && (
              <div style={{ background: 'var(--red-bg)', color: 'var(--red)', padding: '12px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px', border: '1px solid var(--red)', fontWeight: '600' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Nama Depan</label>
                  <input type="text" name="namaDepan" className="form-input" placeholder="Budi" onChange={handleInput} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Nama Belakang</label>
                  <input type="text" name="namaBelakang" className="form-input" placeholder="Santoso" onChange={handleInput} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">NIK (16 Digit)</label>
                <input type="text" name="NIK" className="form-input" placeholder="3273..." maxLength="16" value={formData.NIK} onChange={handleInput} required />
              </div>

              <div className="form-group">
                <label className="form-label">Nomor HP</label>
                <input type="text" name="noHP" className="form-input" placeholder="0812..." value={formData.noHP} onChange={handleInput} required />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-input" placeholder="budi@email.com" onChange={handleInput} required />
              </div>

              <div className="form-row">
                <div className="form-group" style={{ position: 'relative' }}>
                  <label className="form-label">Kata Sandi</label>
                  <input type={showSandi ? "text" : "password"} name="sandi" className="form-input" placeholder="Min. 8 Karakter" onChange={handleInput} required />
                  <span onClick={() => setShowSandi(!showSandi)} style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer', fontSize: '14px' }}>
                    {showSandi ? '🙈' : '👁️'}
                  </span>
                </div>
                <div className="form-group" style={{ position: 'relative' }}>
                  <label className="form-label">Konfirmasi</label>
                  <input type={showKonfirmasi ? "text" : "password"} name="konfirmasi" className="form-input" placeholder="Ulangi sandi" onChange={handleInput} required />
                  <span onClick={() => setShowKonfirmasi(!showKonfirmasi)} style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer', fontSize: '14px' }}>
                    {showKonfirmasi ? '🙈' : '👁️'}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn-full" style={{ marginTop: '10px' }}>Daftar & Verifikasi →</button>
            </form>

            {/* Separator Google */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
              <span style={{ fontSize: '12px', color: 'var(--text3)' }}>Atau daftar dengan</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
            </div>

            <button type="button" className="btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" width="16" alt="google" />
              Google Account
            </button>

            <div className="switch-text">Sudah punya akun? <Link href="/">Masuk di sini</Link></div>
          </div>
        </div>
      </div>
    </>
  );
}