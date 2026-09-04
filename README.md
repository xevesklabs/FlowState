# FlowState

An offline-first, high-performance productivity suite designed for developers. FlowState keeps all data securely on your device using IndexedDB, ensuring zero latency, absolute privacy, and seamless offline functionality. Styled with a premium, high-contrast dark Kanban aesthetic.

## Core Features
- **Smart Tasks**: Priority-based Kanban management with 3-state workflows (To Do, In Progress, Done).
- **Urgency Tracking**: Define deadlines with real-time countdowns, automatic sorting by urgency, and 'OVR' (Overdue) badge indicators.
- **Instant Search**: Client-side filtering to instantly find tasks across all boards.
- **Notes**: Split-pane rich text knowledge base with note pinning, instant local saving, and a distraction-free editor.
- **Habits & Pomodoro**: (Pending) Daily tracking and focus timers.

## Tech Stack
- **Frontend**: React 18, Vite, React Router
- **Styling**: Pure CSS with custom variables (Dark premium theme, Playfair Display & JetBrains Mono)
- **Database**: Dexie.js (IndexedDB wrapper)
- **Icons**: Lucide React

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install