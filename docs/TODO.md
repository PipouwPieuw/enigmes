# TODO / Roadmap

Living checklist for **Enigmes**. Ordered roughly by dependency: finish playable Manor loops before multi-part scaffolding and polish. Technical modernization can run in parallel — see §8 and [technical-audit.md](./technical-audit.md).

Legend: `[ ]` open · `[x]` done · `(blocked)` waiting on a design decision

---

## 0. Design decisions (unblockers)

These should be answered before some implementation work can finish properly.

- [ ] Define what happens when **Le Manoir** is fully solved
- [ ] Decide the role of the **Bureau** (finale after other puzzles? something else?)
- [ ] Decide where **Salle à manger** clues live (Bibliothèque? elsewhere?)
- [ ] Decide where **Galerie** order clues live
- [ ] List which clues each **Bibliothèque** book carries
- [ ] Define how many other **standalone parts** exist (names + high-level concept)
- [ ] Decide entry UX for multiple parts (home screen / hub / separate URLs)
- [ ] Decide progress model: per-room, per-part, persistence (localStorage?), reset

---

## 1. Le Manoir — finish existing rooms

### Carte
- [ ] Remove or hide debug hotspot styling (red overlays)
- [ ] Restore proper hover / hit-area behaviour
- [ ] Wire hotspots for **Bibliothèque** and **Bureau** when those rooms exist
- [ ] Replace placeholder info text with real copy
- [ ] Accessible names on room hotspots (not `title` alone)

### Salle de musique
- [ ] Replace `console.log("WIN")` with real player feedback
- [ ] Report completion to a shared Manor progress layer (when it exists)
- [ ] Fix pause/reset bug (`playingSound == 0` should assign)
- [ ] Remove debug keyboard styling (blue backgrounds)
- [ ] Replace placeholder info text
- [ ] Verify chord ↔ Atelier d’Art picture mapping against final art
- [ ] Stop recreating key/chord arrays in the template (`[].constructor(n)` → stable arrays)

### Atelier d’Art
- [ ] Confirm each artwork clearly encodes 3 sound-items → one chord
- [ ] Replace placeholder info text (explain that pictures are clues for the organ)
- [ ] Polish magnify / navigation if needed (no local win required)
- [ ] Accessible names on prev/next / magnify controls; meaningful `alt` on artworks

### Galerie
- [ ] Define and encode the **correct portrait order** (provisional reverse order `7…0` in code — confirm/replace when design lands)
- [ ] Add win detection + player feedback (`isWin` + console log exist; need player-facing UX)
- [ ] Play `switch.wav` (or final SFX) on swap
- [ ] Remove debug selection styling if still placeholder blue
- [ ] Wire clue source once designed
- [ ] Replace placeholder info text
- [ ] Report completion to Manor progress (when it exists)
- [ ] Accessible selection state (`aria-pressed` / live feedback)

### Salle à manger
- [ ] Define the **correct clock solution** (digits hand + symbols hand + zodiac rotation; provisional `3 / 8 / 5` in code — confirm/replace when design lands)
- [ ] Add validation + player feedback (`isWin` + console log exist; need player-facing UX)
- [ ] Wire clue source once designed
- [ ] Replace placeholder info text
- [ ] Report completion to Manor progress (when it exists)
- [ ] Accessible labels on hand / ring controls

### Serre
- [ ] Design plant set (more plants than slots) + position layout
- [ ] Write identification texts (to appear in Bibliothèque)
- [ ] Build placement UI (prefer **Angular CDK** drag-drop or click-to-place — not jQuery)
- [ ] Add win detection + feedback
- [ ] Replace stub page; wire existing greenhouse assets or final art
- [ ] Report completion to Manor progress (when it exists)

---

## 2. Le Manoir — new rooms

### Bibliothèque
- [ ] Create page + route (French path preferred, e.g. `manoir/bibliotheque`)
- [ ] Shelf / books UI
- [ ] Book content: Serre plant descriptions at minimum
- [ ] Book content: other puzzles’ clues as designed
- [ ] Map hotspot + assets
- [ ] Info copy

### Bureau
- [ ] Lock design (see §0)
- [ ] Create page + route (e.g. `manoir/bureau`)
- [ ] Implement puzzle (if finale: gate on other Manor completions)
- [ ] Map hotspot + assets
- [ ] Info copy

---

## 3. Le Manoir — game systems

- [ ] Shared **progress service** (which rooms/puzzles are solved)
- [ ] Optional: persist progress locally
- [ ] Optional: lock Bureau (or other rooms) until prerequisites are met
- [ ] Manor-level **completion** flow once §0 is decided (message, unlock, transition…)
- [x] Consistent French route paths (`greenhouse` → `serre`, `dining-room` → `salle-a-manger`, etc.) + redirects from old URLs if needed
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
- [ ] Align BEM naming outliers (e.g. greenhouse, music-room organ classes) with `app_` conventions
- [ ] Expand or apply design tokens instead of one-off hex where practical
- [ ] Sound pass: missing SFX, volume, overlap behaviour
- [ ] Responsive / small-viewport strategy for fixed puzzle canvases (or documented desktop-only)

---

## 5. Engineering hygiene

- [x] Fix or remove broken barrel `src/app/pages/manor/index.ts`
- [x] Remove unused jQuery stack (`jquery`, `jquery-ui`, `jqueryui`, `@types/jquery`, `@types/jqueryui`)
- [x] Remove unused `@angular/forms` and `@angular/animations` until needed
- [x] Keep `@angular/cdk` only if used for modal a11y / Serre drag-drop; otherwise remove
- [x] Fix `buildprod`: relative output path (`dist/rutabaga`, not `/docs` or `docs/`); verify `base-href /rutabaga/`
- [x] Fix absolute `/assets/...` in TS and SCSS so subpath deploy works
- [x] Wire `public/` (favicon) into the build if required by the host setup
- [ ] Add SPA fallback for deep links on the static host
- [x] Fix Karma test config (`styles.scss`, include `src/assets`); repair stale `app.component.spec.ts`
- [x] Typed models for room/puzzle data instead of loose `object` where we touch that code
- [ ] Prefer `const`/`let` and `===`; remove debug `console.log` from puzzle flows

---

## 6. Documentation (keep in sync)

- [ ] Update [rooms.md](./manor/rooms.md) when Serre / Bibliothèque / Bureau ship
- [ ] Document Manor win condition in [game-design.md](./game-design.md) when decided
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
Stack is already on **Angular 19**; §8.1 / §8.2 are done. Remaining work is scale/tooling (§8.3), not a framework upgrade.

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
- [ ] Later: evaluate Vitest; evaluate zoneless after signals are in place
- [x] Stay on Angular 19.x patches; plan 20+ only after control-flow / `input()` migration

---

## Suggested priority (near term)

1. **Design:** Manor win + clue locations for clock / gallery / library books  
2. **Playable:** Music win UX → Gallery order+win → Dining validation  
3. **New content:** Bibliothèque + Serre (clue ↔ puzzle pair; CDK not jQuery)  
4. **Systems:** progress service + map polish + remove debug UI  
5. **Bureau** once its role is fixed  
6. **Tooling later:** Vitest / zoneless evaluation (§8.3) when useful  

---

*Last aligned with docs + technical audit: Angular 19 idioms (§8.2) and most §8.3 tooling landed; Manor content/systems and Vitest/zoneless evaluation still open.*
