# Claude Code Outbound Engine

A reference implementation of an **AI-native outbound orchestration layer**: source accounts, research them against a deterministic ICP rubric, resolve contact data through a cost-ranked waterfall, persist state, and coordinate outbound actions through API-first providers.

> **Portfolio scope.** This repository demonstrates architecture and implementation patterns. The default adapters are deterministic demo providers so the project can run without paid API keys. It does **not** claim that every commercial provider shown in the architecture is live in this repo, nor that third-party performance figures are results produced by this implementation.

## The idea

Most outbound stacks are a collection of dashboards. This project treats them as one programmable system.

```text
Sources -> Research -> ICP qualification -> Email waterfall -> Send
   |                                                    |
   +---------------- System of record <-----------------+
                            |
                   Replies / approval / booking
```

The coding agent is an **orchestrator**, not the database and not the business logic. Provider APIs can be swapped without rewriting the workflow.

## Eight layers

| Layer | Example providers | Design rule |
|---|---|---|
| Sourcing | Prospeo, Apify, Google Maps, Crunchbase | Pull the market once, then slice it. |
| Research | Firecrawl, Serper, OpenRouter, Codex | Give the model a rubric, not a vibe. |
| Email finding | Million Verifier, Findymail, FullEnrich, LeadMagic | Cheapest first; cache every successful hit. |
| Infrastructure | Zapmail, ScaledMail, Google Workspace, Microsoft 365 | Isolate domains and providers to contain failure. |
| Sending | Email Bison, HeyReach, Gmail | Keep sending state observable and API-controlled. |
| Replies | Cloudflare Workers, Claude API, Slack, Cal.com | Human approval for consequential replies. |
| Booking | Google Calendar, Zoom, Grain, Stripe | Measure meetings through to show rate and revenue. |
| System of record | Supabase/Postgres, GitHub Actions, Sheets, Notion | **Own the database. Rent everything else.** |

## What is implemented

- TypeScript orchestration engine
- Provider interfaces for sourcing, research, enrichment and sending
- Deterministic ICP scoring rubric
- Cost-ranked email-provider waterfall
- Cache-first enrichment to avoid paying twice for the same result
- End-to-end demo workflow
- Postgres/Supabase schema
- Unit tests
- GitHub Actions CI
- Architecture and provider-map documentation

## Quick start

```bash
npm install
npm test
npm run dev
```

No paid API keys are required for the demo path.

## Architecture principles

### 1. Deterministic rules around probabilistic models

Models can produce research, summaries and classifications. The revenue workflow still needs explicit gates. `src/core/rubric.ts` turns research into a reproducible score and decision instead of letting an LLM decide qualification from an unconstrained prompt.

### 2. Provider abstraction

Business logic imports contracts, not vendor SDKs. Moving from one enrichment or sending vendor to another should be an adapter change rather than a workflow rewrite.

### 3. Cache before cost

Enrichment providers are ordered by effective cost. Before any provider call, the workflow checks the cache. A successful email becomes reusable system state.

### 4. The database is the control plane

Provider dashboards are views over execution. The durable truth belongs in the system of record: account state, provider attempts, evidence, approvals, sends, replies and bookings.

### 5. Humans stay in the consequential loop

The intended reply architecture lets an agent classify a response and draft the next action, while a human approves messages that create commitments, pricing claims, or sensitive follow-up.

## Repository map

```text
.
├── .github/workflows/ci.yml
├── docs/
│   ├── ARCHITECTURE.md
│   └── PROVIDER-MAP.md
├── sql/schema.sql
├── src/
│   ├── core/
│   ├── providers/
│   └── workflows/
└── tests/
```

## Production hardening

A production deployment would add retries/timeouts, circuit breakers, encrypted secrets, idempotency keys, queue-based concurrency, provider telemetry, suppression/unsubscribe handling, inbox health monitoring, webhook signature verification, approval audit logs, and privacy/retention controls.

## Why this is a GTM engineering project

The interesting problem is not "send an email with an LLM." It is designing the system that decides which accounts enter the workflow, what evidence qualifies them, which provider should be called next, when a paid API call can be avoided, what state must be durable, where humans need control, and how the whole pipeline stays observable.

That is the boundary between isolated sales automation and **revenue infrastructure**.

## Related work

Portfolio: https://aditya-chouhan.github.io/

GitHub: https://github.com/Aditya-chouhan

## License

MIT
