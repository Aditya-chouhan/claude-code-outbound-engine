# Provider map

This repository models the architecture; it does **not** claim every commercial provider is live-wired in this public demo.

| Layer | Example providers | Contract / implementation |
|---|---|---|
| Sourcing | Prospeo, Apify, Google Maps, Crunchbase | `SourceProvider` |
| Research | Firecrawl, Serper, OpenRouter, Codex | `ResearchProvider` |
| Email finding | Million Verifier, Findymail, FullEnrich, LeadMagic | `EmailProvider` + `EmailWaterfall` |
| Infrastructure | Zapmail, ScaledMail, Google Workspace, Microsoft 365 | production extension point |
| Sending | Email Bison, HeyReach, Gmail | `SenderProvider` |
| Replies | Cloudflare Workers, Claude API, Slack, Cal.com | `ReplyIntelligenceProvider` + approval workflow |
| Booking | Google Calendar, Zoom, Grain, Stripe | production extension point |
| System of record | Supabase, GitHub Actions, Sheets, Notion | SQL schema + CI |

The purpose of the abstraction layer is to keep orchestration logic stable when providers change.
