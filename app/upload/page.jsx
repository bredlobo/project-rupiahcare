"use client";
import { useState, useEffect, useRef } from 'react';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import api from '@/lib/axios'; // Import jembatan API
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef(null); // Ref untuk input file tersembunyi
  
  // STATE KONTROL AKSES
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // STATE DATA FORM
  const [step, setStep] = useState(1);
  const [activeKerusakan, setActiveKerusakan] = useState('Sobek');
  const jenisKerusakan = ['Sobek', 'Lusuh / Pudar', 'Terbakar', 'Berlubang', 'Basah / Berjamur', 'Koin Langka'];
  const [nominal, setNominal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [catatan, setCatatan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [sesi, setSesi] = useState('Sesi 1 (09:00 - 11:00)');
  
  // STATE FILE & SUCCESS
  const [fotoFile, setFotoFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  // 1. SATPAM: KUNCI PINTU (PROTECTION)
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push('/'); // Tendang ke login jika tidak ada token
    } else {
      setLoading(false);
    }
  }, [router]);

  // 2. HANDLER FILE UPLOAD
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setErrorMsg('');
    }
  };

  const handleNominalChange = (e) => {
    setNominal(e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleJumlahChange = (e) => {
    setJumlah(e.target.value.replace(/[^0-9]/g, ''));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ticketNumber);
    alert("Nomor tiket berhasil disalin!");
  };

  // 3. LOGIKA LANJUT & KIRIM KE BACKEND
  const lanjutLangkah = async () => {
    setErrorMsg('');

    if (step === 1) {
      if (!nominal || !jumlah) {
        setErrorMsg('⚠️ Mohon isi Nominal dan Jumlah lembar terlebih dahulu!');
        return;
      }
    } 
    else if (step === 2) {
      if (!fotoFile) {
        setErrorMsg('⚠️ Mohon upload foto bukti uang!');
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
      // --- PROSES FINAL: KIRIM KE API GO ---
      try {
        const formData = new FormData();
        formData.append('jenis_kerusakan', activeKerusakan);
        formData.append('nominal', nominal);
        formData.append('jumlah', jumlah);
        formData.append('tanggal_penukaran', tanggal);
        formData.append('sesi', sesi);
        formData.append('foto', fotoFile); // Mengirim file asli
        formData.append('catatan', catatan);

        const res = await api.post('/user/lapor', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        setTicketNumber(res.data.ticket_number || "RC-SUCCESS");
        setIsSuccess(true);
      } catch (err) {
        setErrorMsg(err.response?.data?.error || "Gagal mengirim laporan. Cek koneksi server.");
      }
    }
  };

  if (loading) return null; // Cegah flickering saat cek token

  // --- TAMPILAN JIKA BERHASIL ---
  if (isSuccess) {
    return (
      <div className="shell">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} role="user" />
        <div className="main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg1)' }}>
          <div className="card" style={{ maxWidth: '480px', textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
            <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Laporan Terkirim!</h1>
            <p style={{ color: 'var(--text3)', fontSize: '14px', marginBottom: '32px' }}>
              Simpan tiket ini untuk dibawa ke lokasi penukaran di Kantor BI NTT.
            </p>
            <div style={{ background: 'var(--bg3)', padding: '20px', borderRadius: '12px', border: '1px dashed var(--green)', marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text3)', marginBottom: '8px' }}>Nomor Tiket Anda</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--green)' }}>{ticketNumber}</div>
              <button onClick={copyToClipboard} style={{ marginTop: '12px', background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', textDecoration: 'underline' }}>
                Salin Nomor Tiket
              </button>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-outline" onClick={() => window.print()} style={{ flex: 1 }}>Cetak PDF</button>
              <button className="btn btn-primary" onClick={() => router.push('/tracking')} style={{ flex: 1 }}>Lacak Status</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shell">
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} role="user" />
      
      <div className="main">
        <Topbar title="Buat Laporan Baru" toggleSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="content-area">
          <div className="page-head" style={{ marginBottom: '32px' }}>
            <h1>Buat Laporan Baru</h1>
            <p>Proses pelaporan uang tidak layak edar wilayah NTT</p>
          </div>

          {/* PROGRESS BAR */}
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

          <div className="two-col" style={{ gridTemplateColumns: '1fr 380px', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {step === 1 && (
                <div className="card" style={{ padding: '24px' }}>
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
                      <input className="form-input" placeholder="Rp 100,000" value={nominal} onChange={handleNominalChange} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Jumlah Lembar</label>
                      <input className="form-input" placeholder="5" value={jumlah} onChange={handleJumlahChange} />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="card" style={{ padding: '24px' }}>
                  <div className="card-title">Lokasi & Jadwal Penukaran</div>
                  <div className="loc-row selected" style={{ margin: '16px 0' }}>
                    <div className="loc-dot"></div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>KPw BI Provinsi NTT</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>Jl. Tom Pello No.2, Kupang</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <input type="date" className="form-input" value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                    <select className="form-input" value={sesi} onChange={(e) => setSesi(e.target.value)}>
                      <option>Sesi 1 (09:00 - 11:00)</option>
                      <option>Sesi 2 (11:00 - 13:00)</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="card" style={{ padding: '24px', border: '1px solid var(--green)' }}>
                  <div className="card-title" style={{ color: 'var(--green)' }}>Ringkasan Laporan</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                    <div><small>JENIS</small><p>{activeKerusakan}</p></div>
                    <div><small>NOMINAL</small><p>Rp {parseInt(nominal).toLocaleString('id-ID')}</p></div>
                    <div><small>JUMLAH</small><p>{jumlah} Lembar</p></div>
                    <div><small>JADWAL</small><p>{tanggal}</p></div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', top: '24px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div className="card-title">Foto Bukti Uang</div>
                
                {/* INPUT FILE TERSEMBUNYI */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />

                <div 
                  className="upload-drop" 
                  style={{ 
                    borderColor: fotoFile ? 'var(--green)' : 'var(--border2)',
                    background: fotoFile ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    cursor: 'pointer'
                  }}
                  onClick={() => fileInputRef.current.click()}
                >
                  <div>{fotoFile ? '✅' : '📸'}</div>
                  <div style={{ fontSize: '13px' }}>{fotoFile ? fotoFile.name : 'Ambil/Upload Foto'}</div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
                {errorMsg && <div className="error-alert">{errorMsg}</div>}
                <button className="btn btn-primary" onClick={lanjutLangkah} style={{ width: '100%' }}>
                  {step === 4 ? 'Kirim Laporan BI' : 'Lanjut Tahap Berikutnya →'}
                </button>
                {step > 1 && (
                  <button className="btn btn-outline" onClick={() => setStep(step - 1)} style={{ width: '100%', marginTop: '10px' }}>
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