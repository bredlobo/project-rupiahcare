package controllers

import (
	"net/http"
	"project-rupiahcare/config"
	"project-rupiahcare/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte("Rahasia_Pejuang_Rupiah_NTT_2026")

// --- FUNGSI REGISTER ---
func Register(c *gin.Context) {
	var input struct {
		NamaLengkap string `json:"nama_lengkap" binding:"required"`
		Email       string `json:"email" binding:"required,email"`
		NoHP        string `json:"no_hp" binding:"required"`
		NIK         string `json:"nik" binding:"required,len=16"`
		Sandi       string `json:"sandi" binding:"required,min=8"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Data tidak valid: " + err.Error()})
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Sandi), bcrypt.DefaultCost)

	user := models.User{
		NamaLengkap:  input.NamaLengkap,
		Email:        input.Email,
		NoHP:         input.NoHP,
		NIK:          input.NIK,
		PasswordHash: string(hashedPassword),
		Role:         "user",
		Status:       "aktif",
	}

	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "NIK atau Email sudah digunakan."})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Pendaftaran berhasil! Akun Anda telah dibuat.",
		"user_id": user.ID,
	})
}

// --- FUNGSI LOGIN ---
func Login(c *gin.Context) {
	var input struct {
		Email string `json:"email" binding:"required,email"`
		Sandi string `json:"sandi" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format data salah"})
		return
	}

	var user models.User
	if err := config.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Sandi)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	claims := jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login berhasil! Selamat bekerja, Manggala.",
		"token":   tokenString,
	})
}