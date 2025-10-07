package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"techni-cof/middlewares"
	"techni-cof/model"

	"github.com/go-chi/chi/v5"
)

func CreateReportHandler(w http.ResponseWriter, r *http.Request) {
    email := r.Context().Value(middlewares.UserEmailKey).(string) 

    var input struct {
        Title       string `json:"title"`
        Description string `json:"description"`
        Contact     string `json:"contact"`
    }
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    var id int
    err := model.DB.QueryRow(
        `INSERT INTO reports (title, description, contact, created_by) VALUES ($1, $2, $3, $4) RETURNING id`,
        input.Title, input.Description, input.Contact, email,
    ).Scan(&id)
    if err != nil {
        http.Error(w, "insert failed: "+err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(map[string]any{
        "id":     id,
        "status": "in_progress",
        "author": email, 
    })
}

func GetStatusHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var status string
	err := model.DB.QueryRow(`SELECT status FROM reports WHERE id=$1`, id).Scan(&status)
	if err != nil {
		http.Error(w, "Report not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"id":     id,
		"status": status,
	})
}

func GetReportsHandler(w http.ResponseWriter, r *http.Request) {
	rows, err := model.DB.Query(`SELECT * FROM reports`)
	if err != nil {
		log.Println("Error querying reports:", err)
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var reports []model.Report
	for rows.Next() {
		var report model.Report
		var createdAt time.Time
		if err := rows.Scan(&report.ID, &report.Title, &report.Description, &report.Contact, &report.Status, &createdAt); err != nil {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}
		report.CreatedAt = createdAt.Format(time.RFC3339)
		reports = append(reports, report)
	}

	json.NewEncoder(w).Encode(reports)
}

