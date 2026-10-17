package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// Go SSE relay for PRISMLOOM — simulated multiplayer presence.
// Emits a heartbeat every second so clients can render "builders online."
func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/events", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")
		flusher, ok := w.(http.Flusher)
		if !ok {
			http.Error(w, "streaming unsupported", http.StatusInternalServerError)
			return
		}
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-r.Context().Done():
				return
			case t := <-ticker.C:
				fmt.Fprintf(w, "data: {\"t\": %q, \"peers\": 8}\\n\n", t.Format("15:04:05"))
				flusher.Flush()
			}
		}
	})
	log.Println("go relay on :8081")
	log.Fatal(http.ListenAndServe(":8081", mux))
}
