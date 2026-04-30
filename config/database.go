package config

import (
	"os"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// 1. Coba ambil URL Database dari setting server (misal dari Render nanti)
	dsn := os.Getenv("DB_URL") 

	// 2. Kalau kosong (berarti kamu lagi nge-run di laptop sendiri)
	if dsn == "" {
		// Gunakan database XAMPP lokalmu
		dsn = "root:@tcp(127.0.0.1:3306)/rupiahcare?charset=utf8mb4&parseTime=True&loc=Local"
	}

	// 3. Lakukan koneksi
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Gagal koneksi ke database!")
	}
	
	DB = database
}