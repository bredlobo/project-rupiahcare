import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="outer-tabs">
        <Link href="/" className="outer-tab active">🔐 Login</Link>
        <Link href="/register" className="outer-tab">📝 Daftar</Link>
        <Link href="/dashboard" className="outer-tab">📊 Dashboard Admin</Link>
        <Link href="/upload" className="outer-tab">📤 Upload Laporan</Link>
        <Link href="/tracking" className="outer-tab">📦 Tracking</Link>
      </div>

      <div className="login-shell">
        <div className="login-left">
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px'}}>
            <div className="sb-circle">RC</div>
            <div>
              <div className="sb-name">RupiahCare</div>
              <div className="sb-tag">Bank Indonesia</div>
            </div>
          </div>
          <div className="login-tagline">Laporkan uang <span>tidak layak edar</span> dengan mudah</div>
          <div className="login-desc">Platform resmi Bank Indonesia untuk masyarakat melaporkan, mengumpulkan, dan menukar uang rusak serta koin ke titik penukaran terdekat.</div>
          <div className="login-features">
            <div className="login-feat"><div className="feat-dot"></div><div className="feat-text">Upload foto uang rusak secara digital</div></div>
            <div className="login-feat"><div className="feat-dot"></div><div className="feat-text">Temukan titik penukaran Bank Indonesia terdekat</div></div>
            <div className="login-feat"><div className="feat-dot"></div><div className="feat-text">Pantau status pengajuan penukaran secara real-time</div></div>
            <div className="login-feat"><div className="feat-dot"></div><div className="feat-text">Aman, terverifikasi, dan resmi dari Bank Indonesia</div></div>
          </div>
          <div style={{marginTop: '40px', paddingTop: '28px', borderTop: '1px solid var(--border)', display: 'flex', gap: '28px'}}>
            <div><div style={{fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: '600', color: 'var(--green)'}}>47K+</div><div style={{fontSize: '11px', color: 'var(--text3)', marginTop: '2px'}}>Laporan masuk</div></div>
            <div><div style={{fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: '600', color: 'var(--blue)'}}>38K+</div><div style={{fontSize: '11px', color: 'var(--text3)', marginTop: '2px'}}>Berhasil ditukar</div></div>
            <div><div style={{fontFamily: "'Fraunces', serif", fontSize: '24px', fontWeight: '600', color: 'var(--amber)'}}>500+</div><div style={{fontSize: '11px', color: 'var(--text3)', marginTop: '2px'}}>Titik penukaran</div></div>
          </div>
        </div>
        <div className="login-right">
          <div className="login-box">
            <div className="login-title">Selamat datang kembali</div>
            <div className="login-sub">Masuk ke akun RupiahCare Anda</div>
            <div className="form-group"><label className="form-label">Email atau Nomor HP</label><input className="form-input" placeholder="contoh@email.com" type="text" /></div>
            <div className="form-group"><label className="form-label">Kata Sandi</label><input className="form-input" placeholder="Minimal 8 karakter" type="password" /></div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '18px'}}><span style={{fontSize: '12px', color: 'var(--green)', cursor: 'pointer', fontWeight: '600'}}>Lupa kata sandi?</span></div>
            <Link href="/dashboard" className="btn-full">Masuk ke Dashboard →</Link>
            <div className="divider-line">atau masuk dengan</div>
            <button className="btn-google">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Lanjutkan dengan Google
            </button>
            <div className="switch-text">Belum punya akun? <Link href="/register">Daftar sekarang</Link></div>
            <div className="switch-text" style={{marginTop: '8px'}}>Petugas BI? <Link href="/dashboard" style={{color: 'var(--blue)'}}>Login sebagai Admin →</Link></div>
          </div>
        </div>
      </div>
    </>
  );
}