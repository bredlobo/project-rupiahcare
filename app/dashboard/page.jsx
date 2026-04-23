export default function DashboardOverview() {
  return (
    <>
      <div className="page-head">
        <div className="page-head-left">
          <h1>Selamat pagi, Admin 👋</h1>
          <p>Rabu, 22 April 2026 · Data diperbarui 5 menit lalu</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline">Export Laporan</button>
          <button className="btn btn-primary">+ Tambah Jadwal</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-label">Total Laporan</div>
          <div className="stat-val">1,847</div>
          <div className="stat-change up">↑ 12% dari bulan lalu</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-label">Menunggu Verifikasi</div>
          <div className="stat-val">423</div>
          <div className="stat-change warn">↑ 38 baru hari ini</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-label">Titik Penukaran</div>
          <div className="stat-val">512</div>
          <div className="stat-change up">Seluruh Indonesia</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">Berhasil Ditukar</div>
          <div className="stat-val">984</div>
          <div className="stat-change up">↑ 8% bulan ini</div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <div className="card-title">Laporan Masuk Terbaru</div>
          </div>
          <div style={{ padding: '0 22px 18px' }}>
            <table>
              <thead>
                <tr><th>Pelapor</th><th>Nominal</th><th>Kota</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="td-main">Siti Rahayu</div></td>
                  <td>Rp 150.000</td>
                  <td>Bandung</td>
                  <td><span className="badge badge-menunggu">Menunggu</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ padding: '18px 20px' }}>
          <div className="card-title" style={{ marginBottom: '14px' }}>Notifikasi Terbaru</div>
          <div className="notif-item">
            <div className="notif-text"><b>38 laporan baru</b> masuk dan belum diverifikasi</div>
            <div className="notif-time">Baru saja</div>
          </div>
        </div>
      </div>
    </>
  );
}