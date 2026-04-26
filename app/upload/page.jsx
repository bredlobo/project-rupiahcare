"use client";
import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function UploadPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  
  // STATE DATA FORM
  const [activeKerusakan, setActiveKerusakan] = useState('Sobek');
  const jenisKerusakan = ['Sobek', 'Lusuh / Pudar', 'Terbakar', 'Berlubang', 'Basah / Berjamur', 'Koin Langka'];
  const [nominal, setNominal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [catatan, setCatatan] = useState('');
  const [isFotoUploaded, setIsFotoUploaded] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [sesi, setSesi] = useState('Sesi 1 (09:00 - 11:00)');

  // STATE KONTROL UI
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  // 1. FUNGSI GENERATOR NOMOR TIKET
  const generateTicket = () => {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, ""); 
    const randomPart = Math.floor(1000 + Math.random() * 9000); 
    return `RC-${datePart}-${randomPart}`;
  };

  // 2. HANDLER INPUT
  const handleNominalChange = (e) => {
    setNominal(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleJumlahChange = (e) => {
    setJumlah(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleUploadClick = () => {
    setIsFotoUploaded(true);
    setErrorMsg('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ticketNumber);
    alert("Nomor tiket berhasil disalin!");
  };

  // 3. LOGIKA VALIDASI PER TAHAP
  const lanjutLangkah = () => {
    setErrorMsg('');

    if (step === 1) {
      if (!nominal || !jumlah) {
        setErrorMsg('⚠️ Mohon isi Nominal dan Jumlah lembar terlebih dahulu!');
        return;
      }
    } 
    else if (step === 2) {
      if (!isFotoUploaded) {
        setErrorMsg('⚠️ Mohon upload foto bukti uang (Klik kotak di kanan)!');
        return;
      }
    }
    else if (step === 3) {
      if (!tanggal) {
        setErrorMsg('⚠️ Mohon tentukan tanggal kedatangan Anda!');
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    } else {
      // PROSES FINAL (KIRIM)
      const newTicket = generateTicket();
      setTicketNumber(newTicket);
      setIsSuccess(true);
    }
  };

  // --- TAMPILAN JIKA BERHASIL ---
  if (isSuccess) {
    return (
      <div className="shell">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} role="user" />
        <div className="main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg1)' }}>
          <div className="card" style={{ maxWidth: '480px', textAlign: 'center', padding: '40px', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
            <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Laporan Terkirim!</h1>
            <p style={{ color: 'var(--text3)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
              Terima kasih telah berkontribusi menjaga kualitas Rupiah. Simpan tiket ini untuk dibawa ke lokasi penukaran.
            </p>

            <div style={{ background: 'var(--bg3)', padding: '20px', borderRadius: '12px', border: '1px dashed var(--green)', marginBottom: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', marginBottom: '8px' }}>Nomor Tiket Anda</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--green)', letterSpacing: '2px' }}>{ticketNumber}</div>
              <button onClick={copyToClipboard} style={{ marginTop: '12px', background: 'none', border: 'none', color: 'var(--text3)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                📋 Salin Nomor Tiket
              </button>
            </div>
            
            <p style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '32px' }}>* Bukti ini juga tersedia di riwayat akun Anda.</p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-outline" onClick={() => window.print()} style={{ flex: 1, justifyContent: 'center' }}>Cetak PDF</button>
              <button className="btn btn-primary" onClick={() => window.location.href = '/tracking'} style={{ flex: 1, justifyContent: 'center' }}>Lacak Status</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN FORMULIR ---
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
              <p>Proses pelaporan uang tidak layak edar wilayah NTT</p>
            </div>
          </div>

          {/* PROGRESS STEPS BAR */}
          <div className="progress-steps" style={{ maxWidth: '800px', marginBottom: '40px' }}>
            {[ {s:1, n:'Data Uang'}, {s:2, n:'Foto Bukti'}, {s:3, n:'Lokasi & Waktu'}, {s:4, n:'Konfirmasi'} ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: item.s === 4 ? 'none' : 1 }}>
                <div className={`step ${step > item.s ? 'done' : step === item.s ? 'active' : ''}`}>
                  <div className="step-circle">{step > item.s ? '✓' : item.s}</div>
                  <div className="step-label">{item.n}</div>
                </div>
                {item.s !== 4 && <div className={`step-line ${step > item.s ? 'done' : ''}`}></div>}
              </div>
            ))}
          </div>

          <div className="two-col" style={{ gridTemplateColumns: '1fr 380px', alignItems: 'start', gap: '24px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* STEP 1: DATA UANG */}
              {step === 1 && (
                <div className="card" style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
                  <div className="card-title" style={{ marginBottom: '20px' }}>Detail Kondisi Uang</div>
                  <div className="form-group">
                    <label className="form-label">Jenis Kerusakan</label>
                    <div className="chip-group">
                      {jenisKerusakan.map(j => (
                        <div key={j} className={`chip ${activeKerusakan === j ? 'active' : ''}`} onClick={() => setActiveKerusakan(j)}>{j}</div>
                      ))}
                    </div>
                  </div>
                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Nominal Rupiah</label>
                      <div className="input-with-icon">
                        <span style={{ marginLeft: '12px', color: 'var(--text3)' }}>Rp</span>
                        <input className="form-input" style={{ border: 'none' }} placeholder="Contoh: 100000" value={nominal} onChange={handleNominalChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Jumlah Lembar</label>
                      <input className="form-input" placeholder="Misal: 5" value={jumlah} onChange={handleJumlahChange} />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: LOKASI & WAKTU */}
              {step >= 3 && (
                <div className="card" style={{ padding: '24px', animation: 'fadeIn 0.3s ease' }}>
                  <div className="card-title" style={{ marginBottom: '16px' }}>Lokasi & Jadwal Penukaran</div>
                  <div className="loc-row selected" style={{ marginBottom: '24px' }}>
                    <div className="loc-dot" style={{ background: 'var(--green)' }}></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--green)' }}>Kantor Perwakilan BI Provinsi NTT</div>
                      <div style={{ fontSize: '11px', color: 'var(--text2)' }}>Jl. Tom Pello No.2, Kota Kupang</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Pilih Tanggal Kedatangan</label>
                      <input type="date" className="form-input" value={tanggal} onChange={(e) => setTanggal(e.target.value)} style={{ colorScheme: 'dark' }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pilih Sesi Jam</label>
                      <select className="form-input" value={sesi} onChange={(e) => setSesi(e.target.value)} style={{ background: 'var(--bg3)' }}>
                        <option>Sesi 1 (09:00 - 11:00)</option>
                        <option>Sesi 2 (11:00 - 13:00)</option>
                        <option>Sesi 3 (13:00 - 15:00)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: KONFIRMASI AKHIR */}
              {step === 4 && (
                <div className="card" style={{ padding: '24px', background: 'var(--green-bg)', border: '1px solid var(--green)', animation: 'fadeIn 0.3s ease' }}>
                  <div className="card-title" style={{ color: 'var(--green)', marginBottom: '12px' }}>Ringkasan Laporan</div>
                  <p style={{ fontSize: '13px', marginBottom: '16px' }}>Mohon periksa kembali data Anda sebelum mengirim ke sistem Bank Indonesia.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                    <div><b style={{ color: 'var(--text3)', fontSize: '11px' }}>KERUSAKAN</b><p>{activeKerusakan}</p></div>
                    <div><b style={{ color: 'var(--text3)', fontSize: '11px' }}>NOMINAL</b><p>Rp {parseInt(nominal).toLocaleString('id-ID')}</p></div>
                    <div><b style={{ color: 'var(--text3)', fontSize: '11px' }}>JUMLAH</b><p>{jumlah} Lembar</p></div>
                    <div><b style={{ color: 'var(--text3)', fontSize: '11px' }}>JADWAL</b><p>{tanggal} ({sesi.split(' ')[1]})</p></div>
                  </div>
                </div>
              )}
            </div>

            {/* SISI KANAN: UPLOAD & ACTIONS */}
            <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div className="card-title" style={{ marginBottom: '16px' }}>Foto Bukti Uang</div>
                <div 
                  className="upload-drop" 
                  style={{ 
                    borderColor: isFotoUploaded ? 'var(--green)' : 'var(--border2)',
                    background: isFotoUploaded ? 'var(--green-bg)' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={handleUploadClick}
                >
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{isFotoUploaded ? '✅' : '📸'}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{isFotoUploaded ? 'Foto Tersimpan' : 'Ambil/Upload Foto'}</div>
                  <p style={{ fontSize: '10px', color: 'var(--text3)', marginTop: '4px' }}>Wajib terlihat nomor seri uang</p>
                </div>
              </div>

              <div className="card" style={{ padding: '20px' }}>
                {errorMsg && <div style={{ color: 'var(--red)', background: 'var(--red-bg)', padding: '10px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px', border: '1px solid var(--red)' }}>{errorMsg}</div>}
                
                <button className="btn btn-primary" onClick={lanjutLangkah} style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
                  {step === 4 ? 'Kirim Laporan Sekarang' : 'Lanjut Tahap Berikutnya →'}
                </button>
                
                {step > 1 && (
                  <button className="btn btn-outline" onClick={() => setStep(step - 1)} style={{ width: '100%', justifyContent: 'center', marginTop: '10px', border: 'none' }}>
                    Kembali ke Tahap Sebelumnya
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