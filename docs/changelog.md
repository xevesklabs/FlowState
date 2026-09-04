# Changelog

All notable changes to the **FlowState** project will be documented in this file. 
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project follows a local-first, offline-ready architecture.

---

## [Unreleased] - Phase 5 Completion

### Added
- **Developer Habits Tracker:** Daily routine manager to maintain consistency and track goals.
- **Contribution Heatmap:** A 30-day visual grid that dynamically lights up based on historical habit completion.
- **Timezone-Safe Logging:** Engineered date normalization strictly to local `YYYY-MM-DD` strings to prevent streaks from breaking across UTC shifts.

### Changed
- **Database Schema (v6):** Upgraded Dexie.js IndexedDB schema to `v6`, restoring standard primary keys while introducing compound indexes (`[habitId+date]`) to ensure accurate daily logging without duplication.

---

##  Phase 4 Completion

### Added
- **Pomodoro Module:** Distraction-free focus timer featuring 25-minute focus, 5-minute short break, and 15-minute long break intervals.
- **Session Analytics:** Daily completion counter to track successful deep work intervals locally.
- **Anti-Drift Timer Logic:** Engineered the countdown using absolute `Date.now()` timestamp deltas to guarantee perfect accuracy, bypassing browser background tab throttling.

### Changed
- **Database Schema (v4):** Upgraded Dexie.js IndexedDB schema to `v4` to introduce the `pomodoroSessions` store without mutating existing user tasks or notes.

---

## [Phase 3] - Notes & Urgency Metrics

### Added
- **Urgency Metrics & Deadlines:** Added a `deadline` property to tasks with real-time dynamic countdowns.
- **Overdue Indicators:** Introduced a dynamic "OVR" badge that only appears when a task misses its deadline.
- **Smart Sorting:** Tasks now automatically sort in ascending order based on their deadline (most urgent tasks appear first).
- **Global Task Search:** Added a search bar to the Kanban header to filter tasks instantly by title across all boards.
- **Notes Module:** Built a split-pane rich text knowledge base with a sidebar list and a distraction-free editor area.
- **Note Pinning:** Added the ability to pin important notes to the top of the sidebar.
- **Auto-Selection:** The Notes module automatically selects the most recently updated or newly created note to prevent empty UI states.

### Changed
- **Database Schema (v3):** Upgraded the Dexie.js IndexedDB schema to `v3` to support deadlines, including an auto-migration script for legacy tasks.
- **State Management:** Refactored the Notes and Tasks components to use **derived state** during render instead of `useEffect` for state synchronization, dramatically improving performance and resolving strict-mode linting errors.
- **Task Editor Drawer:** Upgraded the side drawer UI to match the premium dark theme with `datetime-local` inputs for deadline editing.

---

## [Phase 2] - Smart Kanban Board

### Added
- **Kanban Architecture:** Transformed the linear task list into a 3-column Kanban board (To Do, In Progress, Done).
- **Board Toggle Bar:** Implemented a navigation toggle to view all boards simultaneously or focus on a single column.
- **Premium Input Card:** Created a prominent, large-typography input card for rapid task creation with difficulty dropdowns.
- **Interactive Side Drawer:** Built a slide-over side panel for inline task editing (title, status, priority) with backdrop blur and ESC-to-close logic.
- **Difficulty Badges:** Added outline-style monospace badges for task priorities (High/Red, Medium/Orange, Low/Blue).

### Changed
- **Database Schema (v2):** Migrated task completion from a binary boolean (`completed`) to a 3-state string (`status`).
- **Card Styling:** Redesigned task cards to feature hover transforms, subtle glowing borders, and avatar integrations.

---

## [Phase 1] - Foundation & Architecture

### Added
- **Project Initialization:** Scaffolded a Vite + React 18 single-page application.
- **Local-First Database:** Integrated `Dexie.js` and `dexie-react-hooks` to establish the IndexedDB persistence layer.
- **App Layout:** Created the core application shell with a fixed left sidebar and a flexible main content area.
- **Routing:** Set up `react-router-dom` with placeholder routes for Tasks, Habits, Pomodoro, and Notes.
- **Design System:** Established the custom CSS variables for the premium developer dark theme.

### Changed
- **Typography:** Configured the application to use a high-end typography stack: *Playfair Display* for serif headers, *JetBrains Mono* for badges/code, and *Inter* for readable UI text.
- **Global Theme:** Applied a deep charcoal (`#050505`) to (`#111111`) color palette across all root elements.