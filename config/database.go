package config

import (
	"fmt"
	"log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// Format koneksi MySQL (DSN)
	dsn := "root:@tcp(127.0.0.1:3306)/rupiahcare_db?charset=utf8mb4&parseTime=True&loc=Local"
	
	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("❌ Gagal terhubung ke database:", err)
	}

	DB = database
	fmt.Println("✅ Berhasil terhubung ke database rupiahcare_db!")
}