package main

import (
	"project-rupiahcare/config"
	"project-rupiahcare/controllers"
	"project-rupiahcare/middleware"
	"project-rupiahcare/models"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Koneksi DB & Migrasi
	config.ConnectDatabase()
	config.DB.AutoMigrate(&models.User{}, &models.Laporan{})

	// 2. Inisialisasi Router
	r := gin.Default()

	// 3. API Routes
	api := r.Group("/api")
	{
		// Publik (Bisa diakses siapa saja)
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)

		// Terproteksi (Wajib pakai Bearer Token)
		userRoutes := api.Group("/user")
		userRoutes.Use(middleware.AuthMiddleware())
		{
			userRoutes.GET("/cek-status", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Halo Manggala! Kamu berhasil masuk."})
			})

			// FITUR UTAMA: Kirim Laporan
			userRoutes.POST("/lapor", controllers.BuatLaporan)
		}
	}

	// 4. Jalankan Server
	r.Run(":8080")
}