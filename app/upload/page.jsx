"use client";

export default function UploadPage() {
  return (
    <>
      <div className="page-head">
        <div className="page-head-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div className="sb-circle" style={{ width: '32px', height: '32px' }}>RC</div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text2)' }}>RupiahCare</span>
          </div>
          <h1>Buat Laporan Baru</h1>
          <p>Isi formulir di bawah untuk melaporkan uang tidak layak edar</p>
        </div>
      </div>

      <div className="progress-steps" style={{ marginBottom: '30px' }}>
        <div className="step done"><div className="step-circle">✓</div><div className="step-label">Data Uang</div></div>
        <div className="step-line done"></div>
        <div className="step active"><div className="step-circle">2</div><div className="step-label">Foto Bukti</div></div>
        <div className="step-line"></div>
        <div className="step"><div className="step-circle">3</div><div className="step-label">Lokasi</div></div>
        <div className="step-line"></div>
        <div className="step"><div className="step-circle">4</div><div className="step-label">Konfirmasi</div></div>
      </div>

      <div className="two-col">
        {/* Kolom Kiri: Form Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ padding: '20px' }}>
            <div className="card-title">Detail Uang</div>
            <div className="form-group" style={{ marginTop: '15px' }}>
              <label className="form-label">Jenis Kerusakan</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <div className="chip active">Sobek</div>
                <div className="chip">Lusuh / Pudar</div>
                <div className="chip">Terbakar</div>
                <div className="chip">Berlubang</div>
              </div>
            </div>
            <div className="form-row" style={{ marginTop: '15px' }}>
              <div className="form-group"><label className="form-label">Nominal</label><input className="form-input" placeholder="Rp 100.000" /></div>
              <div className="form-group"><label className="form-label">Jumlah</label><input className="form-input" placeholder="3" /></div>
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div className="card-title">Pilih Lokasi Penukaran</div>
            <div style={{ background: 'var(--bg3)', borderRadius: '12px', padding: '16px', marginTop: '15px', textAlign: 'center' }}>
              <div style={{ color: 'var(--green)', fontSize: '20px', marginBottom: '8px' }}>📍</div>
              <div style={{ fontSize: '13px', color: 'var(--text2)', fontWeight: '600' }}>Deteksi lokasi otomatis</div>
              <div style={{ fontSize: '11px', color: 'var(--text3)' }}>Izinkan akses GPS untuk titik terdekat</div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Upload Foto */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="card-title">Upload Foto Uang</div>
          <div className="upload-drop" style={{ margin: '15px 0', height: '180px' }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📤</div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Seret & lepas foto di sini</div>
            <div style={{ fontSize: '11px', color: 'var(--text3)' }}>JPG, PNG — maks. 5MB per file</div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>Kirim Laporan →</button>
        </div>
      </div>
    </>
  );
}