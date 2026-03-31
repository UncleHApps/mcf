# Project Plan: MasChemFreight Command Center (Standalone)

## 1. Executive Summary
**Project Name:** MCF Command Center
**Type:** Standalone Web Application (PWA)
**Goal:** A centralized, offline-capable dashboard for office staff to manage Quotes, CRM, Fleet, Staff, and Routes.
**Integration:** Replaces Make.com/Google Sheets. Receives data from the public website via direct API calls.
**Deployment:** Single-server (VPS or Local) using Docker + PocketBase + Caddy.

## 2. Technology Stack

### Backend (The "Engine")
*   **PocketBase:** A single-file, self-hosted backend (Go + SQLite).
    *   **Database:** Embedded SQLite (Handles high volume effortlessly).
    *   **Auth:** Built-in Email/Password authentication.
    *   **Realtime:** Native subscriptions for live quote feeds.
    *   **Hooks:** Server-side logic for email triggers (e.g., sending the PDF).

### Frontend (The "Dashboard")
*   **Framework:** React 18+ (Vite).
*   **Language:** TypeScript.
*   **UI Library:** `shadcn/ui` + `Tailwind CSS`.
*   **State Management:** `TanStack Query` (Server state) + `Zustand` (Global app state).
*   **Offline Support:** `vite-plugin-pwa` + `Dexie.js` (IndexedDB).
*   **Sync Logic:** Last-Write-Wins (LWW) with conflict notifications.

### Infrastructure
*   **Docker:** Containerizes the entire stack.
*   **Caddy:** Reverse proxy for automatic HTTPS and single-domain routing (avoids CORS).
*   **Mailpit:** Local SMTP server for safe email testing.

---

## 3. Project Structure
The project will live in its own directory, separate from the public website.

```text
mcf-command-center/
├── docker-compose.yml      # Orchestrates PocketBase, Frontend (Dev), Caddy, Mailpit
├── Caddyfile               # Reverse proxy configuration
├── .env.example            # Template for environment variables
├── pb_data/                # PocketBase database files (Git ignored)
├── pb_migrations/          # Database schema changes
├── frontend/               # The React Application
│   ├── Dockerfile
│   ├── src/
│   │   ├── ...
│   └── package.json
└── README.md
```

---

## 4. Record Schema & Collections

We will define these collections in PocketBase.
*Note: Use Record Rules (e.g., `@request.auth.id != ""`) to secure all data.*

### A. Core Operations
*   **`quotes`**
    *   Fields: `status` (enum: New, Pending, Approved), `freight_details` (JSON), `price` (Number).
    *   Relations: `contact_id`, `vehicle_id`, `route_id`, `assigned_staff_id`.
    *   Audit: `created_by` (User relation), `updated_by` (User relation).
    *   *Optimistic Lock:* `version` (Integer, increments on edit).
*   **`jobs`** (Converted from Quotes)
    *   Fields: `job_status` (In Transit, Delivered), `pod_proof` (File), `invoice_date`.
    *   Relations: `quote_id` (Link back to original quote).

### B. Registry
*   **`contacts`** (CRM)
    *   Fields: `name`, `email`, `phone`, `company`, `type` (Client/Vendor).
*   **`fleet`**
    *   Fields: `reg_no`, `type` (Tri-Axle, Tautliner), `status` (Active, Maintenance).
    *   Relations: `default_driver_id`.
*   **`staff`**
    *   Fields: `name`, `role` (Office, Driver), `phone`, `id_number`.
*   **`routes`**
    *   Fields: `origin`, `destination`, `base_rate`.

---

## 5. Offline & Sync Strategy
1.  **Selective Caching:** On login, fetch "Active Quotes" + "Full Registry" (Fleet/Staff/Routes). Do not fetch deep history to keep the device light.
2.  **Mutation Queue:** Offline actions (Create/Update) are stored in Dexie with a timestamp.
3.  **Conflict Handling:**
    *   Default: Last-Write-Wins (Server timestamp trusted).
    *   UI: Toast notification if a record changes while you are viewing it ("Record updated by another user").

---

## 6. Development Setup (Docker)

### `docker-compose.yml`
This setup includes Caddy for a production-like environment even locally.

```yaml
version: '3.8'

services:
  # REVERSE PROXY (Single Entry Point)
  caddy:
    image: caddy:2-alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
    depends_on:
      - pocketbase
      - frontend

  # BACKEND
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    container_name: mcf-backend
    restart: unless-stopped
    volumes:
      - ./pb_data:/pb/pb_data
    env_file: .env # Load secrets from .env
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8090/api/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  # FRONTEND (Dev Mode)
  frontend:
    build: ./frontend
    container_name: mcf-frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=/api # Relative path thanks to Caddy
  
  # EMAIL TESTING
  mailpit:
    image: axllent/mailpit
    ports:
      - "8025:8025" # UI
      - "1025:1025" # SMTP
```

### `Caddyfile`
```caddy
:80 {
    # Proxy API requests to PocketBase
    handle /api* {
        reverse_proxy pocketbase:8090
    }
    handle /_* {
        reverse_proxy pocketbase:8090
    }

    # Proxy everything else to Frontend Dev Server
    # In production, this would change to `file_server`
    reverse_proxy frontend:5173
}
```

### `.env` (Do NOT commit)
```bash
POCKETBASE_ADMIN_EMAIL=admin@masfreight.co.za
POCKETBASE_ADMIN_PASSWORD=secure_password_here
SMTP_HOST=mailpit
SMTP_PORT=1025
```

---

## 7. Next Steps for Implementation
1.  **Initialize Project:** Create the directory structure and Docker files.
2.  **Schema Definition:** Boot up PocketBase and create the collections listed in Section 4.
3.  **Frontend Scaffold:** Initialize React/Vite in the `frontend` container.
4.  **Connect Forms:** Update the public website to POST to `localhost/api/collections/quotes/records`.
