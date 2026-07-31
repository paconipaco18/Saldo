create extension if not exists pgcrypto;

create table invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  client_name text not null,
  client_email text,
  client_language text not null default 'es' check (client_language in ('es', 'en')),
  amount numeric not null check (amount > 0),
  currency text not null default 'USD' check (currency in ('USD', 'EUR', 'VES')),
  issue_date date not null,
  due_date date not null,
  status text not null default 'pending' check (status in ('pending', 'paid')),
  created_at timestamptz not null default now()
);

create index invoices_user_id_idx on invoices(user_id);

alter table invoices enable row level security;

create policy "Users can view their own invoices"
  on invoices for select
  using (auth.uid() = user_id);

create policy "Users can insert their own invoices"
  on invoices for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own invoices"
  on invoices for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own invoices"
  on invoices for delete
  using (auth.uid() = user_id);
