## Architecture Documentation (`docs/architecture.md`)

```markdown
# FlowState Architecture

## Database Engine (`src/lib/db.js`)
We use `Dexie.js` to manage the browser's IndexedDB. This allows us to perform relational queries and safely version our schema.

### Schema Versioning History
- **v1**: Initial schema (`tasks` boolean completed, `notes`, `habits`).
- **v2**: Kanban workflow support. Replaced boolean `completed` with string `status` ('todo', 'in_progress', 'completed').
- **v3**: Urgency metrics. Added `deadline` timestamp to `tasks` and applied a fallback migration for legacy data.
- **v4**: Pomodoro tracking. Added `pomodoroSessions` store for local analytics and completion metrics.
- **v5**: Attempted to introduce `habits` and `habitLogs`. Aborted due to IndexedDB's strict constraint against mutating existing primary keys during upgrades.
- **v6**: Successfully implemented local Habits. Retained standard `++id` primary keys and introduced a secondary compound index (`[habitId+date]`) on `habitLogs` to strictly enforce one log per habit, per calendar day, without duplication.

*Rule: Never mutate an existing `.version()` block once deployed. Increment the version number and write an `.upgrade()` function for data transformations.*

## State Management Standard
- We use `dexie-react-hooks` (`useLiveQuery`) to bind React components directly to IndexedDB queries.
- Read operations auto-update React components when the underlying database table changes.
- **Sorting**: Queries are sorted at the database level where possible, or inside the `useLiveQuery` callback (e.g., sorting tasks by closest `deadline` ascending).
- **Derived State**: Component selections (like active task or note IDs) use direct comparisons during render rather than relying on `useEffect` to avoid cascading re-renders and improve application performance.
- Write operations use custom hooks adhering to immutable updates.
- **Timezone-Resilient Dates**: When recording daily completion data (e.g., Habit logs), calculations must normalize to the user's local calendar day as a string (e.g., `YYYY-MM-DD`) rather than saving raw UTC timestamps. This guarantees that end-of-day actions do not accidentally shift into the next day due to UTC offsets, preserving streak accuracy.

## Styling Standards
- Uses standard CSS with custom CSS variables defined in `src/index.css`.
- Styled around a high-contrast, premium dark theme (`#050505` background, `#111111` panels) featuring Playfair Display serif headings and Inter/JetBrains Mono UI typography.
- Employs outline-style badges, ghost buttons, and subtle hover transforms for a tactile, app-like feel.
- **Timer Accuracy**: Long-running intervals (e.g., Pomodoro countdowns) must calculate remaining time using absolute `Date.now()` timestamp deltas instead of decrementing counters to prevent drift caused by browser background tab throttling.