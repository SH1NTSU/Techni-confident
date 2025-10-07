package handlers

import (
	"encoding/json"
	"net/http"
	"techni-cof/helpers"
	"techni-cof/model"
)



func RefreshHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		http.Error(w, "Couldnt get the cookie", http.StatusInternalServerError)
		return
	}

	var email string
	err = model.DB.QueryRow(`SELECT email FROM sessions WHERE refresh_token=$1 AND expires_at > NOW()`, cookie.Value).Scan(&email)
	if err != nil {
		http.Error(w, "Invalid refresh token", http.StatusUnauthorized)
		return
	}
	


	newAccessToken, _ := helpers.GenerateJWT(email)
	
	json.NewEncoder(w).Encode(map[string]string{
		"token": newAccessToken,
	})
}
