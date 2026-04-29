package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"project-rupiahcare/config"
	"project-rupiahcare/models"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// --- FUNGSI BUAT LAPORAN (Dengan Upload Foto) ---
func BuatLaporan(c *gin.Context) {

    role, _ := c.Get("role")

    if role != "user" {
        c.JSON(http.StatusForbidden, gin.H{
            "error": "Petugas BI (Admin) tidak diperbolehkan membuat laporan penukaran!",
        })
        return
    }

	userIDVal, _ := c.Get("user_id")
	userID := userIDVal.(string)

	// 1. Ambil Data Teks dari Form
	jenisKerusakan := c.PostForm("jenis_kerusakan")
	nominalStr := c.PostForm("nominal")
	jumlahStr := c.PostForm("jumlah")
	catatan := c.PostForm("catatan")
	tanggalPenukaran := c.PostForm("tanggal_penukaran") 
	sesi := c.PostForm("sesi")

	// Validasi dasar
	if jenisKerusakan == "" || nominalStr == "" || jumlahStr == "" || tanggalPenukaran == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semua data wajib diisi, termasuk tanggal penukaran"})
		return
	}

	// Konversi tipe data
	nominal, _ := strconv.ParseInt(nominalStr, 10, 64)
	jumlah, _ := strconv.Atoi(jumlahStr)
	lokasi := c.PostForm("lokasi")

	// 2. Proses Upload File Foto
	file, err := c.FormFile("foto")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wajib melampirkan foto uang rusak"})
		return
	}

	// Pastikan folder uploads ada
	if _, err := os.Stat("uploads"); os.IsNotExist(err) {
		os.Mkdir("uploads", os.ModePerm)
	}

	// Buat nama file unik: timestamp-namaasli.jpg
	namaFile := fmt.Sprintf("%d-%s", time.Now().Unix(), file.Filename)
	pathSimpan := "uploads/" + namaFile

	// Simpan file ke server
	if err := c.SaveUploadedFile(file, pathSimpan); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan foto"})
		return
	}

	// 3. Simpan Data ke Database
	t := time.Now()
	kodeLaporan := fmt.Sprintf("RC-%s-%d", t.Format("20060102-150405"), rand.Intn(900)+100)

	laporan := models.Laporan{
		UserID:         userID,
		KodeLaporan:    kodeLaporan,
		JenisKerusakan: jenisKerusakan,
		Nominal:        nominal,
		Jumlah:         jumlah,
		TanggalPenukaran: tanggalPenukaran,
		Sesi:             sesi,
		Lokasi:           lokasi,
		Catatan:        catatan,
		Foto:           "/uploads/" + namaFile,
		Status:         "Menunggu",
	}

	if err := config.DB.Create(&laporan).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal simpan laporan: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":        "Laporan & Foto berhasil terkirim ke RupiahCare!",
		"ticket_number": kodeLaporan,
		"data":           laporan,
	})
}

// --- FUNGSI RIWAYAT LAPORAN ---
func GetMyLaporan(c *gin.Context) {
    userID, exists := c.Get("user_id")
    if !exists {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Sesi tidak valid"})
        return
    }

    var laporans []models.Laporan
    // GORM sangat pintar, masukkan saja userID tanpa perlu ditebak tipenya (string/uint)
    if err := config.DB.Where("user_id = ?", userID).Find(&laporans).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil riwayat"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "status":  "success",
        "total":   len(laporans),
        "riwayat": laporans,
    })
}

// --- FUNGSI ADMIN: LIHAT SEMUA LAPORAN ---
func GetAllLaporan(c *gin.Context) {
	var laporans []models.Laporan
	if err := config.DB.Preload("User").Find(&laporans).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil semua laporan"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"jumlah": len(laporans),
		"data":   laporans,
	})
}

// --- FUNGSI ADMIN: UPDATE STATUS LAPORAN ---
func UpdateStatusLaporan(c *gin.Context) {
	id := c.Param("id")
	var input struct {
		Status string `json:"status" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status harus diisi"})
		return
	}

	if err := config.DB.Model(&models.Laporan{}).Where("id = ?", id).Update("status", input.Status).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal update status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Status laporan berhasil diperbarui menjadi " + input.Status,
	})
}