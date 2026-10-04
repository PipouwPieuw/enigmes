# Architecture

Front-end technical overview. Keep this aligned with the code; product intent lives under [game design](./game-design.md) and [Manor docs](./manor/overview.md).

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Angular 19 — standalone components, no NgModules |
| Language | TypeScript |
| Styling | SCSS; BEM blocks prefixed with `app_` |
| Routing | `@angular/router` via `provideRouter` |
| Tests | Karma + Jasmine |
| Icons | Custom webfont under `src/assets/fonticon/` |

Dependencies present but **not used in application code today:** `jquery`, `jquery-ui`, `@angular/cdk`, plus unused `@angular/forms` / `@angular/animations`. Prefer removing the jQuery stack; keep CDK only if modal a11y or Véranda drag-drop will use it soon. See [technical audit](./technical-audit.md).

## High-level structure

```
src/
├── app/
│   ├── app.component.*      # Shell + temporary debug nav
│   ├── app.config.ts        # Zone + router providers
│   ├── app.routes.ts        # Manor routes
│   ├── components/ui/       # Shared UI (top-bar, modal)
│   └── pages/manor/         # Manor pages (one folder per room)
├── assets/
│   ├── images/manor/…       # Room art
│   ├── sound/manor/…        # Room audio
│   ├── icons/               # SVG sources for webfont glyphs
│   └── fonticon/            # Compiled icon font
└── styles/                  # Global SCSS (abstracts, base, vendors)
```

## Routing

Routes are defined in `src/app/app.routes.ts`. All current routes belong to the Manor:

| Path | Title | Component |
|------|-------|-----------|
| `manoir/carte` | Carte | `MapComponent` |
| `manoir/atelier-d-arts` | Atelier d'Art | `ArtRoomComponent` |
| `manoir/salle-de-musique` | Salle de musique | `MusicRoomComponent` |
| `manoir/galerie` | Galerie | `GalleryComponent` |
| `manoir/veranda` | Véranda | `VerandaComponent` |
| `manoir/salle-a-manger` | Salle à manger | `DiningRoomComponent` |

Notes:

- Default `''` → `manoir/carte`; unknown paths redirect via `**`.
- Legacy paths redirect: `manoir/serre` / `manoir/greenhouse` → `veranda`; `manoir/dining-room` → `salle-a-manger`.
- In-app navigation uses `routerLink`.
- **Planned routes:** `manoir/bibliotheque`, `manoir/salle-de-divination`, `manoir/cuisine`, `manoir/bureau`.
- Future standalone game parts will likely use their own path prefixes (to be decided).

## Shared UI

| Component | Role |
|-----------|------|
| `TopBarComponent` | Optional back link to the map + info button |
| `ModalComponent` | Simple overlay for page explanation text |

Room pages typically include:

```html
<app-top-bar [backLink]="'/manoir/carte'" [pageText]="pageText"></app-top-bar>
```

## State & game progress

There is **no shared service or store** for puzzle progress. Each page owns its local state. Completing a puzzle (e.g. all music chords) does not yet unlock other rooms or persist.

When Manor (or multi-part) progress is designed, this is the main architectural gap to fill.

## Styles

- Global entry: `src/styles.scss` → `styles/main.scss`
- Components import tokens/mixins via `@use ".../styles/includes.scss" as *;`
- Conventions: see `.cursor/rules/scss-conventions.mdc`
- Accessibility expectations: see `.cursor/rules/accessibility.mdc` (not fully applied in templates yet)

## Build & deploy

| Command | Output |
|---------|--------|
| `ng build` / `npm run build` | `dist/enigmes` |
| `npm run buildprod` | `--output-path dist/rutabaga --base-href /rutabaga/` |

`buildprod` targets a subpath publish setup. Output lands in `dist/rutabaga/browser/` (Angular application builder). Do **not** point `--output-path` at `docs/` — that folder holds project markdown.

## Conventions pointer

| Topic | Source of truth |
|-------|-----------------|
| Angular patterns | `.cursor/rules/angular-conventions.mdc` |
| SCSS / BEM | `.cursor/rules/scss-conventions.mdc` |
| Accessibility | `.cursor/rules/accessibility.mdc` |
| Project philosophy | `.cursor/rules/project-standards.mdc` |
