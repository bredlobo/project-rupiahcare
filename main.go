// File: main.go
package main

import (
	"fmt"
	"nama-project-kamu/config" // SESUAIKAN dengan nama module di go.mod kamu
	"nama-project-kamu/models" // SESUAIKAN dengan nama module di go.mod kamu
)

func main() {
	// 1. Jalankan koneksi
	config.ConnectDatabase()

	// 2. Jalankan AutoMigrate
	fmt.Println("⏳ Menjalankan migrasi database...")
	err := config.DB.AutoMigrate(
		&models.User{},
		&models.Laporan{},
	)

	if err != nil {
		fmt.Println("❌ Gagal migrasi:", err)
	} else {
		fmt.Println("✅ Migrasi sukses! Tabel berhasil dibuat di MySQL.")
	}
}