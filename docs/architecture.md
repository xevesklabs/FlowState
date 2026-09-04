## Architecture Documentation (`docs/architecture.md`)

```markdown
# FlowState Architecture

## Database Engine (`src/lib/db.js`)
We use `Dexie.js` to manage the browser's IndexedDB. This allows us to perform relational queries and safely version our schema.

### Schema Versioning History
- **v1**: Initial schema (`tasks` boolean completed, `notes`, `habits`).
- **v2**: Kanban workflow support. Replaced boolean `completed` with string `status` ('todo', 'in_progress', 'completed').
- **v3**: Urgency metrics. Added `deadline` timestamp to `tasks` and applied a fallback migration for legacy data.

*Rule: Never mutate an existing `.version()` block once deployed. Increment the version number and write an `.upgrade()` function for data transformations.*

## State Management Standard
- We use `dexie-react-hooks` (`useLiveQuery`) to bind React components directly to IndexedDB queries.
- Read operations auto-update React components when the underlying database table changes.
- **Sorting**: Queries are sorted at the database level where possible, or inside the `useLiveQuery` callback (e.g., sorting tasks by closest `deadline` ascending).
- Write operations use custom hooks adhering to immutable updates.

## Styling Standards
- Uses standard CSS with custom CSS variables defined in `src/index.css`.
- Styled around a high-contrast, premium dark theme (`#050505` background, `#111111` panels) featuring Playfair Display serif headings and Inter/JetBrains Mono UI typography.
- Employs outline-style badges, ghost buttons, and subtle hover transforms for a tactile, app-like feel.