# backend/Dockerfile
FROM golang:1.24-alpine

WORKDIR /app

# Copy Go modules first (for caching)
COPY go.mod go.sum ./
RUN go mod download

# Copy rest of the code
COPY . .

# Build the Go server
RUN go build -o server main.go

EXPOSE 8080

CMD ["./server"]
