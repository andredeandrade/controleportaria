# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Language

Respond in Portuguese (pt-BR) when working in this repository, matching the existing project convention (`.github/agents/controleportaria.agent.md`).

## Project overview

Controle Portaria is a multi-tenant condominium gate/access-control system (visitor, resident, and service-provider check-in/check-out management), used by multiple condominiums (`condominiums`) via subdomain-based tenancy. Domain entities use Portuguese names: `Resident`(morador), `Visitor` (visitante), `ServiceProvider` (prestador de serviço), `Authorization` (autorização), `AccessRecord` (registro de acesso), `Event`/`EventGuest` (evento/convidado), `Incident` (ocorrência), `Vehicle`.

pnpm monorepo with two independent packages, no shared code between them:
- `web/` — Next.js 16 (App Router) frontend, TypeScript, MUI, React Query, TanStack Table
- `api/` — Express 5 + Prisma 7 + PostgreSQL backend (separate service, own `.env`, own Dockerfile)

**`web` never talks to Postgres/Prisma directly.** It calls its own `app/api/*` Route Handlers (a BFF layer), which proxy over HTTP to the Express `api` service.

## Commands

Run from repo root unless noted:

| Command | Effect |
|---|---|
| `pnpm install` | Install all workspace packages |
| `pnpm dev` | Run `web` dev server (Next.js) at localhost:3000 |
| `pnpm build` | Build `web` for production |
| `pnpm start` | Start `web` in production mode |
| `pnpm lint` | ESLint on `web` |
| `pnpm format` / `pnpm format:check` | Prettier across all workspace packages |
| `pnpm --filter ./web <script>` | Run any `web/package.json` script |
| `pnpm --filter ./api <script>` | Run any `api/package.json` script |

`api` scripts (run via `pnpm --filter ./api <script>` or `cd api && pnpm <script>`):
- `dev` — `tsx watch src/server.ts` (API on :3333)
- `build` — `tsc`
- `start` — run compiled `dist/server.js`
- `prisma:generate` / `prisma:migrate` / `prisma:studio`

**No test suite exists in this repo** (no jest/vitest/playwright, no `*.test.*` files) — don't search for a test command that isn't there.

Docker (reads root `.env`, copy from `.env.example` first):
- `docker compose up --build` — full stack: web :3000, api :3333, postgres :5432
- `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d` — hot-reload dev mode (web via Turbopack `next dev`, api via `tsx watch`)

## Architecture

### Multi-tenancy
Every domain table carries `condominiumId`. The frontend extracts a tenant slug from the subdomain (`web/src/lib/auth/session.ts`), resolves it to a `condominiumId` via the API, and sends that id on auth calls. Always consider tenant isolation when touching queries, API payloads, or permissions.

### Auth
Custom JWT auth, no third-party auth library.
- API (`api/src/modules/auth/`) issues JWTs (`api/src/lib/jwt.ts`), hashes passwords with bcrypt (`api/src/lib/password.ts`). `api/src/middlewares/authenticate.ts` validates the Bearer token; `authorize.ts` does role checks (`ADMIN` / `PORTARIA`).
- Web login route (`web/src/app/api/auth/login/route.ts`) resolves the tenant, calls the API, and stores the JWT in an httpOnly cookie (`web/src/lib/auth/session.ts`).
- `web/src/proxy.ts` is the middleware guarding protected route prefixes (`/dashboard`, `/acessos`, etc.) — it validates the cookie against `/auth/me` and redirects unauthenticated requests to `/`.

### Data & encryption
PII fields (email, phone, document, plate, observations) are stored as `*Encrypted` columns using AES-256-GCM (`api/src/lib/encryption.ts`, key from `DATA_ENCRYPTION_KEY`). Every module's service layer encrypts on write and decrypts on read — follow this pattern for any new PII field rather than storing plaintext.

### API module pattern (`api/src/modules/<domain>/`)
Each domain (`auth`, `condominiums`, `residents`, `visitors`, `service-providers`, `authorizations`, `events`, `incidents`, `access-records`, `reports`) follows the same file set: `*.routes.ts` → `*.controller.ts` → `*.service.ts` → `*.types.ts` → `index.ts` barrel. Mounted centrally in `api/src/routes/index.ts`.

### Web BFF route pattern (`web/src/app/api/<domain>/`)
Each Next.js Route Handler pairs `route.ts` (handler) + `helpers.ts` (server-side fetch to the Express API + error translation) + `types.ts` (request/response shapes). Follow this 3-file structure for new BFF endpoints rather than inlining fetch logic in `route.ts`.

### Web feature-folder pattern (`web/src/components/<domain>/`)
Each domain (`acessos`, `moradores`, `visitantes`, `prestadores-servicos`, `autorizacoes`, `eventos`, `ocorrencias`) bundles `*List.tsx`, `*Table.tsx`, `*MobileList.tsx` (responsive split), `Register*Form.tsx`, `Register*Button.tsx`, plus a local `hooks/` subfolder. Match this shape when adding a new domain area.

### Shared building blocks
- `web/src/services/shared/http.ts` — `safeReadJson()` / `getApiErrorMessage()`, used by every `services/<domain>/service.ts`; each domain also defines its own `<Domain>ServiceError extends Error`.
- `web/src/components/form/` — shared form primitives (`TextField`, `TextFieldStack`, `FormPaper`, `ColorSelect`, `PersonTypeSelect`, `LocomotionSelect`), barreled via `index.ts`.
- `web/src/lib/mui/theme.ts` — the MUI theme (Inter font, custom palette, component overrides); wired through `web/src/providers/AppThemeProvider.tsx` with `AppRouterCacheProvider` for SSR emotion caching.
- `web/src/providers/AppProviders.tsx` — nests ReactQuery → Theme → Snackbar providers, mounted once in root `layout.tsx`.
- Server state is React Query only (`web/src/lib/react-query/queryClient.ts`, 30s staleTime, no refetch-on-focus) via a per-domain `useX.ts` (query) / `useCreateX.ts` (mutation) hook pair — never duplicate server cache in local state.
- Forms use `react-hook-form` throughout.
- Tables use `@tanstack/react-table` via `web/src/components/table/DataTable.tsx` with typed column defs.
- PDF export uses `jspdf`/`jspdf-autotable` (`web/src/services/relatorios/pdf.ts`).

## Conventions

From the project's established rules (`.github/agents/controleportaria.agent.md`):
- Strict TypeScript — no implicit `any`; type props, return values, and API payloads explicitly.
- Use MUI components and the theming system (`sx`/`styled`) over inline CSS.
- Isolate business logic and API calls in custom hooks (`use*.ts`), not directly in components.
- Use React Query (`useQuery`/`useMutation`) for all server state.
- Prefer typed TanStack Table column APIs; extract reusable column defs to separate files.
- Use MUI breakpoints (`xs`, `sm`, `md`, `lg`) for responsive layout.
- JSDoc only on hooks, utilities, and complex types — not on simple components.
