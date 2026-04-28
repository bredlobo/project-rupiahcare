// File: models/user.go
package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Struct ini akan menjadi tabel 'users'
type User struct {
	ID           string    `gorm:"primaryKey;type:char(36)" json:"id"`
	NamaLengkap  string    `gorm:"type:varchar(100);not null" json:"nama_lengkap"`
	Email        string    `gorm:"type:varchar(100);unique;not null" json:"email"`
	NoHP         string    `gorm:"type:varchar(15);not null" json:"no_hp"`
	NIK          string    `gorm:"type:varchar(16);unique;not null" json:"nik"`
	PasswordHash string    `gorm:"type:varchar(255);not null" json:"-"` // json:"-" agar password tidak ikut terkirim ke frontend
	Role         string    `gorm:"type:enum('user', 'admin', 'petugas');default:'user'" json:"role"`
	Status       string    `gorm:"type:enum('aktif', 'nonaktif');default:'aktif'" json:"status"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// Hook GORM: Otomatis generate UUID sebelum data disimpan ke database
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New().String()
	return
}