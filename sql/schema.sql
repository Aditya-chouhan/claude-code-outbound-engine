create table if not exists leads (
  id text primary key,
  company text not null,
  domain text not null,
  source text not null,
  status text not null default 'new',
  qualification_score int,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists email_cache (
  cache_key text primary key,
  email text not null,
  provider text not null,
  confidence numeric,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id bigserial primary key,
  lead_id text references leads(id),
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
