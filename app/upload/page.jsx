"use client";
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function UploadPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [activeKerusakan, setActiveKerusakan] = useState('Sobek');
  const jenisKerusakan = ['Sobek', 'Lusuh / Pudar', 'Terbakar', 'Berlubang', 'Basah / Berjamur', 'Koin Langka'];

  const [nominal, setNominal] = useState('');
  const [jumlah, setJumlah] = useState('');
  
  // STATE BARU: Untuk mengecek apakah foto sudah diupload & pesan error
  const [isFotoUploaded, setIsFotoUploaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNominalChange = (e) => {
    const hanyaAngka = e.target.value.replace(/[^0-9]/g, '');
    setNominal(hanyaAngka);
  };

  const handleJumlahChange = (e) => {
    const hanyaAngka = e.target.value.replace(/[^0-9]/g, '');
    setJumlah(hanyaAngka);
  };

  // LOGIKA VALIDASI SEBELUM LANJUT TAHAP
  const lanjutLangkah = () => {
    setErrorMsg(''); // Hapus pesan error sebelumnya

    if (step === 1) {
      if (!nominal || !jumlah) {
        setErrorMsg('⚠️ Mohon isi Nominal dan Jumlah lembar terlebih dahulu!');
        return; // Berhenti, jangan ubah step
      }
    } 
    else if (step === 2) {
      if (!isFotoUploaded) {
        setErrorMsg('⚠️ Mohon upload foto bukti uang (Klik kotak upload di atas)!');
        return; // Berhenti, jangan ubah step
      }
    }
    // Step 3 (Lokasi) otomatis lolos karena sudah ada default yang terpilih

    if (step < 4) setStep(step + 1);
  };

  // Fungsi simulasi saat kotak upload diklik
  const handleUploadClick = () => {
    setIsFotoUploaded(true);
    setErrorMsg(''); // Langsung hapus error jika user sudah upload
  };

  return (
    <div className="shell">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} role="user" />
      
      <div className="main">
        <Topbar title="Buat Laporan Baru" toggleSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="content-area">
          <div className="page-head" style={{ marginBottom: '32px' }}>
            <div className="page-head-left">
              <h1>Buat Laporan Baru</h1>
              <p>Isi formulir di bawah untuk melaporkan uang tidak layak edar</p>
            </div>
          </div>

          <div className="progress-steps" style={{ maxWidth: '800px', marginBottom: '32px' }}>
            <div className={`step ${step > 1 ? 'done' : step === 1 ? 'active' : ''}`}>
              <div className="step-circle">{step > 1 ? '✓' : '1'}</div>
              <div className="step-label">Data Uang</div>
            </div>
            <div className={`step-line ${step > 1 ? 'done' : ''}`}></div>

            <div className={`step ${step > 2 ? 'done' : step === 2 ? 'active' : ''}`}>
              <div className="step-circle">{step > 2 ? '✓' : '2'}</div>
              <div className="step-label">Foto Bukti</div>
            </div>
            <div className={`step-line ${step > 2 ? 'done' : ''}`}></div>

            <div className={`step ${step > 3 ? 'done' : step === 3 ? 'active' : ''}`}>
              <div className="step-circle">{step > 3 ? '✓' : '3'}</div>
              <div className="step-label">Lokasi</div>
            </div>
            <div className={`step-line ${step > 3 ? 'done' : ''}`}></div>

            <div className={`step ${step === 4 ? 'active' : ''}`}>
              <div className="step-circle">{step === 4 ? '✓' : '4'}</div>
              <div className="step-label">Konfirmasi</div>
            </div>
          </div>

          <div className="two-col" style={{ gridTemplateColumns: '1fr 380px', alignItems: 'start' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div className="card-title" style={{ marginBottom: '16px' }}>Detail Uang</div>
                
                <div className="form-group">
                  <label className="form-label">Jenis Kerusakan</label>
                  <div className="chip-group">
                    {jenisKerusakan.map(jenis => (
                      <div 
                        key={jenis} 
                        className={`chip ${activeKerusakan === jenis ? 'active' : ''}`}
                        onClick={() => setActiveKerusakan(jenis)}
                      >
                        {jenis}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Nominal (Tanpa titik)</label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '9px', padding: '0 14px' }}>
                      <span style={{ color: 'var(--text3)', fontSize: '14px', marginRight: '8px' }}>Rp</span>
                      <input 
                        className="form-input" 
                        placeholder="100000" 
                        value={nominal}
                        onChange={handleNominalChange}
                        style={{ border: 'none', padding: '11px 0', background: 'transparent', outline: 'none', flex: 1 }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Jumlah Lembar/Keping</label>
                    <input 
                      className="form-input" 
                      placeholder="Misal: 3" 
                      value={jumlah}
                      onChange={handleJumlahChange}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Catatan Tambahan</label>
                  <textarea className="form-input" placeholder="Opsional — ceritakan kondisi uang..." style={{ minHeight: '80px', resize: 'vertical' }}></textarea>
                </div>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div className="card-title" style={{ marginBottom: '16px' }}>Pilih Lokasi Penukaran</div>
                <div className="map-box" style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '24px', color: 'var(--green)' }}>📍</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Deteksi lokasi otomatis</div>
                </div>
                <div className="loc-row selected">
                  <div className="loc-dot" style={{ background: 'var(--green)' }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--green)' }}>Kas Keliling BI — Alun-alun Bandung</div>
                    <div style={{ fontSize: '11px', color: 'var(--text2)' }}>0.8 km</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div className="card-title" style={{ marginBottom: '20px' }}>Upload Foto Uang</div>
              
              {/* KOTAK UPLOAD INTERAKTIF */}
              <div 
                className="upload-drop" 
                style={{ 
                  marginBottom: '20px', 
                  borderColor: isFotoUploaded ? 'var(--green)' : 'var(--border2)',
                  background: isFotoUploaded ? 'var(--green-bg)' : 'rgba(255, 255, 255, 0.01)'
                }}
                onClick={handleUploadClick}
              >
                <div className="upload-icon-wrap" style={{ marginBottom: '16px', background: isFotoUploaded ? 'var(--green-bg)' : 'var(--bg3)' }}>
                  <span style={{ fontSize: '20px' }}>{isFotoUploaded ? '✅' : '📤'}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: isFotoUploaded ? 'var(--green)' : 'var(--text)', marginBottom: '6px' }}>
                  {isFotoUploaded ? 'Foto Berhasil Diunggah!' : 'Seret & lepas foto di sini'}
                </div>
                {!isFotoUploaded && <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '20px' }}>JPG, PNG — maks. 5MB per file</div>}
                <button className={`btn ${isFotoUploaded ? 'btn-primary' : 'btn-outline'}`} style={{ fontSize: '12px', padding: '8px 16px' }}>
                  {isFotoUploaded ? 'Ganti Foto' : 'Pilih dari Galeri'}
                </button>
              </div>

              <div style={{ marginTop: 'auto' }}>
                {/* PESAN ERROR MUNCUL DI SINI JIKA ADA */}
                {errorMsg && (
                  <div style={{ color: 'var(--red)', background: 'var(--red-bg)', padding: '12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', textAlign: 'center', marginBottom: '16px', border: '1px solid var(--red)' }}>
                    {errorMsg}
                  </div>
                )}

                <button 
                  className="btn btn-primary" 
                  onClick={lanjutLangkah}
                  style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '14px' }}
                >
                  {step === 4 ? 'Kirim Laporan Sekarang' : 'Lanjut Tahap Berikutnya →'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}