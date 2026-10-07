# Enigmes

Interactive puzzle game built with Angular. The game is made of **several standalone parts** that can be solved independently from one another. The first part in development is **Le Manoir** (The Manor).

> Product and design docs live in [`docs/`](./docs/README.md). This README covers orientation and local development.

## Game at a glance

| Part | Status | Description |
|------|--------|-------------|
| **Le Manoir** | In progress | Explore rooms via a house plan. Rooms may contain a puzzle, clues for other rooms, or both. |
| *Other parts* | Not started | Planned as separate, independently solvable sections. |

The overarching win condition (what happens when a part — or the whole game — is solved) is **not defined yet**.

## Documentation

| Doc | Contents |
|-----|----------|
| [Documentation index](./docs/README.md) | Map of all docs |
| [TODO / Roadmap](./docs/TODO.md) | Living development checklist |
| [Technical audit](./docs/technical-audit.md) | Stack health and modernization advice |
| [Game design](./docs/game-design.md) | Product vision, parts, open questions |
| [Manor overview](./docs/manor/overview.md) | Hub, navigation, room roles |
| [Manor rooms](./docs/manor/rooms.md) | Per-room puzzles, clues, implementation status |
| [Architecture](./docs/architecture.md) | Tech stack, folder structure, routing |

## Stack

- Angular 22 (standalone components)
- TypeScript
- SCSS (BEM with `app_` prefix)
- Vitest for unit tests

## Local development

node 24

```bash
npm install
npm start
```

Open `http://localhost:4200/` (redirects to `/manoir/carte`).

| Script | Purpose |
|--------|---------|
| `npm start` | Dev server (`ng serve`) |
| `npm run build` | Production build → `dist/enigmes` |
| `npm run buildprod` | Build for path `/rutabaga/` → `dist/rutabaga` |
| `npm test` | Unit tests |

## Project conventions

Cursor rules under [`.cursor/rules/`](./.cursor/rules/) encode front-end standards (Angular, SCSS, accessibility). Prefer those over inventing new patterns.
