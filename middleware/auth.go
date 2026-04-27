package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// Gunakan kunci yang SAMA dengan yang ada di controller
var jwtKey = []byte("Rahasia_Pejuang_Rupiah_NTT_2026")

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. Ambil header Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Akses ditolak, token tidak ada"})
			c.Abort()
			return
		}

		// 2. Ambil token saja
		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)

		// 3. Validasi token
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token tidak valid atau sudah expired"})
			c.Abort()
			return
		}

		// 4. EXTRA: Ambil data UserID dari dalam token dan simpan ke Context
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			c.Set("user_id", claims["user_id"]) // Disimpan agar bisa dibaca controller
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Gagal memproses klaim token"})
			c.Abort()
		}
	}
}