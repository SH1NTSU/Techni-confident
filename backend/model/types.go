package model

type Report struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Contact     string `json:"contact"`
	Status      string `json:"status"`
	CreatedAt   string `json:"created_at"`
}

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

