# Le Manoir — rooms

Design intent and implementation status per room. French name is canonical; English is for orientation.

Murder facts revealed by puzzles: **Who** (Galerie), **What** (Cuisine), **Where** (Salle de musique), **When** (Salle à manger). Validated together in the **Bureau**. See [overview](./overview.md).

---

## Carte (Map)

| | |
|--|--|
| **Role** | Hub — house plan |
| **Route** | `/manoir/carte` |
| **Status** | Partial |

Clickable hotspots open each existing room. Hotspot overlays are still visually in a debug state (visible hit areas). No puzzle.

**Shared chrome (all rooms):** top bar with **back to map** and **info** (modal for the current page).

---

## Galerie (Gallery)

| | |
|--|--|
| **Role** | Puzzle → reveals **Who** (the killer) |
| **Route** | `/manoir/galerie` |
| **Status** | Partial — swap mechanic + provisional win check; final order TBD |
| **Clues** | **Bibliothèque** |

**Intent:** Eight portraits on a wall. The player rearranges them into the correct positions by **swapping portraits**. Clues for the correct arrangement are in the Library.

**On solve:** The killer’s portrait is **highlighted** among the eight (exact highlight treatment TBD when implementing). That is the **Who** answer for the Bureau.

**In code:** Drag-and-drop swap is implemented; **click-to-select then click-to-swap** remains as a fallback. Provisional correct order `7…0` drives `isWin` (console only) — replace when design lands. A swap sound asset exists but is unused.

---

## Atelier d’Art (Art Workshop)

| | |
|--|--|
| **Role** | Clue room (for the Music Room) |
| **Route** | `/manoir/atelier-d-arts` |
| **Status** | Partial — browsing/magnify UX present; no local puzzle |

**Intent:** An art book whose pictures show locations with many items. Each picture encodes **3 items** that match organ key sounds — **one picture = one chord** for the Salle de musique. Reading UX should match the Library books (open, browse, magnify).

**In code:** Open book, flip spreads, magnify artworks. No local “solve” state — by design this room is for inspection only.

---

## Véranda (Veranda)

| | |
|--|--|
| **Role** | Puzzle → unlocks **clues for the Salle à manger** |
| **Route** | `/manoir/veranda` (redirects from `serre` / `greenhouse`) |
| **Status** | Stub |
| **Clues** | **Bibliothèque** |
| **Former name** | Serre / Greenhouse |

**Intent:**

- Empty plant slots, each with a **tag showing a plant name**.
- **More plants than slots** — the player must identify the right plants from Library texts.
- Identification / placement clues live in the **Bibliothèque**.

**On solve:** Show **clues needed to solve the dining-room clock** (presentation TBD when implementing).

**In code:** Placeholder page (`VerandaComponent`). Assets under `assets/images/manor/veranda/` are not wired yet. Prefer Angular CDK drag-drop or click-to-place — not jQuery.

---

## Salle de musique (Music room)

| | |
|--|--|
| **Role** | Puzzle → reveals **Where** (crime location) |
| **Route** | `/manoir/salle-de-musique` |
| **Status** | Partial — puzzle playable; win is only logged in the console |
| **Clues** | **Atelier d’Art** (art book) |

**Intent:** An organ; each key plays a different sound. Sounds correspond to items visible in the Atelier d’Art pictures. Each picture contains **3 matching items** → play a **chord of 3 keys** per picture. A correct chord lights the corresponding **logo on the organ frame**.

**On solve:** The organ shows / reveals the **location where the crime took place** (**Where** for the Bureau). Presentation TBD.

**In code:** Keys, audio, chords, icon feedback. Completing all chords logs `WIN` — no player-facing murder reveal or Manor progress yet.

---

## Salle à manger (Dining room)

| | |
|--|--|
| **Role** | Puzzle → reveals **When** (hour of the crime) |
| **Route** | `/manoir/salle-a-manger` |
| **Status** | Partial — mechanic + provisional single-combination win; design is **3 combinations** |
| **Clues** | **Véranda** (after that puzzle is solved) |

**Intent:** A clock with **two hands**, plus a disc of the **12 astrological signs**. A **frame** around the dial (to be added — currently dial only) will hold **indicators**. The player sets:

1. Position of hand A  
2. Position of hand B  
3. Rotation / position of the **zodiac disc**

into each of **3 valid combinations**. Each valid combination lights an **indicator on the clock frame**. After all three are entered, the clock reveals the **hour of the crime** (**When**). Exact reveal treatment TBD when implementing.

**In code:** Dual clock interaction (hands + rotating symbol ring) works. Provisional single target `digits 3 / symbols 8 / ring 5` drives `isWin` (console only) — replace with 3-combination validation + frame indicators when art/numbers land.

---

## Salle de divination (Divination room)

| | |
|--|--|
| **Role** | Puzzle → unlocks **clues for the Cuisine** |
| **Route** | `/manoir/salle-de-divination` |
| **Status** | Stub |
| **Clues** | **Bibliothèque** |

**Intent:** A set of **tarot cards**. The player clicks them in the **correct order**. Clues for the order are in the Library.

**On solve:** Cards **flip** and show clues needed to solve the **Cuisine** puzzle.

**In code:** Placeholder page (`DivinationRoomComponent`).

---

## Cuisine (Kitchen)

| | |
|--|--|
| **Role** | Puzzle → reveals **What** (the weapon) |
| **Route** | `/manoir/cuisine` |
| **Status** | Stub |
| **Clues** | **Salle de divination** (after that puzzle is solved) |

**Intent:** Knives and other deadly cooking tools must be **paired with symbols**. Clues come from the solved Divination room.

**On solve:** The kitchen reveals the **weapon of the crime** (**What** for the Bureau). Presentation TBD.

**In code:** Placeholder page (`KitchenComponent`).

---

## Bibliothèque (Library)

| | |
|--|--|
| **Role** | Clue room (several puzzles) |
| **Route** | `/manoir/bibliotheque` |
| **Status** | Stub |

**Intent:** Shelves of **books and journals**. Clicking one opens a readable book — **same interaction pattern as the Atelier d’Art book**.

**Clues hosted here (by design):**

| Target puzzle | Clue content (high level) |
|---------------|---------------------------|
| Galerie | Portrait order / arrangement |
| Véranda | Plant identification / placement |
| Salle de divination | Tarot click order |

Exact book/journal list and spoiler-safe wording: still to be written (optional spoiler appendix later).

**In code:** Placeholder page (`LibraryComponent`).

---

## Bureau (Study)

| | |
|--|--|
| **Role** | **Resolution** — validate the Manor |
| **Route** | `/manoir/bureau` |
| **Status** | Stub |

**Intent:** Detective-movie **board**. Once the player has the four crime facts (Who / What / Where / When), they **pin the correct clues** on the board.

**Access:** Always reachable from the map. Wrong pins fail; no hard lock on entry.

**On correct accusation:**

1. **Now:** show a **Win message in a modal**.
2. **Later:** also validate / mark Le Manoir complete on a future global hub.

**In code:** Placeholder page (`StudyComponent`). Always linked from the map.

---

## Summary table

| Room | Type | Route | Murder / reward | Status |
|------|------|-------|-----------------|--------|
| Carte | Hub | `manoir/carte` | — | Partial |
| Galerie | Puzzle | `manoir/galerie` | Reveals **Who** | Partial |
| Atelier d’Art | Clues → music | `manoir/atelier-d-arts` | — | Partial |
| Véranda | Puzzle | `manoir/veranda` | Clues → Salle à manger | Stub |
| Salle de musique | Puzzle | `manoir/salle-de-musique` | Reveals **Where** | Partial |
| Salle à manger | Puzzle | `manoir/salle-a-manger` | Reveals **When** | Partial |
| Salle de divination | Puzzle | `manoir/salle-de-divination` | Clues → Cuisine | Stub |
| Cuisine | Puzzle | `manoir/cuisine` | Reveals **What** | Stub |
| Bibliothèque | Clues (multi) | `manoir/bibliotheque` | Clues → Galerie, Véranda, Divination | Stub |
| Bureau | Resolution | `manoir/bureau` | Accuse with Who / What / Where / When | Stub |

## Manor completion

1. Solve the puzzle rooms that yield the four facts (and their clue-chain rooms as needed).  
2. Pin the correct **Who / What / Where / When** on the Bureau board.  
3. Show a **Win modal**; later also mark the Manor complete on the global hub.
