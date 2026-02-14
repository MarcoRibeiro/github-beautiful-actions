---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# github-beautiful-actions - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for github-beautiful-actions, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can authenticate via GitHub OAuth.
FR2: Users can grant the app access to selected repositories.
FR3: Users can view only the repositories they have access to.
FR4: Admins can configure access settings for the self-hosted instance.
FR5: Users can see a list of recent PRs/branches with active or recent workflows.
FR6: The system can ingest GitHub Actions workflow and job metadata for a selected repository.
FR7: Users can refresh pipeline data on demand.
FR8: The system can surface the latest workflow run status per PR/branch.
FR9: Users can view pipelines in a metro-map style visualization.
FR10: Users can identify workflow/job status visually on the map.
FR11: Users can zoom between macro and detailed views of a pipeline.
FR12: Users can navigate from repo overview to a specific PR/branch pipeline view.
FR13: Users can select a job/step to view details.
FR14: Users can view error output for failed steps.
FR15: Users can access key metadata for a workflow run (duration, start time, status).
FR16: Users can see dependency relationships between jobs/steps.
FR17: Users can filter pipelines by status (success/failure/in-progress).
FR18: Users can filter by branch or PR.
FR19: Users can search for a workflow/job/step by name.
FR20: Admins can deploy the app in a self-hosted environment.
FR21: Admins can configure GitHub OAuth credentials.
FR22: Admins can manage basic instance settings (base URL, polling interval).
FR23: Admins can monitor connection health to GitHub APIs.
FR24: Users can view multi-repo dashboards.
FR25: Users can subscribe to failure alerts.
FR26: Users can export pipeline summaries via API.

### NonFunctional Requirements

NFR1: P95 page load for dashboard and pipeline view <2s after data is available, measured via RUM (7-day rolling p95) on production data.
NFR2: User interactions (zoom, select step) respond <100ms, measured via client-side performance marks on reference hardware under normal load.
NFR3: Map rendering maintains >=30 FPS and interaction latency <150ms with 2,000 steps in view, measured in a synthetic benchmark on reference hardware.
NFR4: Self-hosted instance target uptime 99.5% per calendar month, measured by external uptime monitoring at 5-minute intervals excluding planned maintenance.
NFR5: Data refresh failures show an inline error and retry action within 5s in 99% of cases, measured via automated UI tests with synthetic failure injection.
NFR6: All data encrypted in transit using TLS 1.2+ with valid certificates, verified by automated security scans.
NFR7: OAuth tokens stored server-side and encrypted at rest; tokens never sent to the client, verified by security review and automated tests.
NFR8: GitHub OAuth scopes limited to least privilege (read-only repo/actions when possible), verified during security review and integration tests.
NFR9: Support at least 20 concurrent active users per instance with <20% increase in p95 latency, measured by 15-minute load tests on reference hardware.
NFR10: Handle repositories with 20+ workflows and 500+ runs without timeouts; 99% of pipeline views render within 5s in load tests.
NFR11: WCAG 2.1 AA target with keyboard navigation and non-color status cues; 0 critical/serious issues in Lighthouse/axe audits plus manual keyboard testing.
NFR12: Focus states visible on 100% of interactive elements, verified by automated accessibility tests and manual audit.
NFR13: GitHub API rate limits handled with exponential backoff and user feedback within 5s; 100% of rate-limit responses handled in integration tests.
NFR14: System recovers from temporary GitHub API outages within 60s of service restoration without manual intervention, verified via chaos tests.

### Additional Requirements

- Starter template must be Next.js App Router using `npx create-next-app@latest github-beautiful-actions` with TypeScript, ESLint, App Router, no Tailwind, and `src/` directory.
- Use Ant Design as the primary UI system; custom components only where needed.
- Visualization must be built with React Flow (`@xyflow/react`) and support zooming.
- Client state uses Zustand; server state and polling use TanStack Query.
- Authentication must use GitHub App + Auth.js/NextAuth with database-backed sessions.
- Database is PostgreSQL 18.1 with Prisma 6.18.0 and Prisma Migrate; follow snake_case DB naming.
- Redis is required in MVP for rate limiting, sync coordination, and transient caches; use `rate-limiter-flexible`.
- API style is REST with OpenAPI 3.2.0 docs and Zod v4 validation; standard response envelope `{ data, meta }` and error envelope `{ error: { code, message, details? } }`.
- Data sync combines polling (10-15s) and GitHub App webhooks; handle rate limits and outages gracefully.
- Observability must include OpenTelemetry JS SDK 2.x plus Sentry Next.js v9.x with trace IDs in errors.
- Deployment targets are Vercel (SaaS) and Docker (self-host) using `node:22-bookworm-slim` base image; CI via GitHub Actions.
- Code organization must follow `features/` + `shared/` boundaries with App Router API routes in `src/app/api`.
- Naming conventions: DB `snake_case`, REST endpoints `kebab-case`, query params `camelCase`, components `PascalCase`.
- UX requires a metro-map default view with progressive zoom and a side detail panel on click; provide an optional audit table view.
- Users should reach the failing step in 1-2 clicks; error states must be highlighted immediately.
- Status must be communicated by color plus shape/icon, not color alone.
- Desktop-first responsive layout with tablet optimization; mobile support is best-effort.
- Accessibility: WCAG AA, contrast >= 4.5:1, full keyboard navigation, visible focus states, ARIA labels on custom components.
- Touch targets must be >=44px; use skeletons for loading and clear empty states.
- Provide search and filter UI (PR/branch/status) with visible active filter chips.
- Typography: Manrope for primary text and JetBrains Mono for IDs/logs; align with design tokens.
- Color system includes primary #3B82F6, neutrals #F8FAFC / #E2E8F0 / #475569, and status colors #22C55E / #F59E0B / #EF4444.

### FR Coverage Map

FR1: Epic 2 - Secure user access and repo authorization
FR2: Epic 2 - Secure user access and repo authorization
FR3: Epic 2 - Secure user access and repo authorization
FR4: Epic 1 - Self-host setup and instance administration
FR5: Epic 3 - Pipeline discovery and status overview
FR6: Epic 3 - Pipeline discovery and status overview
FR7: Epic 3 - Pipeline discovery and status overview
FR8: Epic 3 - Pipeline discovery and status overview
FR9: Epic 4 - Metro-map visualization and navigation
FR10: Epic 4 - Metro-map visualization and navigation
FR11: Epic 4 - Metro-map visualization and navigation
FR12: Epic 4 - Metro-map visualization and navigation
FR13: Epic 5 - Diagnostics, filtering, and search
FR14: Epic 5 - Diagnostics, filtering, and search
FR15: Epic 5 - Diagnostics, filtering, and search
FR16: Epic 4 - Metro-map visualization and navigation
FR17: Epic 3 - Pipeline discovery and status overview
FR18: Epic 3 - Pipeline discovery and status overview
FR19: Epic 5 - Diagnostics, filtering, and search
FR20: Epic 1 - Self-host setup and instance administration
FR21: Epic 1 - Self-host setup and instance administration
FR22: Epic 6 - Post-MVP extensions
FR23: Epic 6 - Post-MVP extensions
FR24: Epic 6 - Post-MVP extensions
FR25: Epic 6 - Post-MVP extensions
FR26: Epic 6 - Post-MVP extensions

## Epic List

### Epic 1: Self-Host Setup & Instance Administration
Admins can deploy a self-hosted instance and complete initial configuration via UI.
**FRs covered:** FR4, FR20, FR21

### Epic 2: Secure User Access & Repo Authorization
Users can authenticate, authorize GitHub access, and see only permitted repositories.
**FRs covered:** FR1, FR2, FR3

### Epic 3: Pipeline Discovery & Status Overview
Users can discover recent PRs/branches, see current workflow status, and apply basic filters.
**FRs covered:** FR5, FR6, FR7, FR8, FR17, FR18

### Epic 4: Metro-Map Visualization & Navigation
Users can view pipelines as a metro map, understand dependencies, and navigate/zoom to specific pipelines.
**FRs covered:** FR9, FR10, FR11, FR12, FR16

### Epic 5: Diagnostics, Filtering & Search
Users can inspect steps and errors quickly, plus filter and search pipelines.
**FRs covered:** FR13, FR14, FR15, FR19

### Epic 6: Post-MVP Extensions
Users gain multi-repo views, alerts, health monitoring, settings management, and API exports beyond the MVP.
**FRs covered:** FR22, FR23, FR24, FR25, FR26
<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic 1: Self-Host Setup & Instance Administration

Admins can deploy a self-hosted instance and complete initial configuration via UI.

### Story 1.1: Initialize Project from Starter Template

As an admin,
I want to initialize the project using the approved Next.js starter template,
So that the codebase matches the architecture decisions from day one.

**FRs:** FR20

**Acceptance Criteria:**

**Given** the project is not yet initialized
**When** I run `npx create-next-app@latest github-beautiful-actions` and select TypeScript, ESLint, App Router, no Tailwind, and `src/` directory
**Then** the project is created with the expected Next.js App Router structure
**And** the app builds and starts locally with default scripts

### Story 1.2: Self-Hosted Deployment via Docker

As an admin,
I want to deploy the application with Docker,
So that I can run a self-hosted instance quickly.

**FRs:** FR20

**Acceptance Criteria:**

**Given** the repository is available
**When** I run a documented `docker compose up` command
**Then** the app starts using the `node:22-bookworm-slim` base image and is reachable in the browser
**And** required services (Postgres, Redis) are included with persisted volumes
**And** a `.env.example` documents required environment variables

### Story 1.3: Initial Setup UI for Instance Configuration

As an admin,
I want a setup UI to configure instance settings and GitHub App credentials,
So that the instance becomes operational without manual file edits.

**FRs:** FR4, FR21

**Acceptance Criteria:**

**Given** the instance has not been configured
**When** I open the setup page
**Then** I can enter base URL, polling interval, and GitHub App credentials (App ID, Client ID/Secret, Private Key, Webhook Secret)
**And** required fields are validated before save
**And** settings are stored server-side and the setup page is disabled after completion

## Epic 2: Secure User Access & Repo Authorization

Users can authenticate with GitHub and manually authorize which repositories the app can access.

### Story 2.1: GitHub OAuth Sign-In

As a user,
I want to sign in with GitHub OAuth,
So that I can access the app securely.

**FRs:** FR1

**Acceptance Criteria:**

**Given** I am not authenticated
**When** I click "Sign in with GitHub"
**Then** I complete OAuth and return to the app with an active session
**And** the session is stored server-side (no access token on the client)
**And** I see my GitHub identity (name/avatar) in the UI

### Story 2.2: Repository Authorization (Manual Selection)

As a user,
I want to select which repositories the app can access,
So that I control data scope.

**FRs:** FR2

**Acceptance Criteria:**

**Given** I am authenticated
**When** I open the repository authorization screen
**Then** I can see my accessible repositories
**And** I can select/deselect repos for the app
**And** the app requests the minimum GitHub permissions required
**And** only selected repos are stored as authorized

### Story 2.3: Access Control to Authorized Repositories

As a user,
I want to see only authorized repositories in the app,
So that my data access is scoped correctly.

**FRs:** FR3

**Acceptance Criteria:**

**Given** I have authorized a set of repositories
**When** I navigate to repo lists or pipeline views
**Then** I only see repos I authorized
**And** direct access to a non-authorized repo is blocked with a clear error state

## Epic 3: Pipeline Discovery & Status Overview

Users can discover recent PRs/branches, see current status, refresh data, and use basic filters.

### Story 3.1: PR/Branch List with Latest Status and Expandable History

As a user,
I want to see recent PRs/branches with the latest workflow status and an expandable history,
So that I can understand current state and recent context quickly.

**FRs:** FR5, FR8

**Acceptance Criteria:**

**Given** I am viewing an authorized repository
**When** I open the repo overview
**Then** I see recent PRs/branches with the latest workflow run status and last updated time
**And** each row can expand to show a short history of the last 3 runs with status and timestamp
**And** the history panel is hidden by default

### Story 3.2: Workflow Data Ingestion and Polling Sync

As a user,
I want workflow and job data to be ingested and kept up to date,
So that the status view reflects current runs.

**FRs:** FR6

**Acceptance Criteria:**

**Given** a repository is authorized
**When** the system syncs with GitHub Actions
**Then** workflow, job, and run metadata are stored and updated
**And** polling runs every 10-15s to refresh statuses
**And** sync errors show an inline message with a retry action

### Story 3.3: Manual Refresh on Demand

As a user,
I want to refresh pipeline data on demand,
So that I can confirm status changes immediately.

**FRs:** FR7

**Acceptance Criteria:**

**Given** I am viewing the repo overview
**When** I click "Refresh"
**Then** the app triggers an immediate sync and updates the latest statuses
**And** rate-limit errors are handled with a clear user message

### Story 3.4: Basic Filters (Status and Branch/PR)

As a user,
I want basic filters for status and branch/PR,
So that I can focus on relevant pipelines quickly.

**FRs:** FR17, FR18

**Acceptance Criteria:**

**Given** I am viewing the repo overview
**When** I apply a status or branch/PR filter
**Then** the list updates to show only matching items
**And** active filters are visible and can be cleared

## Epic 4: Metro-Map Visualization & Navigation

Users can view pipelines as a metro map, understand dependencies, and navigate/zoom to specific pipelines.

### Story 4.1: Default Metro-Map Pipeline View

As a user,
I want the pipeline to open in a metro-map view by default,
So that I can understand the workflow at a glance.

**FRs:** FR9, FR10

**Acceptance Criteria:**

**Given** I open a PR/branch pipeline
**When** the view loads
**Then** I see a metro-map visualization of the pipeline by default
**And** job/step statuses are displayed on the map

### Story 4.2: Zoom Controls (Slider + Buttons)

As a user,
I want zoom controls with a slider and buttons,
So that I can move between macro and detailed views easily.

**FRs:** FR11

**Acceptance Criteria:**

**Given** I am viewing the pipeline map
**When** I use the zoom slider or zoom buttons
**Then** the map zoom level changes smoothly
**And** the map remains readable at both macro and detailed levels

### Story 4.3: Dependency Visualization

As a user,
I want to see dependencies between jobs/steps on the map,
So that I understand the pipeline flow and blockers.

**FRs:** FR16

**Acceptance Criteria:**

**Given** the pipeline map is visible
**When** I view connected jobs/steps
**Then** dependency relationships are visually represented on the map
**And** blocked or waiting paths are distinguishable from completed ones

### Story 4.4: Navigate from Overview to Specific Pipeline

As a user,
I want to navigate from the repo overview to a specific PR/branch pipeline map,
So that I can get to the right visualization quickly.

**FRs:** FR12

**Acceptance Criteria:**

**Given** I am on the repo overview
**When** I select a PR/branch
**Then** I am taken directly to its pipeline map view

### Story 4.5: Status Legend in Map View

As a user,
I want a status legend in the map view,
So that I can interpret colors and shapes quickly.

**FRs:** FR10

**Acceptance Criteria:**

**Given** I am viewing the pipeline map
**When** I look at the legend
**Then** I can see the meaning of status colors and shapes (success, warning, error, running)

## Epic 5: Diagnostics, Filtering & Search

Users can inspect step details and errors, view full logs, and search within a pipeline.

### Story 5.1: Step/Job Detail Panel

As a user,
I want a side detail panel when I select a job/step,
So that I can inspect details without leaving the map.

**FRs:** FR13

**Acceptance Criteria:**

**Given** I am viewing the pipeline map
**When** I click a job or step
**Then** a side panel opens with step/job details
**And** the panel can be closed to return to the full map

### Story 5.2: Error Output for Failed Steps

As a user,
I want to see error output for failed steps,
So that I can diagnose failures quickly.

**FRs:** FR14

**Acceptance Criteria:**

**Given** a step has failed
**When** I open its detail panel
**Then** I see the error output with clear failure indicators
**And** errors are highlighted within the output

### Story 5.3: Full Log Viewer Inline

As a user,
I want to view the full log inline in the detail panel,
So that I can diagnose issues without leaving the app.

**FRs:** FR14

**Acceptance Criteria:**

**Given** I am viewing a step detail panel
**When** I open the logs tab/section
**Then** I can scroll the full log inline
**And** the log view supports copy for troubleshooting

### Story 5.4: Key Run Metadata in Details

As a user,
I want to see key run metadata (duration, start time, status),
So that I can assess execution context quickly.

**FRs:** FR15

**Acceptance Criteria:**

**Given** I open a workflow run or step detail
**When** the detail panel loads
**Then** I see duration, start time, and status for the run

### Story 5.5: Search Within Pipeline

As a user,
I want to search within a pipeline by workflow/job/step name,
So that I can find a specific item quickly.

**FRs:** FR19

**Acceptance Criteria:**

**Given** I am viewing a pipeline
**When** I enter a search term
**Then** matching jobs/steps are highlighted or filtered in the view
**And** no-match states are clearly indicated

## Epic 6: Post-MVP Extensions

Users gain multi-repo views, alerts, health monitoring, settings management, and API exports beyond the MVP.

### Story 6.1: Multi-Repo Overview by Owner

As a user,
I want a multi-repo overview grouped by owner,
So that I can monitor pipelines across repositories.

**FRs:** FR24

**Acceptance Criteria:**

**Given** I have authorized multiple repositories
**When** I open the multi-repo view
**Then** repositories are grouped by owner
**And** I can expand an owner group to see repo status summaries
**And** a simple list view is available as an alternative

### Story 6.2: Failure Alerts via Webhooks

As a user,
I want to receive failure alerts via webhooks,
So that I can integrate alerts into my workflows.

**FRs:** FR25

**Acceptance Criteria:**

**Given** I configure a webhook endpoint
**When** a workflow run fails
**Then** a webhook payload is sent with repo, run, and step identifiers
**And** delivery failures are retried with exponential backoff

### Story 6.3: Pipeline Summary Export API

As a user,
I want a REST JSON API to export pipeline summaries,
So that I can integrate the data externally.

**FRs:** FR26

**Acceptance Criteria:**

**Given** I have valid API credentials
**When** I call the export endpoint
**Then** I receive a JSON payload with repo, run, status, and timestamp fields
**And** responses follow the standard `{ data, meta }` envelope

### Story 6.4: Instance Health Dashboard and Settings

As an admin,
I want a health dashboard and basic settings management,
So that I can monitor system status and adjust instance configuration.

**FRs:** FR22, FR23

**Acceptance Criteria:**

**Given** I open the admin health dashboard
**When** the page loads
**Then** I see status for GitHub API connectivity, background sync, and database health
**And** I can view and edit base URL and polling interval
**And** the page can link out to an external monitoring tool if configured



