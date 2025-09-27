
package model

import (
	"database/sql"
	"log"

	_ "github.com/jackc/pgx/v5/stdlib"
)

var DB *sql.DB

func InitDB(connStr string) {
	var err error
	DB, err = sql.Open("pgx", connStr)
	if err != nil {
		log.Fatal("DB connect error:", err)
	}

	initSchema()
}

func initSchema() {
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
);
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    refresh_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);`

	if _, err := DB.Exec(schema); err != nil {
		log.Fatal("failed creating tables:", err)
	}
}
