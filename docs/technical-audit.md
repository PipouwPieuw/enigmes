# Technical audit

Snapshot of the front-end stack and code quality. Product/design status lives in [game design](./game-design.md) and [rooms](./manor/rooms.md); actionable follow-ups are in [TODO](./TODO.md) §8.

**Verdict:** Healthy **Angular 19 shell** (standalone, strict TypeScript, application builder). Idioms catch-up (§8.2) is largely done; remaining gaps are tooling, lazy routes, and fuller signal adoption (§8.3).

---

## Stack health

| Area | Status | Notes |
|------|--------|-------|
| Angular | Good | `@angular/*` **19.2.x**, application builder, `bootstrapApplication` |
| TypeScript | Good | **5.8**, `strict` + `strictTemplates` |
| Component model | Good | Standalone only; no NgModules |
| Framework idioms | Good | `@if`/`@for`, `input()`, OnPush; subset of puzzle state still mutable / not fully signal-based |
| Dependencies | Good | jQuery / Forms / Animations / direct `sass` removed; CDK kept for modal a11y |
| Tests | Weak | Scaffold `should create` only; Karma repaired |
| Lint / CI | Missing | No ESLint, Prettier, or CI config in repo |
| Deploy | Good | Relative assets + `routerLink` + `buildprod` → `dist/rutabaga`; `public/` favicon wired; French routes + redirects |

---

## What is already solid

- Standalone bootstrap with zone event coalescing
- Clear folder split: `pages/manor/{room}` vs `components/ui`
- Strict compiler options
- SCSS architecture skeleton (`abstracts` / `base` / `vendors` + `includes.scss`)
- No `innerHTML` / sanitizer bypasses (low XSS surface today)
- Cursor rules document intended Angular / SCSS / a11y standards

---

## Findings

### 1. Angular patterns (mostly modernized)

Control flow (`@if` / `@for`), `input()` on TopBar/Modal, OnPush on UI + rooms, and typed room/chord/clock arrays are in place. Still ahead for §8.3: lazy `loadComponent`, broader `signal` / `computed` for puzzle state.

### 2. TypeScript quality

- Room/chord/clock data typed as arrays/interfaces (was `: object` + `keyvalue`)
- Widespread `var` / `==` remain in older puzzle logic
- Music-room `playingSound` is a `signal` (assignment bug fixed earlier)
- Broken manor barrel removed

### 3. Routing & deploy

- In-app navigation uses `routerLink`; assets are base-href safe; `buildprod` → `dist/rutabaga`
- `''` redirect + `**` wildcard present
- French path segments (`serre`, `salle-a-manger`) with redirects from old English URLs
- `index.html` uses `lang="fr"`; `public/` favicon copied into the build

### 4. Accessibility

Modal dialog a11y (CDK focus trap, Escape, `role="dialog"`) and baseline `aria-label` / `alt` landed in §8.1. Remaining room-level a11y (gallery selection state, map polish, etc.) is tracked in product TODO §4.

### 5. Dependencies

| Package | Verdict |
|---------|---------|
| Core Angular (common, router, platform-*, etc.) | Keep |
| `rxjs`, `zone.js`, `tslib` | Keep |
| `jquery`, `jquery-ui`, `jqueryui`, `@types/jquery*` | Removed |
| `@angular/forms`, `@angular/animations` | Removed until needed |
| `@angular/cdk` | Kept (modal a11y; planned Serre drag-drop) |
| Direct `sass` dependency | Removed (CLI Sass) |

No urgent major-version upgrade required; finish idioms on 19.x before jumping to 20+.

### 6. SCSS

- Empty stubs still forwarded (`_buttons`, `_typography`)
- Legacy vendor prefixes in transform/placeholder mixins
- Design tokens underused; rooms hardcode hex + debug colours
- Google Fonts loaded via SCSS `@import url(...)` (prefer `<link>` in `index.html` or self-host)
- BEM outliers (greenhouse hyphen block, music-room `.organ_*`)

### 7. Tests & tooling

- Specs are mostly boilerplate `should create`
- Karma styles/assets repaired; AppComponent spec updated in §8.1
- No `ng lint` / ESLint / Prettier / CI pipeline

### 8. Performance (acceptable at current scale)

- No OnPush; template methods (`isOpen()`); `keyvalue` and array recreation each CD
- Worth cleaning when puzzle state and room count grow; not the first fire to put out

---

## Recommended modernization tracks

### Must (correctness / deploy / baseline a11y)

1. `routerLink` instead of absolute `href`
2. Relative (or base-href-aware) asset URLs
3. Fix `buildprod` output path; verify under `/rutabaga/`
4. Fix music-room `playingSound` assignment bug
5. Modal + icon-button accessibility (CDK Dialog or equivalent)
6. Image `alt` / accessible names on interactive controls
7. Repair Karma styles/assets + broken AppComponent spec
8. Default route redirect (+ wildcard)

### Should (Angular 19 idioms + hygiene)

9. `@if` / `@for` migration; drop unused `CommonModule`
10. `input()` migration; consider OnPush
11. Typed models instead of `object` / `keyvalue` soup
12. Remove jQuery stack; decide CDK keep-and-use vs remove
13. Remove unused Forms / Animations packages
14. Stable arrays instead of `[].constructor(n)`; strip debug UI/logs
15. French `lang` + consistent French routes
16. Wire favicon / `public` into the build
17. Update Cursor Angular conventions to match modern patterns

### Nice (scale)

18. Lazy-loaded room routes
19. Signals for puzzle state; shared progress service (product-driven)
20. SCSS cleanup (stubs, prefixes, tokens)
21. Real unit tests for puzzle logic
22. `angular-eslint` + Prettier + CI (`build` / `test`)
23. Optional later: Vitest, zoneless, self-hosted fonts

---

## Relation to product roadmap

Technical work can proceed **in parallel** with Manor content:

- Deploy/routing/a11y fixes protect everything you ship next
- Dep cleanup reduces noise before adding Serre drag-drop (prefer **CDK**, not jQuery)
- Signals / progress service pair naturally with puzzle win conditions

See [TODO §8 — Technical modernization](./TODO.md#8-technical-modernization).
