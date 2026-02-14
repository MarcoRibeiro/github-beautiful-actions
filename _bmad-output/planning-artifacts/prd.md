---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
  - step-12-complete
inputDocuments:
  - _bmad-output/planning-artifacts/product-brief-github-beautiful-actions-2026-02-07_232117.md
  - _bmad-output/brainstorming/brainstorming-session-2026-02-07_153455.md
  - _bmad-output/brainstorming/brainstorming-session-2026-02-07_152056.md
  - _bmad-output/planning-artifacts/ux-color-themes.html
  - _bmad-output/planning-artifacts/ux-design-directions.html
  - _bmad-output/planning-artifacts/ux-design-specification.md
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 2
  projectDocsCount: 0
  otherCount: 3
classification:
  projectType: web_app
  domain: general
  complexity: medium
  projectContext: greenfield
workflowType: 'prd'
date: 2026-02-08_112243
---

# Product Requirements Document - github-beautiful-actions

**Author:** Marco
**Date:** 2026-02-08_112243

## Executive Summary

### Vision
Create a fast, visual understanding of GitHub Actions pipelines so developers can diagnose failures in seconds instead of minutes.

### Differentiator
A metro-map metaphor with progressive zoom that connects macro pipeline health to the exact failing step in one screen.

### Target Users
- Primary: developers managing multiple PRs and needing instant pipeline clarity.
- Secondary: DevOps/support users who triage failures and monitor CI reliability.
- Admins: self-host operators who set up and maintain the instance.

### Product Context
Greenfield web app with self-hosted-first distribution and a SaaS path later.

## Success Criteria

### User Success
- Identify the failing step in <30 seconds in 80% of sessions.
- Reach the failing step in <=2 clicks.
- Reduce time-to-decision (merge/rollback) by 30-50% for CI failures.
- Aha moment: "I can see the whole pipeline and the exact failure in one screen."

### Business Success
- 3 months: 50-100 MAU, 10-20 active repositories, >25% month-1 retention.
- 12 months: 500-1,000 MAU, 100-200 active repositories, >40% monthly retention.
- Activation: first successful pipeline view within 10 minutes of install.

### Technical Success
- Map view renders in <2s (P95) after data is available.
- Pipeline status refresh latency <15s for running workflows.
- Support at least 20 workflows per repo and 2,000 steps per view without UI degradation.
- Self-host install time <10 minutes with a single command.
- SaaS (future): 99.5% uptime target.

### Measurable Outcomes
- 80% of users identify the failing step in under 30 seconds.
- Median clicks to error <=2.
- 30-50% reduction in time-to-decision vs. baseline.
- 60%+ of new users complete activation within 10 minutes.

## Product Scope

### MVP - Minimum Viable Product
- Single-repo view with PR/branch pipelines.
- Metro-map visualization with zoom (macro to detail).
- Clear error highlighting and status states.
- Click into step to view logs/outputs.
- Basic filters (status/branch) and search.
- GitHub OAuth + Actions data ingestion.
- Self-host deployment (Docker) with simple setup.

### Growth Features (Post-MVP)
- Multi-repo and org-level views.
- Alerts/notifications for failures.
- Saved filters and shared views.
- Basic analytics (time-to-failure, flaky steps).
- Team sharing + RBAC groundwork for SaaS.

### Vision (Future)
- Cross-CI observability (GitHub + others).
- Predictive insights and failure clustering.
- Automated triage and recommended fixes.
- Browser extension for quick access.

## User Journeys

### Journey 1: Primary User (Developer) - Happy Path
**Opening Scene:** Sofia is juggling multiple PRs across a busy repo and needs to quickly know what is blocking a merge.
**Rising Action:** She opens the web app and immediately sees a metro-map of active pipelines for her PR. One line is red.
**Climax:** A single click reveals the exact failed step and its log snippet. She understands the root cause in seconds.
**Resolution:** Sofia fixes the issue and re-runs the workflow with confidence, feeling in control rather than overwhelmed.

### Journey 2: Primary User (Developer) - Edge Case / Flaky Failure
**Opening Scene:** Miguel's pipeline is large and has intermittent failures. The default GitHub UI makes it hard to spot patterns.
**Rising Action:** He zooms out to see the entire flow and zooms in on repeated red stations.
**Climax:** The map shows the same step failing across different runs; he isolates a flaky dependency and validates the hypothesis.
**Resolution:** He adds a retry/fix and the failure pattern disappears, saving time on future triage.

### Journey 3: Admin/Ops (Self-Host Setup)
**Opening Scene:** Ana is responsible for internal tooling and wants the team to adopt the product quickly.
**Rising Action:** She deploys the self-hosted version via a single Docker command, configures GitHub OAuth, and sets basic access controls.
**Climax:** Within minutes, she sees the first pipelines appear for a test repo.
**Resolution:** She shares the instance with the team, confident the setup is reliable and maintainable.

### Journey 4: Support / DevOps (Triage and Monitoring)
**Opening Scene:** Joao manages CI reliability and gets pinged when failures spike.
**Rising Action:** He filters to failed workflows and compares current failures with recent runs.
**Climax:** He identifies the failing job and its dependencies without opening multiple logs.
**Resolution:** He guides the team to the fix quickly and reduces time-to-resolution.

### Journey 5: Integration / API Consumer (Optional)
**Opening Scene:** Rita wants pipeline insights inside her existing team workflow (e.g., Slack/Jira).
**Rising Action:** She uses a simple API/export to pull failure summaries.
**Climax:** Alerts are routed to the right channel with links to the exact failed step.
**Resolution:** The team reacts faster without leaving their primary tools.

### Journey Requirements Summary
- Instant overview of PR/branch pipelines with clear status.
- Zoom from macro view to specific failed step in 1-2 clicks.
- Fast, readable error cues (color + shape) and minimal navigation friction.
- Self-host deployment with simple setup and OAuth integration.
- Filtering and comparison for triage (e.g., failures over time).
- Optional API/export hooks for external workflows.

## Innovation & Novel Patterns

### Detected Innovation Areas
- Applying a metro-map metaphor to CI/CD pipelines, making dependencies readable at a glance.
- Progressive zoom from macro (overall pipeline health) to micro (exact failing step) without changing context.
- Visual error localization that reduces cognitive load compared to text-heavy logs.

### Market Context & Competitive Landscape
- GitHub Actions UI is functional but text-heavy and requires multiple clicks to form a mental model.
- Jenkins Blue Ocean improves pipeline visualization but is not native to GitHub and lacks the metro-map interaction model.
- This product differentiates on instant clarity and single-screen diagnosis.

### Validation Approach
- Usability test with 5-8 developers:
  - Time to identify failing step (<30s target)
  - Clicks to error (<=2)
- A/B compare against GitHub Actions UI for the same pipeline.
- Qualitative feedback on clarity and confidence.

### Risk Mitigation
- If the metro-map metaphor confuses users, fallback to a timeline + detail panel layout.
- Provide a toggle between "Map View" and "List View" for different mental models.

## Web App Specific Requirements

### Project-Type Overview
Web app dashboard focused on fast visual diagnosis of GitHub Actions pipelines, optimized for authenticated users rather than public SEO.

### Technical Architecture Considerations
- SPA with main routes for dashboard, PR/branch detail, and pipeline view.
- Real-time updates via polling every 10-15s (WebSockets as a later enhancement).
- Designed for authenticated access; SEO is not a priority.

### Browser Support Matrix
- Chrome, Edge, Firefox, Safari (last 2 versions).

### Responsive Design
- Desktop-first layout with responsive adjustments for tablet.
- Mobile support is best-effort, not a core MVP target.

### Performance Targets
- Initial dashboard render <2s (P95) once data is available.
- Interactive map interactions remain <100ms per action.

### SEO Strategy
- No public SEO requirements; focus on app performance and clarity.

### Accessibility Level
- Target WCAG AA with keyboard navigation and non-color status cues.

### Implementation Considerations
- Provide a simple self-host deployment path (Docker).
- Use GitHub OAuth for authentication and Actions API for data ingestion.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP focused on instant clarity and failure diagnosis.
**Resource Requirements:** 1-2 engineers (FE + BE) and 1 designer/PM part-time.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Primary developer happy path (find failure in <30s).
- Admin/Ops self-host setup.
- Support/DevOps triage.

**Must-Have Capabilities:**
- Single-repo view with PR/branch pipelines.
- Metro-map visualization with zoom (macro to detail).
- Error highlighting and status states.
- Click into step for log/output.
- Basic filters (status/branch) + search.
- GitHub OAuth + Actions ingestion.
- Self-host deployment via Docker.

### Post-MVP Features

**Phase 2 (Post-MVP):**
- Multi-repo and org views.
- Alerts/notifications.
- Saved filters and shared views.
- Basic analytics (time-to-failure, flaky steps).
- RBAC groundwork for SaaS.

**Phase 3 (Expansion):**
- Cross-CI observability.
- Predictive insights / failure clustering.
- Automated triage suggestions.
- Browser extension for quick access.

### Risk Mitigation Strategy

**Technical Risks:** Map performance and large pipelines. Mitigate with progressive rendering, virtualization, and fallback list view.
**Market Risks:** Users stick to GitHub UI. Mitigate with strong onboarding + time-to-value <10 minutes.
**Resource Risks:** Small team. Mitigate by cutting non-essential features and focusing on single-repo MVP.

## Functional Requirements

### Authentication & Access
- FR1: Users can authenticate via GitHub OAuth.
- FR2: Users can grant the app access to selected repositories.
- FR3: Users can view only the repositories they have access to.
- FR4: Admins can configure access settings for the self-hosted instance.

### Pipeline Discovery & Data Ingestion
- FR5: Users can see a list of recent PRs/branches with active or recent workflows.
- FR6: The system can ingest GitHub Actions workflow and job metadata for a selected repository.
- FR7: Users can refresh pipeline data on demand.
- FR8: The system can surface the latest workflow run status per PR/branch.

### Map Visualization & Navigation
- FR9: Users can view pipelines in a metro-map style visualization.
- FR10: Users can identify workflow/job status visually on the map.
- FR11: Users can zoom between macro and detailed views of a pipeline.
- FR12: Users can navigate from repo overview to a specific PR/branch pipeline view.

### Drill-Down Diagnostics
- FR13: Users can select a job/step to view details.
- FR14: Users can view error output for failed steps.
- FR15: Users can access key metadata for a workflow run (duration, start time, status).
- FR16: Users can see dependency relationships between jobs/steps.

### Filtering & Search
- FR17: Users can filter pipelines by status (success/failure/in-progress).
- FR18: Users can filter by branch or PR.
- FR19: Users can search for a workflow/job/step by name.

### Admin & Self-Host Operations
- FR20: Admins can deploy the app in a self-hosted environment.
- FR21: Admins can configure GitHub OAuth credentials.
- FR22: Admins can manage basic instance settings (base URL, polling interval).
- FR23: Admins can monitor connection health to GitHub APIs.

### Optional / Post-MVP Extensions (kept out of MVP scope)
- FR24: Users can view multi-repo dashboards.
- FR25: Users can subscribe to failure alerts.
- FR26: Users can export pipeline summaries via API.

## Non-Functional Requirements

### Performance
- P95 page load for dashboard and pipeline view <2s after data is available, measured via RUM (7-day rolling p95) on production data.
- User interactions (zoom, select step) respond <100ms, measured via client-side performance marks on reference hardware under normal load.
- Map rendering maintains >=30 FPS and interaction latency <150ms with 2,000 steps in view, measured in a synthetic benchmark on reference hardware.

### Reliability
- Self-hosted instance target uptime 99.5% per calendar month, measured by external uptime monitoring at 5-minute intervals excluding planned maintenance.
- Data refresh failures show an inline error and retry action within 5s in 99% of cases, measured via automated UI tests with synthetic failure injection.

### Security
- All data encrypted in transit using TLS 1.2+ with valid certificates, verified by automated security scans.
- OAuth tokens stored server-side and encrypted at rest; tokens never sent to the client, verified by security review and automated tests.
- GitHub OAuth scopes limited to least privilege (read-only repo/actions when possible), verified during security review and integration tests.

### Scalability
- Support at least 20 concurrent active users per instance with <20% increase in p95 latency, measured by 15-minute load tests on reference hardware.
- Handle repositories with 20+ workflows and 500+ runs without timeouts; 99% of pipeline views render within 5s in load tests.

### Accessibility
- WCAG 2.1 AA target with keyboard navigation and non-color status cues; 0 critical/serious issues in Lighthouse/axe audits plus manual keyboard testing.
- Focus states visible on 100% of interactive elements, verified by automated accessibility tests and manual audit.

### Integration
- GitHub API rate limits handled with exponential backoff and user feedback within 5s; 100% of rate-limit responses handled in integration tests.
- System recovers from temporary GitHub API outages within 60s of service restoration without manual intervention, verified via chaos tests.

