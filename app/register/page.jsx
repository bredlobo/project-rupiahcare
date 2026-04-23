import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      {/* Tab Navigasi Atas */}
      <div className="outer-tabs">
        <Link href="/" className="outer-tab">🔐 Login</Link>
        <Link href="/register" className="outer-tab active">📝 Daftar</Link>
        <Link href="/dashboard" className="outer-tab">📊 Dashboard Admin</Link>
        <Link href="/upload" className="outer-tab">📤 Upload Laporan</Link>
        <Link href="/tracking" className="outer-tab">📦 Tracking</Link>
      </div>

      <div className="login-shell">
        {/* Bagian Kiri: Informasi Informasi */}
        <div className="login-left">
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px'}}>
            <div className="sb-circle">RC</div>
            <div>
              <div className="sb-name">RupiahCare</div>
              <div className="sb-tag">Bank Indonesia</div>
            </div>
          </div>
          <div className="login-tagline">Bergabung bersama <span>400 ribu+</span> pengguna aktif</div>
          <p className="login-desc">Daftarkan diri dan mulai proses penukaran uang tidak layak edar dengan lebih mudah, cepat, dan terpercaya.</p>
          
          <div style={{marginTop: '32px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px'}}>
            <div style={{fontSize: '12px', fontWeight: '700', color: 'var(--text3)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '14px'}}>Data yang diperlukan</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)'}}></div><div style={{fontSize: '13px', color: 'var(--text2)'}}>NIK (Nomor Induk Kependudukan)</div></div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)'}}></div><div style={{fontSize: '13px', color: 'var(--text2)'}}>Nama lengkap sesuai KTP</div></div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><div style={{width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)'}}></div><div style={{fontSize: '13px', color: 'var(--text2)'}}>Nomor HP aktif untuk OTP</div></div>
            </div>
          </div>
        </div>

        {/* Bagian Kanan: Formulir Input */}
        <div className="login-right">
          <div className="login-box">
            <div className="login-title">Buat akun baru</div>
            <div className="login-sub">Daftar sebagai masyarakat umum</div>
            
            <div className="form-row">
              <div className="form-group"><label className="form-label">Nama Depan</label><input className="form-input" placeholder="Budi" type="text" /></div>
              <div className="form-group"><label className="form-label">Nama Belakang</label><input className="form-input" placeholder="Santoso" type="text" /></div>
            </div>
            
            <div className="form-group"><label className="form-label">NIK (16 Digit)</label><input className="form-input" placeholder="3273010101900001" type="text" maxLength="16" /></div>
            <div className="form-group"><label className="form-label">Nomor HP</label><input className="form-input" placeholder="+62 812..." type="tel" /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="budi@email.com" type="email" /></div>
            
            <div className="form-row">
              <div className="form-group"><label className="form-label">Kata Sandi</label><input className="form-input" placeholder="Min. 8 karakter" type="password" /></div>
              <div className="form-group"><label className="form-label">Konfirmasi</label><input className="form-input" placeholder="Ulangi sandi" type="password" /></div>
            </div>
            
            <button className="btn-full" style={{marginTop: '4px'}}>Daftar & Verifikasi OTP →</button>
            <div className="switch-text">Sudah punya akun? <Link href="/">Masuk di sini</Link></div>
          </div>
        </div>
      </div>
    </>
  );
}