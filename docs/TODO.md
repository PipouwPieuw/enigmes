# TODO / Roadmap

Living checklist for **Enigmes**. Ordered roughly by dependency: finish playable Manor loops before multi-part scaffolding and polish. Technical modernization can run in parallel — see §8 and [technical-audit.md](./technical-audit.md).

Legend: `[ ]` open · `[x]` done · `(blocked)` waiting on a design decision

---

## 0. Design decisions (unblockers)

These should be answered before some implementation work can finish properly.

- [x] Define Manor win structure: *Clue*-style murder — **Who / What / Where / When**, validated in the Bureau
- [x] Decide the role of the **Bureau** — resolution room (detective board / accusation)
- [x] Decide where **Salle à manger** clues live — unlocked by solving the **Véranda**
- [x] Decide where **Galerie** order clues live — **Bibliothèque**
- [x] Decide which puzzles the **Bibliothèque** feeds — Galerie, Véranda, Salle de divination
- [x] Define **post-accusation** UX — Win modal now; later mark Manor complete on a global hub
- [x] Decide Bureau **gating** — always accessible; wrong pins fail
- [x] Lock **Salle à manger** structure — **3 combinations**; indicators on a **new clock frame** (art/values TBD)
- [x] Confirm **Véranda** plant set — more plants than slots
- [x] Confirm **Galerie** interaction — drag-and-drop + click fallback (already in code)
- [ ] Lock **reveal treatments** when implementing each puzzle (killer highlight, organ location, kitchen weapon, clock hour, Véranda→clock clues, Divination card flip)
- [ ] Lock the **3 dining-room combination values** + frame indicator art
- [ ] List which books/journals each **Bibliothèque** shelf item carries (spoiler appendix optional)
- [ ] Define how many other **standalone parts** exist (names + high-level concept)
- [ ] Decide entry UX for multiple parts (home screen / hub / separate URLs)
- [ ] Decide progress model: per-room, per-part, persistence (localStorage?), reset

---

## 1. Le Manoir — finish existing rooms

### Carte
- [ ] Remove or hide debug hotspot styling (red overlays)
- [ ] Restore proper hover / hit-area behaviour
- [ ] Wire hotspots for **Bibliothèque**, **Bureau**, **Salle de divination**, **Cuisine**, and renamed **Véranda** when those rooms exist
- [ ] Replace placeholder info text with real copy
- [ ] Accessible names on room hotspots (not `title` alone)

### Salle de musique
- [ ] Replace `console.log("WIN")` with player feedback + **Where** reveal (crime location on/around the organ)
- [ ] Report completion to a shared Manor progress layer (when it exists)
- [ ] Fix pause/reset bug (`playingSound == 0` should assign) — verify if still open after modernization
- [ ] Remove debug keyboard styling (blue backgrounds)
- [ ] Replace placeholder info text
- [ ] Verify chord ↔ Atelier d’Art picture mapping against final art
- [ ] Stop recreating key/chord arrays in the template if any remain (`[].constructor(n)` → stable arrays)

### Atelier d’Art
- [ ] Confirm each artwork clearly encodes 3 sound-items → one chord
- [ ] Replace placeholder info text (explain that pictures are clues for the organ)
- [ ] Polish magnify / navigation if needed (no local win required)
- [ ] Keep book UX aligned with future Bibliothèque readers
- [ ] Accessible names on prev/next / magnify controls; meaningful `alt` on artworks

### Galerie
- [ ] Define and encode the **correct portrait order** (provisional reverse order `7…0` in code — confirm/replace when design lands)
- [x] Swap interaction: drag-and-drop + click fallback (keep both)
- [ ] Add win detection + player feedback: **highlight the killer** portrait (**Who**) — treatment TBD when implementing
- [ ] Play `switch.wav` (or final SFX) on swap
- [ ] Remove debug selection styling if still placeholder blue
- [ ] Replace placeholder info text
- [ ] Report completion to Manor progress (when it exists)
- [ ] Accessible selection / drag state (`aria-pressed` / live feedback)

### Salle à manger
- [ ] Replace single provisional target with **3 valid combinations** (hands + zodiac disc; values TBD)
- [ ] Add **clock frame** art around the dial with **3 indicators** (one lights per valid combo)
- [ ] After all 3 combinations: reveal **When** (hour of the crime) — treatment TBD when implementing
- [ ] Wire clue source to **solved Véranda** reward
- [ ] Replace placeholder info text
- [ ] Report completion to Manor progress (when it exists)
- [ ] Accessible labels on hand / ring controls

### Véranda
- [x] **Code rename pass:** Serre/Greenhouse → Véranda (`VerandaComponent`, route, map, debug nav, assets folder)
- [x] Route `manoir/veranda` + redirects from `serre` / `greenhouse`
- [ ] Design plant set: **more plants than tagged slots**
- [ ] Write identification texts (to appear in Bibliothèque)
- [ ] Build placement UI (prefer **Angular CDK** drag-drop or click-to-place — not jQuery)
- [ ] Add win detection + feedback
- [ ] On solve: show **clues for the Salle à manger clock** — treatment TBD when implementing
- [ ] Replace stub page; wire assets under `assets/images/manor/veranda/` or final art
- [ ] Report completion to Manor progress (when it exists)

---

## 2. Le Manoir — new rooms

### Bibliothèque
- [x] Create page + route (`manoir/bibliotheque`)
- [ ] Shelf / books & journals UI
- [ ] Reader UX aligned with Atelier d’Art book
- [ ] Book content: Galerie portrait-order clues
- [ ] Book content: Véranda plant clues
- [ ] Book content: Salle de divination tarot-order clues
- [ ] Map hotspot + assets
- [ ] Info copy

### Salle de divination
- [x] Create page + route (`manoir/salle-de-divination`)
- [ ] Tarot set UI — click cards in correct order
- [ ] Win: cards flip and show **Cuisine** clues
- [ ] Map hotspot + assets
- [ ] Info copy
- [ ] Report completion to Manor progress (when it exists)

### Cuisine
- [x] Create page + route (`manoir/cuisine`)
- [ ] Pair deadly tools with symbols
- [ ] Clues consumed from solved Divination
- [ ] Win: reveal **What** (weapon)
- [ ] Map hotspot + assets
- [ ] Info copy
- [ ] Report completion to Manor progress (when it exists)

### Bureau
- [x] Create page + route (`manoir/bureau`) — always accessible from the map
- [ ] Detective board UI — pin **Who / What / Where / When**
- [ ] Validate accusation; on success show **Win modal**
- [ ] Later: also mark Manor complete on the future global hub
- [ ] Map hotspot + assets
- [ ] Info copy

---

## 3. Le Manoir — game systems

- [ ] Shared **progress service** (which rooms/puzzles are solved; which murder facts are known)
- [ ] Optional: persist progress locally
- [ ] Manor completion: Win modal from Bureau; later hub flag for part complete
- [x] Consistent French route paths (`dining-room` → `salle-a-manger`, `serre`/`greenhouse` → `veranda`, etc.) + redirects from old URLs if needed
- [x] Rename: `serre` → `veranda` (+ redirects)
- [x] Default app entry: redirect `/` → Manor carte or future game hub
- [x] Wildcard route for unknown URLs
- [ ] Remove temporary debug nav list from `app.component` when no longer needed
- [x] Replace raw `href` with `routerLink` for all in-app navigation (shell, top-bar, map)

---

## 4. Cross-cutting product / UX

- [ ] Real French explanation texts for every existing page (`pageText` / modal)
- [ ] Accessibility pass (ARIA on icon controls, modal dialog pattern, image `alt`, keyboard) — see `.cursor/rules/accessibility.mdc`
- [x] Set `lang="fr"` on `index.html`
- [ ] Strip remaining debug colours / WIP styles across rooms
- [ ] Align BEM naming outliers (e.g. music-room organ classes) with `app_` conventions
- [ ] Expand or apply design tokens instead of one-off hex where practical
- [ ] Sound pass: missing SFX, volume, overlap behaviour
- [ ] Responsive / small-viewport strategy for fixed puzzle canvases (or documented desktop-only)

---

## 5. Engineering hygiene

- [x] Fix or remove broken barrel `src/app/pages/manor/index.ts`
- [x] Remove unused jQuery stack (`jquery`, `jquery-ui`, `jqueryui`, `@types/jquery`, `@types/jqueryui`)
- [x] Remove unused `@angular/forms` and `@angular/animations` until needed
- [x] Keep `@angular/cdk` only if used for modal a11y / Véranda drag-drop; otherwise remove
- [x] Fix `buildprod`: relative output path (`dist/rutabaga`, not `/docs` or `docs/`); verify `base-href /rutabaga/`
- [x] Fix absolute `/assets/...` in TS and SCSS so subpath deploy works
- [x] Wire `public/` (favicon) into the build if required by the host setup
- [ ] Add SPA fallback for deep links on the static host
- [x] Fix Karma test config (`styles.scss`, include `src/assets`); repair stale `app.component.spec.ts`
- [x] Typed models for room/puzzle data instead of loose `object` where we touch that code
- [ ] Prefer `const`/`let` and `===`; remove debug `console.log` from puzzle flows

---

## 6. Documentation (keep in sync)

- [x] Align Manor docs with murder goal + full room graph (overview, rooms, game-design)
- [ ] Update [rooms.md](./manor/rooms.md) / [architecture.md](./architecture.md) when Véranda rename and new rooms ship
- [ ] Document other standalone parts when named
- [ ] Optional: spoiler appendix (solutions) separate from public design docs
- [ ] Keep this TODO and [technical-audit.md](./technical-audit.md) checked / refreshed as work lands
- [x] Update `.cursor/rules/angular-conventions.mdc` when modern patterns are adopted (`@if`, `input()`, `routerLink`, relative assets)

---

## 7. Beyond the Manor (later)

- [ ] Design first non-Manor standalone part
- [ ] App shell / hub to choose a part
- [ ] Shared patterns for “part completed” across parts
- [ ] (blocked) Global Enigmes endgame — only if parts are meant to combine

---

## 8. Technical modernization

Full write-up: [technical-audit.md](./technical-audit.md).  
Stack is on **Angular 22**; §8.1 / §8.2 are done. Remaining work is scale/tooling (§8.3).

### 8.1 Must (do soon — correctness / deploy / a11y baseline)

- [x] Migrate all in-app links to `routerLink` (no absolute `href` to app routes)
- [x] Make asset URLs base-href safe (drop leading `/` or prefix with `APP_BASE_HREF`)
- [x] Fix `buildprod` output path + verify production build under `/rutabaga/`
- [x] Fix music-room `playingSound` assignment bug
- [x] Bring Modal up to dialog a11y (focus trap, Escape, `role="dialog"`, `aria-modal`, restore focus) — prefer CDK
- [x] Accessible names on top-bar / modal icon controls (not `title` alone)
- [x] Add `alt` (or decorative `alt=""`) on meaningful / decorative images
- [x] Add `path: ''` redirect + wildcard route
- [x] Repair Karma (`styles.scss`, assets) and broken AppComponent unit test

### 8.2 Should (Angular 19 idioms + cleanup)

- [x] Migrate templates to `@if` / `@for` (with `track`); remove unused `CommonModule`
- [x] Migrate `@Input()` → `input()` on TopBar / Modal (then rooms as touched)
- [x] Introduce `ChangeDetectionStrategy.OnPush` on UI + room components after input/signal cleanup
- [x] Replace `: object` + `keyvalue` with typed arrays / `Record<>` models
- [x] Replace template `[].constructor(n)` with stable readonly arrays
- [x] Dependency diet: remove jQuery stack; remove unused Forms/Animations; CDK keep-or-cut
- [x] Optional: drop direct `sass` dependency if CLI Sass is enough
- [x] Set document language to French; normalize route path language
- [x] Ensure favicon ships in production build
- [x] Align Cursor Angular conventions with adopted modern patterns

### 8.3 Nice (scale / tooling)

- [x] Lazy-load Manor rooms with `loadComponent`
- [x] Adopt `signal` / `computed` for puzzle state (keys, chords, clock, gallery selection)
- [x] SCSS cleanup: delete empty mixin stubs; trim obsolete vendor prefixes; use color tokens
- [x] Load Outfit via `<link>` (or self-host) instead of SCSS `@import url(...)`
- [x] Real unit tests for chord matching, gallery order, clock validation, modal toggle
- [x] Add `angular-eslint` (+ optional Prettier) and an `npm run lint` script
- [x] CI pipeline: install → lint → test → build
- [x] Unit tests run on Vitest; zoneless remains unevaluated
- [x] Upgrade from Angular 19 to Angular 22 (Node 24)

---

## Suggested priority (near term)

1. **Playable existing:** Music **Where** reveal → Gallery order + killer highlight → Dining **3 combos** + frame indicators + **When**  
2. **Content:** Bibliothèque clue books (Galerie / Véranda / Divination) + Véranda placement puzzle  
3. **New chain:** Divination → Cuisine (**What**)  
4. **Systems:** progress service (facts + rooms) + map polish + remove debug UI  
5. **Bureau** accusation board + Win modal (hub flag later)  
6. **Tooling later:** Vitest / zoneless evaluation (§8.3) when useful  

---

*Last aligned with docs: Manor murder goal; Bureau always open + Win modal; dining = 3 combos + frame indicators; Véranda more-plants-than-slots; Galerie DnD+click; Serre→Véranda code rename done.*
