package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"techni-cof/helpers"

	"techni-cof/model"

	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var u model.User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	if u.Email == "" || u.Password == "" {
		http.Error(w, "Email and password required", http.StatusBadRequest)
		return
	}

	if !helpers.IsTechnischoolsEmail(u.Email) {
		http.Error(w, "Domain not allowed", http.StatusBadRequest)
		return
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Password hash failed", http.StatusInternalServerError)
		return
	}

	_, err = model.DB.Exec(`INSERT INTO users (email, password) VALUES ($1, $2)`, u.Email, string(hashed))
	if err != nil {
		http.Error(w, "Insert failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered"})
}





func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var u model.User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	var hashed string
	err := model.DB.QueryRow(`SELECT password FROM users WHERE email=$1`, u.Email).Scan(&hashed)
	if err == sql.ErrNoRows {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	} else if err != nil {
		http.Error(w, "DB error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if bcrypt.CompareHashAndPassword([]byte(hashed), []byte(u.Password)) != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := helpers.GenerateJWT(u.Email) // access token
	if err != nil {
		http.Error(w, "Failed to create token", http.StatusInternalServerError)
		return
	}

	refreshToken, err := helpers.GenerateRandomString(64)
	if err != nil {
		http.Error(w, "Couldnt Generate string", http.StatusInternalServerError)
	}

	_, err = model.DB.Exec(`INSERT INTO sessions (email, refresh_token, expires_at) VALUES ($1, $2, NOW() + interval '30 days')`, u.Email, refreshToken)
	if err != nil {
		http.Error(w, "Failed to create session", http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken,
		Path:     "/",
		HttpOnly: true,
		MaxAge:   30 * 24 * 60 * 60, 
	})

	json.NewEncoder(w).Encode(map[string]string{
		"message": "Login successful",
		"token":   token,
	})
}
