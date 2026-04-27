// File: models/laporan.go
package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Struct ini akan menjadi tabel 'laporans'
type Laporan struct {
	ID             string    `gorm:"primaryKey;type:char(36)" json:"id"`
	UserID         string    `gorm:"type:char(36);not null;index" json:"user_id"`
	KodeLaporan    string    `gorm:"type:varchar(20);unique;not null" json:"kode_laporan"` // Misal: RC-20260427-1234
	JenisKerusakan string    `gorm:"type:varchar(50);not null" json:"jenis_kerusakan"`
	Nominal        int64     `gorm:"type:bigint;not null" json:"nominal"`
	Jumlah         int       `gorm:"not null" json:"jumlah"`
	Catatan        string    `gorm:"type:text" json:"catatan"`
	Status         string    `gorm:"type:enum('Menunggu', 'Diproses', 'Selesai', 'Ditolak');default:'Menunggu'" json:"status"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`

	// Relasi: Laporan dimiliki oleh satu User
	User User `gorm:"foreignKey:UserID" json:"user"`
}

func (l *Laporan) BeforeCreate(tx *gorm.DB) (err error) {
	l.ID = uuid.New().String()
	return
}