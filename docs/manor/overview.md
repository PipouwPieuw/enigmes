# Le Manoir — overview

The Manor is the first standalone part of Enigmes. The player moves between rooms using a **house plan** (carte du manoir).

## Player flow

```
Carte (house plan)
 ├── Salle de musique
 ├── Atelier d’Art
 ├── Galerie
 ├── Serre
 ├── Salle à manger
 ├── Bibliothèque   (planned)
 └── Bureau         (planned)
```

1. Open the map (`/manoir/carte`).
2. Click a room hotspot to enter that room.
3. Explore: solve a puzzle, gather clues, or both.
4. Return to the map via the top bar.

Rooms are reachable freely from the map today. Future design may lock some rooms (e.g. Bureau only after other puzzles), but that is not implemented.

## Room roles

| Type | Meaning | Examples |
|------|---------|----------|
| **Puzzle room** | Player must perform a correct configuration / sequence | Salle à manger, Salle de musique, Galerie, Serre |
| **Clue room** | Content helps solve puzzles elsewhere; may have no local “win” | Atelier d’Art, Bibliothèque |
| **Hub** | Navigation only | Carte |
| **TBD** | Purpose not fixed | Bureau |

A room can theoretically mix roles (puzzle + local flavour), but the current design tends to split **where you act** and **where you read clues**.

## Cross-room clue links (designed)

```
Atelier d’Art  ──clues──►  Salle de musique
Bibliothèque   ──clues──►  Serre (+ other puzzles)
Bibliothèque   ──clues──►  (several rooms — TBD detail)
```

## Shared UI in Manor pages

Every room page (except the map’s back link) uses:

- **Top bar** — return to carte + info modal
- **Info modal** — page explanation text (still placeholder French copy)

## Implementation notes

- Routes live under the `manoir/…` path prefix (see [Architecture](../architecture.md)).
- There is **no shared Manor progress service** yet: solving a room does not unlock another or record completion globally.
- Path naming is mixed French/English in the current router (`greenhouse`, `dining-room` vs `salle-de-musique`); prefer documenting rooms by their **French display names**.
