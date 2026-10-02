# Le Manoir — rooms

Design intent and implementation status per room. French name is canonical; English is for orientation.

---

## Carte (Map)

| | |
|--|--|
| **Role** | Hub — house plan |
| **Route** | `/manoir/carte` |
| **Status** | Partial |

Clickable hotspots open each existing room. Hotspot overlays are still visually in a debug state (visible hit areas). No puzzle.

---

## Salle à manger (Dining room)

| | |
|--|--|
| **Role** | Puzzle |
| **Route** | `/manoir/dining-room` |
| **Status** | Partial — mechanic present, solution check missing |
| **Clues** | TBD (where the correct setting is revealed is not documented yet) |

**Intent:** Set the clock correctly:

1. Position of the **digits hand**
2. Position of the **symbols / zodiac hand**
3. Correct **rotation of the zodiac panel**

**In code:** Dual clock interaction (hands + rotating symbol ring) works. No target combination or win feedback yet.

---

## Salle de musique (Music room)

| | |
|--|--|
| **Role** | Puzzle |
| **Route** | `/manoir/salle-de-musique` |
| **Status** | Partial — puzzle playable; win is only logged in the console |
| **Clues** | **Atelier d’Art** (art book) |

**Intent:** Organ/piano with keys that each play a sound. Find the correct **chords** (3 keys each). When a chord is found, the matching **icon above** lights up.

**In code:** 17 keys, audio, 8 chords, icon feedback. Completing all chords logs `WIN` — no player-facing reward or Manor progress yet.

---

## Atelier d’Art (Art Workshop)

| | |
|--|--|
| **Role** | Clue room (for the Music Room) |
| **Route** | `/manoir/atelier-d-arts` |
| **Status** | Partial — browsing/magnify UX present; no local puzzle |

**Intent:** An art book whose pictures contain clues for the Music Room. Each picture shows **3 items**; each item corresponds to a piano key sound. **One picture = one chord** to find in the Music Room.

**In code:** Open book, flip spreads, magnify artworks. No separate “solve” state — by design this room is for inspection, not a local win.

---

## Galerie (Gallery)

| | |
|--|--|
| **Role** | Puzzle |
| **Route** | `/manoir/galerie` |
| **Status** | Partial — swap mechanic present, correct order / win missing |
| **Clues** | TBD |

**Intent:** Eight portraits must be arranged in the **correct order**.

**In code:** Click-to-select then click-to-swap between portraits. No target order validation. A swap sound asset exists but is unused.

---

## Serre (Greenhouse)

| | |
|--|--|
| **Role** | Puzzle |
| **Route** | `/manoir/greenhouse` |
| **Status** | Stub |
| **Clues** | **Bibliothèque** (planned) |

**Intent (design only):**

- Place different **plants** on set positions.
- More plants than slots — the player must **identify** the right plants from **text descriptions**.
- Descriptions / identification clues live in the **Library**.

**In code:** Placeholder page (`greenhouse works!`). Assets on disk are not wired yet.

---

## Bibliothèque (Library)

| | |
|--|--|
| **Role** | Clue room (several puzzles) |
| **Route** | *none yet* |
| **Status** | Planned |
| **Folder note** | Study/library-related image assets may already exist under `assets` without a page |

**Intent:** A shelf of books. Books contain **clues for different puzzles**, including (at least) the Serre plant descriptions. Exact book list and which clue maps to which puzzle: **TBD**.

---

## Bureau (Office)

| | |
|--|--|
| **Role** | TBD |
| **Route** | *none yet* |
| **Status** | Planned |

**Intent (provisional):** Possibly the **last Manor puzzle**, solvable only after the other Manor puzzles are solved. Purpose still to be decided.

---

## Summary table

| Room | Type | Route | Status |
|------|------|-------|--------|
| Carte | Hub | `manoir/carte` | Partial |
| Salle à manger | Puzzle | `manoir/dining-room` | Partial |
| Salle de musique | Puzzle | `manoir/salle-de-musique` | Partial |
| Atelier d’Art | Clues → music | `manoir/atelier-d-arts` | Partial |
| Galerie | Puzzle | `manoir/galerie` | Partial |
| Serre | Puzzle | `manoir/greenhouse` | Stub |
| Bibliothèque | Clues (multi) | — | Planned |
| Bureau | TBD (maybe finale) | — | Planned |

## Manor completion

**What happens when every Manor puzzle is solved?** — **TBD.** Document this here when the design is fixed.
