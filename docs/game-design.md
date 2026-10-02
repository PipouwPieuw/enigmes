# Game design

## Concept

**Enigmes** is a collection of **standalone puzzle parts**. Each part can be solved on its own; parts do not need to be completed in a fixed order (unless a future design explicitly links them).

The first part under development is **Le Manoir** (The Manor). Other parts are planned but not started.

```
Enigmes
├── Le Manoir          ← in progress
└── (other parts…)     ← not started
```

## Design principles

1. **Independence of parts** — solving one part must not require having solved another (at the top level).
2. **Within a part, rooms may depend on each other** — e.g. clues in one Manor room unlock understanding of another room’s puzzle.
3. **Not every room is a puzzle** — a room may only display clues, atmosphere, or narrative.
4. **Clues live in the world** — solutions should be discoverable from content in other rooms when designed that way (e.g. Art Workshop → Music Room).

## Le Manoir (summary)

Players navigate rooms from a **house plan** (carte). See [Manor overview](./manor/overview.md) and [rooms](./manor/rooms.md).

High-level room roles:

| Room | Role |
|------|------|
| Carte | Navigation hub |
| Salle à manger | Puzzle (clock) |
| Salle de musique | Puzzle (chords); clues in Atelier d’Art |
| Serre | Puzzle (plants); clues in Bibliothèque *(planned)* |
| Galerie | Puzzle (portrait order) |
| Atelier d’Art | Clues for the Music Room |
| Bibliothèque | Clues for several puzzles *(planned)* |
| Bureau | TBD — possibly a final Manor puzzle *(planned)* |

## Open questions

These are known unknowns; docs should stay honest about them.

| Question | Notes |
|----------|-------|
| What happens when the Manor is fully solved? | **TBD** — no end state defined yet |
| What are the other standalone parts of Enigmes? | **TBD** |
| How do parts relate in the UI (hub, menu, separate entry points)? | **TBD** |
| Is there shared progress / save across rooms or parts? | Not implemented; design TBD |
| Role of the Bureau | Possibly last Manor puzzle after others are solved — unconfirmed |

## Out of scope for this draft

- Exact puzzle solutions (keep spoilers out of public docs unless we add a separate spoiler section later)
- Marketing copy and final French flavour texts (placeholders exist in the UI)
