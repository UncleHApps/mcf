# Phase 1: MVP Project Brief - "The Connection Demo"

## 1. Objective
Build a high-fidelity **"Tracer Bullet" MVP** that demonstrates the core value of the MasChemFreight Command Center: **Speed & Simplicity**.
The goal is to prove:
1.  **Technical Feasibility:** Live data flowing from the Public Website Form -> PocketBase -> New Dashboard.
2.  **UX Superiority:** A "Zero-Click" experience where office staff see quotes instantly and can action them without digging through emails or spreadsheets.

## 2. In-Scope Features (The "Tracer Bullet")

### A. The "Magic" Connection (Technical)
*   **Public Site Update:** Modify `src/js/main.js` to submit form data directly to the local PocketBase instance (via API proxy).
*   **Realtime Feed:** The Dashboard must update *instantly* (no refresh) when a form is submitted on the public site.

### B. The Dashboard MVP (UX/UI)
*   **Login Screen:** Minimal but secure (Email/Password).
*   **"Command Center" View (Home):**
    *   **Live Quote Stream:** A clean, dense list of incoming requests. Highlighting "New" vs "Actioned".
    *   **Quick Actions:** Hover actions (e.g., "Quick View", "Archive").
*   **Quote Detail & Refinement View:**
    *   **Read-Only Context:** Customer info & Freight details (from the form).
    *   **Edit Mode:** Fields to add Price, Vehicle Type, and Driver.
    *   **"Send Quote" Button:**  Generates a dummy PDF popup (visual proof of concept) and updates status to "Sent".

## 3. User Requirements & UX Philosophy

**Target User:** Office Administrator (needs speed, hates clutter).

**UX Principles:**
1.  **Information Density:** Don't waste space. Show key details (Route, Cargo, Date) in the list view.
2.  **Status at a Glance:** Color-coded badges (e.g., *Amber* for New, *Green* for Sent).
3.  **Keyboard Friendly:** Hotkeys to open/close quotes (optional but "pro" feel).

**UI Aesthetic:**
*   **Theme:** Professional Logistics (Dark Blues, Slate Greys, clean White cards).
*   **Library:** `shadcn/ui` (Tables, Cards, Dialogs).

## 4. Success Metrics for this Phase
*   [ ] I can fill out the form on `localhost:80` (Public Site).
*   [ ] The quote appears immediately on `localhost:5173` (Dashboard).
*   [ ] I can click the quote, add a price, and click "Send".
*   [ ] The status changes to "Sent" in the list.

## 5. Excluded from MVP (Later Phases)
*   *Full CRM Directory* (We will just auto-save contacts for now).
*   *Fleet Management CRUD* (We will mock 2-3 trucks for the demo).
*   *Actual Email Sending* (We will console.log only).
*   *Route Analysis*.

---

## 6. The "Starter Prompt" (For the Builder)
*Once we agree on the scope above, we will use a prompt like this to kick off coding:*

> "Act as a Senior React Engineer. We are starting Phase 1 of the MCF Command Center.
> Use the existing `docs/dashboard_plan.md` as the architectural reference.
> **Current Task:** Scaffold the Monorepo (Frontend + Backend) and build the 'Connection Demo'.
> 1.  Initialize the folder structure.
> 2.  Setup PocketBase with the `quotes` collection.
> 3.  Scaffold the React Dashboard with a Login screen and a Realtime Quote Feed.
> 4.  Provide the JavaScript snippet to update the Public Website's form submission.
> Focus strictly on the happy path: Form -> DB -> Dashboard Feed."
