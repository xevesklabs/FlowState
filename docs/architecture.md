## Architecture Documentation (`docs/architecture.md`)

```markdown
# FlowState Architecture

## Database Engine (`src/lib/db.js`)
We use `Dexie.js` to manage the browser's IndexedDB. This allows us to perform relational queries and safely version our schema.

### Schema Versioning
Never mutate an existing `.version()` block once deployed. To add new tables or columns:
1. Increment the version number: `.version(2)`.
2. Define the new schema.
3. Write an `.upgrade()` function if data transformation is required.

## State Management Standard
- We use `dexie-react-hooks` (`useLiveQuery`) to bind React components directly to IndexedDB queries.
- Read operations auto-update React components when the underlying database table changes.
- Write operations use custom hooks adhering to immutable updates.

## Styling Standards
- Uses standard CSS with custom CSS variables defined in `src/index.css`.
- Styled around a high-contrast, premium dark theme (`#050505` background, `#111111` panels) featuring Playfair Display serif headings and Inter UI typography.