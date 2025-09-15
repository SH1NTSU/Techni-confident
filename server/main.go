package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type Report struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Contact     string    `json:"contact"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

var db *sql.DB

func main() {
	// Load env
	_ = godotenv.Load()

	connStr := os.Getenv("POSTGRES_CONN_STRING")
	if connStr == "" {
		log.Fatal("POSTGRES_CONN_STRING not set in .env")
	}

	var err error
	db, err = sql.Open("pgx", connStr)
	if err != nil {
		log.Fatal("DB connect error:", err)
	}

	// ensure table exists
	initDB()

	// Router
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Post("/report", createReportHandler)
	r.Get("/status/{id}", getStatusHandler)

	fmt.Println("🚀 Server running on :3000")
	log.Fatal(http.ListenAndServe(":3000", r))
}

func initDB() {
	schema := `
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    contact TEXT,
    status TEXT NOT NULL DEFAULT 'in_progress',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
	if _, err := db.Exec(schema); err != nil {
		log.Fatal("failed creating table:", err)
	}
}

// POST /report
func createReportHandler(w http.ResponseWriter, r *http.Request) {
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
	err := db.QueryRow(
		`INSERT INTO reports (title, description, contact) VALUES ($1, $2, $3) RETURNING id`,
		input.Title, input.Description, input.Contact,
	).Scan(&id)
	if err != nil {
		http.Error(w, "insert failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"id":     id,
		"status": "in_progress",
	})
}

// GET /status/{id}
func getStatusHandler(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	var status string
	err := db.QueryRow(`SELECT status FROM reports WHERE id=$1`, id).Scan(&status)
	if err == sql.ErrNoRows {
		http.Error(w, "Report not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "DB error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"id":     id,
		"status": status,
	})
}

