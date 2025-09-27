package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"techni-cof/handlers"

	"techni-cof/middlewares"
	"techni-cof/model"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	connStr := os.Getenv("POSTGRES_CONN_STRING")
	if connStr == "" {
		log.Fatal("POSTGRES_CONN_STRING not set in .env")
	}

	model.InitDB(connStr)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middlewares.CorsMiddleware)


r.Route("/v1", func(r chi.Router) {
    r.Post("/register", handlers.RegisterHandler)
    r.Post("/login", handlers.LoginHandler)
    r.Get("/refresh", handlers.RefreshHandler)
    r.Group(func(protected chi.Router) {
        protected.Use(middlewares.JWTGuard)

        protected.Post("/report", handlers.CreateReportHandler)
        protected.Get("/status/{id}", handlers.GetStatusHandler)
        protected.Get("/reports", handlers.GetReportsHandler)
    })
})

	fmt.Println("🚀 Server running on :3000")
	log.Fatal(http.ListenAndServe(":3000", r))
}
