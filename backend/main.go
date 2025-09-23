package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/mail"
	"os"
	"strings"
	"time"


	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type Report struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Contact     string    `json:"contact"`
	Status      string    `json:"status"`
	CreatedAt   string `json:"created_at"`
}


type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var db *sql.DB

func main() {
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

	initDB()

	// Router
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(corsMiddleware)
	// Report endpoints
	r.Route("/api/v1", func(r chi.Router) {
	    r.Post("/report", createReportHandler)
	    r.Get("/status/{id}", getStatusHandler)
	    r.Post("/register", registerHandler)
	    r.Post("/login", loginHandler)
	    r.Get("/reports", getReportsHandler)
	})

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
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
	if _, err := db.Exec(schema); err != nil {
		log.Fatal("failed creating tables:", err)
	}
}

// ---------------- Reports ----------------

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



func getReportsHandler(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query(`SELECT * FROM reports`)
    if err != nil {
        log.Println("Error querying reports:", err)
        http.Error(w, "Database error", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var reports []Report

    for rows.Next() {
        var report Report
        var createdAt time.Time // Use time.Time for timestamp
        
        err := rows.Scan(
            &report.ID,
            &report.Title,
            &report.Description,
            &report.Contact,
            &report.Status,
            &createdAt, // Scan into time.Time
        )
        if err != nil {
            log.Println("Error scanning row:", err)
            http.Error(w, "Database error", http.StatusInternalServerError)
            return
        }
        
        // Convert to ISO 8601 format for JavaScript
        report.CreatedAt = createdAt.Format(time.RFC3339)
        reports = append(reports, report)
    }

    if err = rows.Err(); err != nil {
        log.Println("Rows iteration error:", err)
        http.Error(w, "Database error", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(reports); err != nil {
        log.Println("Error encoding JSON:", err)
    }
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var u User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	if u.Email == "" || u.Password == "" {
		http.Error(w, "Email and password required", http.StatusBadRequest)
		return
	}
	
	if !isTechnischoolsEmail(u.Email) {
	http.Error(w, "Domain not allowed", http.StatusBadRequest)
	return
	}
	hashed, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Password hash failed", http.StatusInternalServerError)
		return
	}

	_, err = db.Exec(`INSERT INTO users (email, password) VALUES ($1, $2)`, u.Email, string(hashed))
	if err != nil {
		http.Error(w, "Insert failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered"})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var u User
	if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	var hashed string
	err := db.QueryRow(`SELECT password FROM users WHERE email=$1`, u.Email).Scan(&hashed)
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

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Login successful"})
}





func isTechnischoolsEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	if err != nil {
		return false
	}

	return strings.HasSuffix(strings.ToLower(email), "@technischools.com")
}


func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}




