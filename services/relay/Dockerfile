# PRISMLOOM Go SSE relay
# Simulated multiplayer presence heartbeat (zero-key local demo).

FROM golang:1.22-alpine
WORKDIR /app
COPY go.mod main.go ./
RUN go build -o relay main.go
EXPOSE 8081
CMD ["./relay"]
