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
4. **Clues live in the world** — solutions should be discoverable from content in other rooms when designed that way (e.g. Atelier d’Art → Salle de musique).

## Le Manoir (summary)

Players investigate a murder (*Clue*-style) by navigating rooms from a **house plan** (carte). They must find **Who / What / Where / When**, then accuse in the Bureau. See [Manor overview](./manor/overview.md) and [rooms](./manor/rooms.md).

| Room | Role |
|------|------|
| Carte | Navigation hub |
| Galerie | Puzzle — reveals **Who** (killer); clues in Bibliothèque |
| Atelier d’Art | Clues for the Salle de musique (art book) |
| Véranda | Puzzle — unlocks clock clues; clues in Bibliothèque *(stub)* |
| Salle de musique | Puzzle — reveals **Where**; clues in Atelier d’Art |
| Salle à manger | Puzzle — reveals **When**; clues from solved Véranda |
| Salle de divination | Puzzle — unlocks Cuisine clues; clues in Bibliothèque *(stub)* |
| Cuisine | Puzzle — reveals **What** (weapon); clues from solved Divination *(stub)* |
| Bibliothèque | Clue books for Galerie, Véranda, Divination *(stub)* |
| Bureau | Resolution — pin Who / What / Where / When *(stub)* |

## Open questions

| Question | Notes |
|----------|-------|
| Exact reveal treatments (killer highlight, organ location, kitchen weapon, clock hour, Véranda→clock clues, Divination flip) | Decide when implementing each puzzle |
| Exact 3 dining-room combination values + frame indicator art | 3 combos decided; numbers/art TBD |
| What are the other standalone parts of Enigmes? | **TBD** |
| How do parts relate in the UI (hub, menu, separate entry points)? | **TBD** — Bureau win will later mark Manor complete on that hub |
| Is there shared progress / save across rooms or parts? | Not implemented; design TBD |

## Out of scope for this draft

- Exact puzzle solutions (keep spoilers out of public docs unless we add a separate spoiler section later)
- Marketing copy and final French flavour texts (placeholders exist in the UI)
