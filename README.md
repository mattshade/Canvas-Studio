# Canvas Studio

**Canvas Studio** is a **pnpm monorepo** for a **Cursor-style “canvas” product**: a Vite + React **Canvas Intelligence** app (primary UI), a **mockup sandbox** for rapid UI experiments, an **Express** API server with **Drizzle ORM** (PostgreSQL), and shared **Zod** / **Orval** contract layers. The default `pnpm run dev` target is **`@workspace/canvas-intelligence`**.

Repository: **[github.com/mattshade/Canvas-Studio](https://github.com/mattshade/Canvas-Studio)**

---

## Table of contents

- [What’s in the box](#whats-in-the-box)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Root scripts](#root-scripts)
- [Workspace packages](#workspace-packages)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Database (Drizzle)](#database-drizzle)
- [API contracts & codegen](#api-contracts--codegen)
- [Canvas Intelligence specifics](#canvas-intelligence-specifics)
- [pnpm catalog & supply-chain policy](#pnpm-catalog--supply-chain-policy)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## What’s in the box

```
Canvas-Studio/
├── artifacts/
│   ├── canvas-intelligence/     # Main product UI (Vite, React, Radix, Tailwind v4, wouter)
│   ├── api-server/              # Express 5 + esbuild bundle + pino
│   └── mockup-sandbox/          # Secondary Vite app for mockups
├── lib/
│   ├── db/                      # Drizzle + Postgres schema
│   ├── api-zod/                 # Shared Zod types
│   ├── api-spec/                # Orval / OpenAPI codegen
│   └── api-client-react/        # React + TanStack Query client helpers
├── scripts/                     # Small TS utilities
├── pnpm-workspace.yaml          # Workspaces + version catalog + release-age policy
└── package.json                 # `dev` → canvas-intelligence
```

---

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **Node.js** | Current or Active LTS recommended. |
| **pnpm** | **Required.** The root `preinstall` script blocks npm/yarn. |
| **PostgreSQL** | For `@workspace/db` migrations / `drizzle-kit push` when you connect a real database. |

```bash
corepack enable   # optional, if you use Corepack
pnpm -v
```

---

## Install

```bash
git clone https://github.com/mattshade/Canvas-Studio.git
cd Canvas-Studio
pnpm install
```

---

## Root scripts

| Command | Description |
|---------|-------------|
| `pnpm run dev` | Runs **`@workspace/canvas-intelligence`** (`vite` dev server). |
| `pnpm run build` | `typecheck` then recursive `build` where defined. |
| `pnpm run typecheck` | Libs + `artifacts/*` and `scripts` that expose `typecheck`. |
| `pnpm run typecheck:libs` | `tsc --build` for shared TypeScript project references. |

One-liner for a full compile check before opening a PR:

```bash
pnpm run build
```

---

## Workspace packages

| Name | Path | Role |
|------|------|------|
| **@workspace/canvas-intelligence** | `artifacts/canvas-intelligence` | Primary **SPA**: React 19, **Vite 7**, **Tailwind CSS v4**, Radix UI, **wouter**, **TanStack Query** via `@workspace/api-client-react`, **Recharts**, **react-hook-form** + **zod**, **cmdk**, **sonner**, etc. Includes a **custom `mockupPreviewPlugin`** in `vite.config.ts` for in-editor mockup workflows. |
| **@workspace/api-server** | `artifacts/api-server` | **Express 5** API, **esbuild** output to `dist/`, **pino** logging. **Requires `PORT`**. |
| **@workspace/mockup-sandbox** | `artifacts/mockup-sandbox` | Isolated Vite app for design / component sandboxes. |
| **@workspace/db** | `lib/db` | **Drizzle** schema + `drizzle-kit`—expects **`DATABASE_URL`**. |
| **@workspace/api-zod** | `lib/api-zod` | Shared Zod models. |
| **@workspace/api-spec** | `lib/api-spec` | **Orval** config (`pnpm run codegen` in-package). |
| **@workspace/api-client-react** | `lib/api-client-react` | Typed client surface for React apps. |
| **@workspace/scripts** | `scripts` | Example `hello` script (`tsx`). |

---

## Local development

### Main app (default)

```bash
pnpm run dev
# or explicitly:
pnpm --filter @workspace/canvas-intelligence dev
```

- By default, **Vite** listens on **`http://localhost:5173`** (overridable with `PORT` in `vite.config.ts`).

### API server

The server must know **`PORT`**. From repo root:

```bash
PORT=3001 pnpm --filter @workspace/api-server dev
```

(`dev` script builds then runs the bundled `node` entry.)

### Mockup sandbox

```bash
pnpm --filter @workspace/mockup-sandbox dev
```

### Utility scripts

```bash
pnpm --filter @workspace/scripts hello
```

---

## Environment variables

| Variable | Used by | Purpose |
|----------|---------|---------|
| **`PORT`** | `api-server` | **Required** at runtime — HTTP listen port. |
| **`LOG_LEVEL`** | `api-server` | Optional pino level (see logger setup). |
| **`DATABASE_URL`** | `lib/db` / Drizzle CLI | Postgres URL for `pnpm --filter @workspace/db push`. |
| **`NODE_ENV`** | Bundlers / server | Standard optimization flags. |
| **`BASE_PATH`** | `canvas-intelligence` Vite | Public path prefix for assets (default `/`). |
| **`REPL_ID`** | Vite (optional) | When set on Replit, enables cartographer / dev-banner plugins. |

Use a **`.env` file** locally (keep it **gitignored** if it holds secrets). Root `.gitignore` already excludes common clutter; add `.env` explicitly if you commit env templates only.

---

## Database (Drizzle)

With **`DATABASE_URL`** exported:

```bash
pnpm --filter @workspace/db push
```

Use **`push-force`** only when you understand schema drift and data impact (`@workspace/db` package scripts).

---

## API contracts & codegen

- **`@workspace/api-zod`** — single source of truth for request/response shapes.  
- **`@workspace/api-spec`** — run **`pnpm run codegen`** inside that package after OpenAPI / spec changes; the script may chain workspace typechecks (see that package’s `package.json`).

Point `@workspace/api-client-react` and the API server at the same Zod layers to avoid drift.

---

## Canvas Intelligence specifics

- **Routing:** **wouter** (lightweight).  
- **Styling:** **Tailwind v4** via `@tailwindcss/vite`, **CVA**, **tailwind-merge**.  
- **Vite plugins:** Replit **runtime error overlay**; on Replit, **cartographer** + **dev banner** load when `REPL_ID` is set.  
- **Mockup preview:** `mockupPreviewPlugin` in `artifacts/canvas-intelligence/vite.config.ts` supports live mockup flows—see that file and `mockupPreviewPlugin.ts` for behavior.

---

## pnpm catalog & supply-chain policy

`pnpm-workspace.yaml` centralizes:

- **Shared versions** under `catalog:` (React, Vite, Zod, etc.).  
- **`minimumReleaseAge: 1440`** — packages must be published **≥ 24 hours** before install to reduce supply-chain risk.  
- **Allowlist** for trusted fast-moving scopes (e.g. `@replit/*`, `stripe-replit-sync`).

Do not remove the release-age guard without team review. Use `minimumReleaseAgeExclude` for short-lived exceptions and **remove** entries after the version has aged in.

---

## Troubleshooting

| Issue | What to check |
|-------|----------------|
| `Use pnpm instead` on install | You used `npm`/`yarn` at the root; use **`pnpm install`**. |
| API won’t start | Set **`PORT`** (e.g. `PORT=3001`). |
| `DATABASE_URL` error from Drizzle | Export a valid **Postgres** URL before `db push`. |
| Port 5173 in use | Set **`PORT=5174`** (or another free port) for Vite. |
| Huge `node_modules` or slow CI | Use **pnpm**’s content-addressable store; avoid duplicating with npm. |

---

## License

Root `package.json` specifies **MIT**; confirm per-package `license` when publishing individual artifacts.

---

## Contributing

1. **pnpm** only for installs.  
2. Run **`pnpm run typecheck`** or **`pnpm run build`** before pushing.  
3. Document any change to **catalog** versions, **release-age** exclusions, or **Drizzle** schema in your PR.  
4. **Repository:** [github.com/mattshade/Canvas-Studio](https://github.com/mattshade/Canvas-Studio)
