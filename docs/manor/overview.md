# Le Manoir — overview

The Manor is the first standalone part of Enigmes. The player investigates a **murder** in the style of *Clue*: navigate rooms from a **house plan** (carte du manoir), solve puzzles, gather four crime facts, then accuse in the Bureau.

## Murder goal

To complete Le Manoir, the player must discover and validate:

| Fact | Revealed by solving… |
|------|----------------------|
| **Who** — the killer | Galerie |
| **What** — the weapon | Cuisine |
| **Where** — the crime location | Salle de musique |
| **When** — the hour of the crime | Salle à manger |

Those four answers are entered in the **Bureau** (detective board). Correct pinning wins the Manor: for now a **Win modal**; later this will also mark the Manor as complete on a future global hub.

## Player flow

```
Carte (house plan)
 ├── Galerie
 ├── Atelier d’Art
 ├── Véranda
 ├── Salle de musique
 ├── Salle à manger
 ├── Salle de divination  (planned)
 ├── Cuisine              (planned)
 ├── Bibliothèque         (planned)
 └── Bureau              (planned — resolution)
```

1. Open the map (`/manoir/carte`).
2. Click a room hotspot to enter that room.
3. Explore: solve a puzzle, gather clues, or both.
4. Return to the map via the top bar (info button opens a modal for the current page).
5. Once the four crime facts are known, pin them on the board in the Bureau.

All rooms, including the **Bureau**, stay reachable from the map. Wrong pins on the board simply fail; there is no hard lock.

## Room roles

| Type | Meaning | Examples |
|------|---------|----------|
| **Puzzle room** | Player must perform a correct configuration / sequence; often **reveals one murder fact** (or clues for another puzzle) | Galerie, Véranda, Salle de musique, Salle à manger, Salle de divination, Cuisine |
| **Clue room** | Content helps solve puzzles elsewhere; no local “win” required | Atelier d’Art, Bibliothèque |
| **Hub** | Navigation only | Carte |
| **Resolution** | Enter the four crime facts to finish the Manor | Bureau |

A room can mix roles (local puzzle + reward that is a clue for elsewhere). Murder-fact reveals are the main through-line.

## Cross-room clue & reward graph

```
Bibliothèque ──clues──► Galerie ──solve──► reveals killer (Who)
Bibliothèque ──clues──► Véranda ──solve──► clues for Salle à manger
Bibliothèque ──clues──► Salle de divination ──solve──► clues for Cuisine

Atelier d’Art ──clues──► Salle de musique ──solve──► reveals crime location (Where)

Véranda clues ──► Salle à manger ──solve──► reveals hour of the crime (When)
Divination clues ──► Cuisine ──solve──► reveals weapon (What)

Who + What + Where + When ──► Bureau (accuse / pin on detective board)
```

## Shared UI in Manor pages

Every room page uses:

- **Top bar** — return to carte + info modal
- **Info modal** — page explanation text (still placeholder French copy on most pages)

## Implementation notes

- Routes live under the `manoir/…` path prefix (see [Architecture](../architecture.md)).
- There is **no shared Manor progress service** yet: solving a room does not unlock another or record completion globally.
- Route paths use French segments; document rooms by their **French display names**.
- Old paths `manoir/serre` and `manoir/greenhouse` redirect to `manoir/veranda`.
