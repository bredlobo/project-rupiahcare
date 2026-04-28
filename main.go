package main

import (
	"project-rupiahcare/config"
	"project-rupiahcare/controllers"
	"project-rupiahcare/middleware"
	"project-rupiahcare/models"

	"github.com/gin-contrib/cors" // Pastikan sudah: go get github.com/gin-contrib/cors
	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Koneksi DB & Migrasi
	config.ConnectDatabase()
	config.DB.AutoMigrate(&models.User{}, &models.Laporan{})

	// 2. Inisialisasi Router
	r := gin.Default()

	// PERBAIKAN: CORS yang lebih kuat agar tidak diblokir browser
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.Static("/uploads", "./uploads")

	// 3. API Routes
	api := r.Group("/api")
	{
		api.POST("/register", controllers.Register)
		api.POST("/login", controllers.Login)

		// Area User
		userRoutes := api.Group("/user")
		userRoutes.Use(middleware.AuthMiddleware())
		{
			userRoutes.GET("/cek-status", func(c *gin.Context) {
				c.JSON(200, gin.H{"message": "Halo Manggala! Kamu berhasil masuk."})
			})
			userRoutes.POST("/lapor", controllers.BuatLaporan)
			userRoutes.GET("/riwayat", controllers.GetMyLaporan)
		}

		// Area Admin
		adminRoutes := api.Group("/admin")
		adminRoutes.Use(middleware.AuthMiddleware(), middleware.AdminOnly())
		{
			adminRoutes.GET("/laporan", controllers.GetAllLaporan)
			adminRoutes.PUT("/laporan/:id", controllers.UpdateStatusLaporan)
		}
	}

	r.Run(":8080")
}