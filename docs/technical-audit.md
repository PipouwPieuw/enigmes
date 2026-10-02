# Technical audit

Snapshot of the front-end stack and code quality. Product/design status lives in [game design](./game-design.md) and [rooms](./manor/rooms.md); actionable follow-ups are in [TODO](./TODO.md) §8.

**Verdict:** Healthy **Angular 19 shell** (standalone, strict TypeScript, application builder), but much of the *application code* still follows **Angular 14–16 idioms**. This is a modernization pass, not a rewrite.

---

## Stack health

| Area | Status | Notes |
|------|--------|-------|
| Angular | Good | `@angular/*` **19.2.x**, application builder, `bootstrapApplication` |
| TypeScript | Good | **5.8**, `strict` + `strictTemplates` |
| Component model | Good | Standalone only; no NgModules |
| Framework idioms | Outdated | Still `*ngIf`/`*ngFor`, `@Input()`, no signals, no OnPush, no lazy routes |
| Dependencies | Bloated | Unused jQuery stack, Forms, Animations; CDK unused |
| Tests | Weak | Scaffold `should create` only; AppComponent spec stale; Karma styles path wrong |
| Lint / CI | Missing | No ESLint, Prettier, or CI config in repo |
| Deploy | Fragile | Absolute `/assets` + `href`; `buildprod` uses absolute `/docs` |

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

### 1. Angular patterns lag the framework version

| Current | Prefer |
|---------|--------|
| `*ngIf` / `*ngFor` / `*ngClass` | `@if` / `@for` (with `track`) / `[class.]` |
| `@Input()` | `input()` (and `output()` when needed) |
| Blanket `CommonModule` | Drop after control-flow migration |
| Default change detection | `OnPush` once inputs/signals settle |
| Eager route imports | `loadComponent` lazy routes as rooms grow |
| Mutable fields only | `signal` / `computed` for puzzle state |

Templates still allocate every CD cycle in places (`[].constructor(n)` in the music room; `keyvalue` on `object` maps).

### 2. TypeScript quality

- Loose `: object` for room/chord/clock data → forces `['key']` and `keyof object`
- `any[]` (dining-room indexes), widespread `var`, `==` instead of `===`
- Real bug: music room `this.playingSound == 0` (comparison, never clears state)
- Broken barrel: `pages/manor/index.ts` exports a non-existent module
- Dead imports (e.g. unused `KeyValue` type imports)

### 3. Routing & deploy

- In-app links use absolute `href` (`/manoir/...`) → full reloads; ignore `base-href`
- Asset URLs hardcode `/assets/...` in TS and SCSS → break under `/rutabaga/`
- `buildprod`: `--output-path /docs` is **filesystem-absolute** (risky on Windows); should be relative `docs` or `./docs`
- No `''` redirect or `**` wildcard
- Mixed French/English path segments
- `index.html` has `lang="en"` while the product is French
- Favicon / `public` not clearly wired into build `assets` (build only copies `src/assets`)

### 4. Accessibility

Zero `aria-*`, `role`, `alt`, or `.sr_only` usage under `src/app` despite mandatory rules in `.cursor/rules/accessibility.mdc`.

Critical gaps: modal is not a dialog (no focus trap / Escape / `aria-modal`); icon-only controls rely on `title`; map hotspots and many puzzle buttons lack accessible names.

### 5. Dependencies

| Package | Verdict |
|---------|---------|
| Core Angular (common, router, platform-*, etc.) | Keep |
| `rxjs`, `zone.js`, `tslib` | Keep |
| `jquery`, `jquery-ui`, `jqueryui`, `@types/jquery*` | **Remove** (unused; `@types/jqueryui` wrongly in dependencies) |
| `@angular/forms`, `@angular/animations` | **Remove** until actually used |
| `@angular/cdk` | **Keep only if** used soon for dialog / a11y / drag-drop (Serre); else remove |
| Direct `sass` dependency | Optional remove (CLI already provides Sass) |

No urgent major-version upgrade required; finish idioms on 19.x before jumping to 20+.

### 6. SCSS

- Empty stubs still forwarded (`_buttons`, `_typography`)
- Legacy vendor prefixes in transform/placeholder mixins
- Design tokens underused; rooms hardcode hex + debug colours
- Google Fonts loaded via SCSS `@import url(...)` (prefer `<link>` in `index.html` or self-host)
- BEM outliers (greenhouse hyphen block, music-room `.organ_*`)

### 7. Tests & tooling

- Specs are boilerplate; `app.component.spec.ts` still expects a non-existent “Hello, enigmes” `h1`
- Karma config points at missing `src/styles.css` and does not include `src/assets`
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
