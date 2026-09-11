-- =============================================================
-- PORTFOLIO SUPABASE SCHEMA
-- Jalankan script ini di Supabase SQL Editor:
-- https://supabase.com/dashboard > SQL Editor > New Query
-- =============================================================

-- 1. developer_info
create table if not exists developer_info (
  id          bigint primary key default 1,
  name        text not null,
  title       text,
  tagline     text,
  location    text,
  email       text,
  github      text,
  linkedin    text,
  twitter     text,
  current_status text,
  cv_url      text,
  cv_filename text,
  roles       text[] default '{}',
  stats       jsonb  default '[]',
  updated_at  timestamptz default now()
);
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'developer_info_singleton') then
    alter table developer_info add constraint developer_info_singleton check (id = 1);
  end if;
end $$;

-- 2. projects
create table if not exists projects (
  id                  text primary key,
  title               text not null,
  description         text,
  long_description    text,
  tags                text[] default '{}',
  year                text,
  role                text,
  team                text,
  type                text,
  type_label          text,
  duration            text,
  impact              text,
  image_url           text,
  gallery             text[] default '{}',
  github_url          text,
  live_url            text,
  challenge           text,
  solution            text,
  technical_decisions text,
  outcome             text,
  learnings           text,
  featured            boolean default false,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- 3. blog_posts
create table if not exists blog_posts (
  id           text primary key,
  title        text not null,
  excerpt      text,
  date         text,
  read_time    text,
  tags         text[] default '{}',
  image_url    text,
  content      jsonb  default '[]',
  related_ids  text[] default '{}',
  status       text   default 'published',
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- 4. messages
create table if not exists messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  status     text default 'new',
  created_at timestamptz default now()
);

-- 5. chatbot_kb
create table if not exists chatbot_kb (
  id         uuid primary key default gen_random_uuid(),
  triggers   text[] not null default '{}',
  response   text not null,
  active     boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. skills & tech_stack
create table if not exists skills (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  value      integer not null check (value >= 0 and value <= 100),
  sort_order integer default 0
);

create table if not exists tech_stack (
  id         uuid primary key default gen_random_uuid(),
  category   text not null,
  items      text[] default '{}',
  sort_order integer default 0
);

-- RLS
alter table developer_info enable row level security;
alter table projects        enable row level security;
alter table blog_posts      enable row level security;
alter table messages        enable row level security;
alter table chatbot_kb      enable row level security;
alter table skills          enable row level security;
alter table tech_stack      enable row level security;

-- Policies (Drop and recreate to be 100% idempotent)
drop policy if exists "public_read_developer_info" on developer_info;
create policy "public_read_developer_info" on developer_info for select using (true);

drop policy if exists "public_read_projects" on projects;
create policy "public_read_projects" on projects for select using (true);

drop policy if exists "public_read_blog_posts" on blog_posts;
create policy "public_read_blog_posts" on blog_posts for select using (true);

drop policy if exists "public_read_chatbot_kb" on chatbot_kb;
create policy "public_read_chatbot_kb" on chatbot_kb for select using (active = true);

drop policy if exists "public_read_skills" on skills;
create policy "public_read_skills" on skills for select using (true);

drop policy if exists "public_read_tech_stack" on tech_stack;
create policy "public_read_tech_stack" on tech_stack for select using (true);

drop policy if exists "public_insert_messages" on messages;
create policy "public_insert_messages" on messages for insert with check (true);

drop policy if exists "anon_all_developer_info" on developer_info;
create policy "anon_all_developer_info" on developer_info for all using (true) with check (true);

drop policy if exists "anon_all_projects" on projects;
create policy "anon_all_projects" on projects for all using (true) with check (true);

drop policy if exists "anon_all_blog_posts" on blog_posts;
create policy "anon_all_blog_posts" on blog_posts for all using (true) with check (true);

drop policy if exists "anon_all_messages" on messages;
create policy "anon_all_messages" on messages for all using (true) with check (true);

drop policy if exists "anon_all_chatbot_kb" on chatbot_kb;
create policy "anon_all_chatbot_kb" on chatbot_kb for all using (true) with check (true);

drop policy if exists "anon_all_skills" on skills;
create policy "anon_all_skills" on skills for all using (true) with check (true);

drop policy if exists "anon_all_tech_stack" on tech_stack;
create policy "anon_all_tech_stack" on tech_stack for all using (true) with check (true);
