# Architecture

The system is deliberately provider-agnostic. A coding agent or scheduler orchestrates interfaces, while durable state lives in the database.

```text
SOURCING -> RESEARCH -> QUALIFY -> EMAIL WATERFALL -> SEND
                |                           |
                v                           v
             EVIDENCE                    CACHE
                \                           /
                 \---- SYSTEM OF RECORD ---/
                              |
                              v
                    REPLIES -> HUMAN APPROVAL
                              |
                              v
                           BOOKING
```

## Design principles

1. **Own the database; rent providers.** Provider swaps should not require data migration.
2. **Rubric over vibe.** Research outputs are evaluated against deterministic criteria.
3. **Cheapest provider first.** Email enrichment uses a cost-ranked waterfall.
4. **Cache every deterministic hit.** Do not pay twice for the same result.
5. **Human approval on replies.** The agent can classify and draft; a human approves sends.
6. **Measure downstream quality.** Track show rate and revenue by source, not just bookings.
7. **Provider health is a first-class signal.** Inbox/domain health should gate sending.

## Production extensions

- Durable job queue (Cloudflare Queues, SQS, or Supabase pgmq)
- Rate-limit-aware concurrency per provider
- Idempotency keys for every external write
- Dead-letter queue and replay tooling
- Secret management
- Per-provider cost ledger
- Inbox/domain health state machine
- Event-sourced funnel analytics
