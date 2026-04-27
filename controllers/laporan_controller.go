package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"project-rupiahcare/config"
	"project-rupiahcare/models"
	"time"

	"github.com/gin-gonic/gin"
)

func BuatLaporan(c *gin.Context) {
	// 1. Ambil UserID dari context (hasil middleware)
	userIDVal, _ := c.Get("user_id")
	userID := userIDVal.(string)

	// 2. Tangkap Input JSON sesuai struct baru
	var input struct {
		JenisKerusakan string `json:"jenis_kerusakan" binding:"required"`
		Nominal        int64  `json:"nominal" binding:"required"`
		Jumlah         int    `json:"jumlah" binding:"required"`
		Catatan        string `json:"catatan"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak lengkap: " + err.Error()})
		return
	}

	// 3. Generate Kode Laporan otomatis (Contoh: RC-20260427-XXXX)
	t := time.Now()
	kodeLaporan := fmt.Sprintf("RC-%s-%d", t.Format("20060102"), rand.Intn(9000)+1000)

	// 4. Masukkan ke Model Laporan
	laporan := models.Laporan{
		UserID:         userID,
		KodeLaporan:    kodeLaporan,
		JenisKerusakan: input.JenisKerusakan,
		Nominal:        input.Nominal,
		Jumlah:         input.Jumlah,
		Catatan:        input.Catatan,
		Status:         "Menunggu",
	}

	// 5. Simpan ke DB
	if err := config.DB.Create(&laporan).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal simpan laporan: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Laporan RupiahCare berhasil dibuat!",
		"data":    laporan,
	})
}