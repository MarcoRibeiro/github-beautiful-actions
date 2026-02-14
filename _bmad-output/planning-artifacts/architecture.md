---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-github-beautiful-actions-2026-02-07_232117.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/ux-design-directions.html
  - _bmad-output/brainstorming/brainstorming-session-2026-02-07_153455.md
workflowType: 'architecture'
project_name: 'github-beautiful-actions'
user_name: 'Marco'
date: '2026-02-08_160055'
lastStep: 8
status: 'complete'
completedAt: '2026-02-08_235655'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The product centers on GitHub OAuth authentication, repository access control, ingestion of workflow/job metadata, and an interactive pipeline visualization. Users must navigate from repo overview to PR/branch pipelines, identify failures visually, zoom between macro and detail views, and drill down into step logs/outputs. Admins must deploy self-hosted instances, configure OAuth, and manage instance settings. Filtering and search are required for fast triage.

**Non-Functional Requirements:**
Key NFRs drive architecture: performance (P95 <2s, <100ms interactions, >=30 FPS on large graphs), reliability (99.5% uptime), security (least-privilege OAuth, encrypted tokens, TLS), scalability (20+ concurrent users, large workflows/runs), accessibility (WCAG AA), and integration resilience (rate limiting, GitHub outages recovery).

**Scale & Complexity:**
The project combines a rich, highly interactive front-end with real-time-ish data refresh and external API integration.

- Primary domain: full-stack web application
- Complexity level: medium
- Estimated architectural components: 6-8 (UI, visualization engine, API, ingestion/sync, storage, auth, admin/self-host ops, observability)

### Technical Constraints & Dependencies

- GitHub OAuth and GitHub Actions API integration are mandatory.
- Self-host deployment via Docker with simple setup.
- SPA with dashboard/pipeline routes; polling ~10-15s.
- Pipeline view must handle large graphs (2,000 steps) without UI degradation.
- Desktop-first, WCAG AA, keyboard navigation.

### Cross-Cutting Concerns Identified

- Performance and rendering efficiency (large graphs + zoom)
- API rate limits and resilience to GitHub outages
- Security and least-privilege access
- Observability and monitoring for self-hosted ops
- Accessibility compliance across custom visualization

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application (Next.js App Router) based on project requirements, with a single deployable unit for MVP.

### Starter Options Considered

- Next.js full-stack (App Router) using `create-next-app@latest`
  - Pros: single codebase, faster iteration, Vercel zero-config, easy Dockerization.
  - Cons: backend layer is lighter than a dedicated Nest service (can be added later).

### Selected Starter: Next.js (App Router) full-stack

**Rationale for Selection:**
Optimizes for speed-to-MVP while meeting UI complexity (map + zoom) and deployment preferences (Vercel + Docker). Keeps architecture simple and evolvable.

**Initialization Command:**

```bash
npx create-next-app@latest github-beautiful-actions
```

During prompts, choose:
- TypeScript: Yes
- Linter: ESLint
- App Router: Yes
- Tailwind CSS: No (we will use Ant Design)
- src/ directory: Yes (recommended)

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript-first setup with Next.js built-in TS support.

**Styling Solution:**
- No Tailwind; will use Ant Design (`npm install antd`) and component-level styling as needed.

**Build Tooling:**
- Next.js App Router with built-in bundling and production build pipeline.

**Testing Framework:**
- No testing framework by default; will decide separately (e.g., Playwright + Vitest) in later steps.

**Code Organization:**
- App Router structure with `app/` routes and `src/` directory.

**Development Experience:**
- Hot reload and standard Next.js dev/build scripts.

**Note:** Project initialization using this command should be the first implementation story.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database + ORM + migrations: PostgreSQL 18.1 + Prisma 6.18.0 + Prisma Migrate
- Authentication: GitHub App + Auth.js/NextAuth with DB sessions
- API style: REST with schema validation (Zod v4)
- Frontend stack: Next.js App Router + React Flow + TanStack Query + Zustand
- Infrastructure: Vercel (SaaS) + Docker (self-host), Node 22 base image

**Important Decisions (Shape Architecture):**
- Rate limiting with Redis and `rate-limiter-flexible` v6.1.0
- Polling + Webhooks for GitHub Actions data sync
- Observability: OpenTelemetry JS SDK 2.x + Sentry Next.js v9.x
- OpenAPI 3.2.0 for REST documentation

**Deferred Decisions (Post-MVP):**
- Dedicated backend service (NestJS) if/when scale requires separation
- Advanced multi-tenant isolation and org-level dashboards

### Data Architecture

- **Database:** PostgreSQL 18.1
- **ORM + Migrations:** Prisma 6.18.0 with Prisma Migrate
- **Caching:** Redis in MVP (rate limiting, sync queues, transient caches)
- **Validation:** Zod v4 at API boundaries and data ingestion points

### Authentication & Security

- **GitHub Integration:** GitHub App (least-privilege, scoped permissions)
- **App Auth:** Auth.js/NextAuth
- **Sessions:** Database-backed sessions
- **Token Handling:** GitHub tokens stored server-side and encrypted at rest
- **Security Defaults:** TLS 1.2+, least-privilege scopes, server-only secrets

### API & Communication Patterns

- **API Style:** REST
- **Documentation:** OpenAPI 3.2.0
- **Validation:** Zod v4 (request/response schemas)
- **Rate Limiting:** `rate-limiter-flexible` v6.1.0 with Redis
- **Data Sync:** Polling + Webhooks (GitHub App webhooks)
- **Error Handling:** Standardized REST error envelope with trace IDs

### Frontend Architecture

- **State Management:** Zustand 5.0.11 (UI state)
- **Server State:** TanStack Query 5.80.7 (cache, polling, invalidation)
- **Visualization:** React Flow (`@xyflow/react`) 12.10.0 for map + zoom
- **UI System:** Ant Design (per UX spec), custom map components

### Infrastructure & Deployment

- **Hosting:** Vercel (SaaS) + Docker (self-host)
- **Docker Base:** `node:22-bookworm-slim`
- **CI/CD:** GitHub Actions
- **Observability:** OpenTelemetry JS SDK 2.x + Sentry Next.js v9.x

### Decision Impact Analysis

**Implementation Sequence:**
1. Bootstrap Next.js app with TypeScript + App Router.
2. Set up PostgreSQL + Prisma schema + migrations.
3. Implement Auth.js/NextAuth with GitHub App + DB sessions.
4. Build ingestion layer (webhooks + polling) with Redis rate limit.
5. Implement REST API + OpenAPI spec + Zod validation.
6. Build map UI using React Flow + Ant Design and data caching with TanStack Query.
7. Add observability (Sentry + OpenTelemetry) and deploy targets.

**Cross-Component Dependencies:**
- GitHub App permissions impact ingestion, API scopes, and UI data access.
- Redis is required for rate limiting and background sync coordination.
- React Flow performance depends on API pagination and caching strategy.
- OpenAPI schemas and Zod types should align to avoid drift.

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
5 areas where AI agents could make different choices (naming, structure, formats, communication, processes)

### Naming Patterns

**Database Naming Conventions:**
- Tables and columns use `snake_case` (e.g., `workflow_runs`, `created_at`).
- Foreign keys use `<table>_id` (e.g., `repo_id`, `run_id`).
- Indexes use `idx_<table>_<column>` (e.g., `idx_workflow_runs_repo_id`).

**API Naming Conventions:**
- REST endpoints use plural nouns in `kebab-case` (e.g., `/workflow-runs`, `/repos`).
- Route params use `{id}` semantics (e.g., `/repos/{repoId}`).
- Query params use `camelCase` (e.g., `?branchName=main`).

**Code Naming Conventions:**
- Components use `PascalCase` (e.g., `PipelineMap`).
- Functions/variables use `camelCase` (e.g., `getWorkflowRuns`).
- Files follow component name (e.g., `PipelineMap.tsx`).

### Structure Patterns

**Project Organization:**
- Organize by feature: `features/pipelines`, `features/auth`, `features/settings`.
- Shared assets and utilities live in `shared/` (e.g., `shared/ui`, `shared/hooks`, `shared/utils`).
- API routes live in `app/api/...` following Next.js App Router conventions.

**File Structure Patterns:**
- Co-locate feature components, hooks, and API client modules within each feature folder.
- Centralize configs in `config/` (env, constants).
- Static assets in `public/`.

### Format Patterns

**API Response Formats:**
- Success: `{ data, meta }`
- Error: `{ error: { code, message, details? } }`

**Data Exchange Formats:**
- JSON fields use `camelCase`.
- Dates are ISO 8601 strings in UTC (e.g., `2026-02-08T16:00:00Z`).
- Boolean values use `true`/`false`.

### Communication Patterns

**Event System Patterns:**
- Internal events use `entity.action` naming (e.g., `workflow.runUpdated`).
- Event payloads include `id`, `timestamp`, and `source`.

**State Management Patterns:**
- Zustand stores per feature (e.g., `usePipelineStore`, `useAuthStore`).
- TanStack Query keys are hierarchical arrays (e.g., `['repo', repoId, 'runs']`).

### Process Patterns

**Error Handling Patterns:**
- Global error boundary for unexpected UI errors.
- API errors mapped to inline component states + global banner.
- Log errors with trace IDs for correlation.

**Loading State Patterns:**
- Use `isLoading` for initial load, `isFetching` for background refresh.
- Show skeletons for primary views and inline spinners for secondary actions.
- Retry API calls up to 3 times with exponential backoff.

### Enforcement Guidelines

**All AI Agents MUST:**
- Follow naming conventions for DB, API, and code (snake_case / kebab-case / camelCase / PascalCase).
- Use the standard API response envelope and ISO date formats.
- Keep features isolated in `features/` and shared logic in `shared/`.

**Pattern Enforcement:**
- PR checklist verifies naming and response formats.
- Lint rules enforce file naming and import boundaries.
- Update this section before introducing a new cross-cutting convention.

### Pattern Examples

**Good Examples:**
- Table: `workflow_runs`
- Endpoint: `GET /workflow-runs?branchName=main`
- Component: `PipelineMap.tsx`
- Query key: `['repo', repoId, 'runs']`

**Anti-Patterns:**
- Table: `WorkflowRuns`
- Endpoint: `/workflowRuns`
- Mixing UI components across features without using `shared/`

## Project Structure & Boundaries

### Complete Project Directory Structure
```
github-beautiful-actions/
├── README.md
├── package.json
├── next.config.js
├── tsconfig.json
├── .env.example
├── .env.local
├── .gitignore
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── github/
│   │   │   ├── repos/
│   │   │   ├── workflows/
│   │   │   ├── runs/
│   │   │   └── webhooks/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   │   ├── page.tsx
│   │   │   └── repo/
│   │   │       └── [repoId]/
│   │   │           └── pipeline/
│   │   └── (settings)/
│   ├── features/
│   │   ├── auth/
│   │   ├── pipelines/
│   │   ├── repos/
│   │   ├── runs/
│   │   ├── settings/
│   │   └── admin/
│   ├── shared/
│   │   ├── ui/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── api/
│   │   └── config/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   ├── github.ts
│   │   ├── redis.ts
│   │   └── telemetry.ts
│   ├── types/
│   ├── middleware.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
```

### Architectural Boundaries

**API Boundaries:**
- Public REST endpoints live in `src/app/api/*`.
- Auth endpoints in `app/api/auth`.
- GitHub webhooks in `app/api/webhooks`.

**Component Boundaries:**
- Feature UIs in `src/features/<feature>`.
- Shared UI in `src/shared/ui`.
- Map visualization lives in `features/pipelines/components/PipelineMap`.

**Service Boundaries:**
- GitHub integration in `src/lib/github.ts`.
- Data access in `src/lib/db.ts` (Prisma).
- Cache/rate limit in `src/lib/redis.ts`.

**Data Boundaries:**
- Prisma schema in `prisma/schema.prisma`.
- All DB access via Prisma client in `lib/db.ts`.
- Redis only for caching/ratelimit/queue.

### Requirements to Structure Mapping

**Functional Requirements -> Locations**
- Auth (FR1-4): `features/auth`, `app/api/auth`, `lib/auth.ts`
- Ingestion (FR5-8): `app/api/github`, `lib/github.ts`
- Map & navigation (FR9-12): `features/pipelines`, `features/runs`
- Drill-down (FR13-16): `features/runs`, `app/api/runs`
- Filters/search (FR17-19): `features/pipelines`, `shared/hooks`
- Admin/self-host (FR20-23): `features/admin`, `app/api/settings`

**Cross-Cutting Concerns**
- Performance & caching: `lib/redis.ts`, TanStack Query config
- Security: `lib/auth.ts`, `middleware.ts`
- Observability: `lib/telemetry.ts`

### Integration Points

**Internal Communication:**
- Feature UI -> shared API client in `shared/api`.
- Server actions/API routes -> `lib/*` services.

**External Integrations:**
- GitHub App OAuth + Webhooks -> `lib/github.ts`.
- Sentry + OpenTelemetry -> `lib/telemetry.ts`.

**Data Flow:**
GitHub Webhook/Polling -> API Routes -> DB (Prisma) -> UI (TanStack Query) -> Map (React Flow)

### File Organization Patterns

**Configuration Files:**
- Env examples in `.env.example`
- Runtime in `.env.local`
- Docker in `docker/`

**Source Organization:**
- Route pages in `src/app`
- Features in `src/features`
- Shared in `src/shared`

**Test Organization:**
- `tests/unit`, `tests/integration`, `tests/e2e`

**Asset Organization:**
- `public/assets`

### Development Workflow Integration

**Dev Server:**
- `next dev` uses `src/app` routes and API.

**Build Process:**
- `next build` bundles app + API routes.

**Deployment:**
- Vercel (SaaS) + Docker (self-host).

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All choices are compatible: Next.js + Prisma + Postgres + Redis + Auth.js + GitHub App align cleanly. Frontend tooling (Zustand + TanStack Query + React Flow + Ant) matches UX requirements.

**Pattern Consistency:**
Naming, structure, and API formats are aligned across DB, API, and UI. Response envelopes and date formats are consistent with the patterns section.

**Structure Alignment:**
Project structure supports feature isolation, API routes, auth, ingestion, and visualization boundaries.

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
No epics provided; FRs mapped to features and API boundaries.

**Functional Requirements Coverage:**
All FR categories (auth, ingestion, map visualization, drill-down, filters, admin) have architectural support.

**Non-Functional Requirements Coverage:**
Performance, security, scalability, accessibility, and integration resilience are addressed by stack, caching, and observability decisions.

### Implementation Readiness Validation ✅

**Decision Completeness:**
Critical decisions documented with versions and rationale.

**Structure Completeness:**
Directory tree is complete and actionable.

**Pattern Completeness:**
Naming, formats, communication, and process patterns are explicit.

### Gap Analysis Results

**Critical Gaps:** None
**Important Gaps:** None
**Nice-to-Have Gaps:**
- Consider dedicated backend service (NestJS) post-MVP if scale demands.
- Add advanced multi-tenant isolation later.

### Validation Issues Addressed

None identified.

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High

**Key Strengths:**
- Clear tech stack with verified versions
- Consistent patterns to prevent agent conflicts
- Structure aligned with FR/NFRs

**Areas for Future Enhancement:**
- Optional service split (NestJS)
- Multi-tenant org dashboards

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions and patterns.
- Respect project structure and boundaries.
- Use the API response envelope and naming rules consistently.

**First Implementation Priority:**
`npx create-next-app@latest github-beautiful-actions`
