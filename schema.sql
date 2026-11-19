-- Supabase > SQL Editor > New query me paste karke RUN karo.
-- PEHLE neeche ke 2 email apne aur dost ke Gmail se badlo!
create table if not exists applications(
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text, cls text, section text, interests text, why text,
  experience text, exp_details text, motivation text, area text, describe text,
  status text default 'Pending', remarks text, reviewed_by text, review_date text
);
create table if not exists owners(email text primary key);
insert into owners(email) values ('OWNER1@gmail.com'),('OWNER2@gmail.com') on conflict do nothing;

create or replace function is_owner() returns boolean
language sql security definer stable set search_path=public as
$$ select exists(select 1 from owners where lower(email)=lower(auth.jwt()->>'email')) $$;

alter table applications enable row level security;
alter table owners enable row level security;

create policy "anyone can submit" on applications for insert to anon, authenticated
  with check (status='Pending' and remarks is null and reviewed_by is null and length(name)<200 and length(why)<3000);
create policy "owners read" on applications for select to authenticated using (is_owner());
create policy "owners update" on applications for update to authenticated using (is_owner()) with check (is_owner());
create policy "owners delete" on applications for delete to authenticated using (is_owner());
