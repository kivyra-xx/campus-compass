create extension if not exists "uuid-ossp";

create table public.roles (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.users (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  password_hash text not null,
  role_id uuid not null references public.roles(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references public.users(id) on delete cascade,
  full_name text not null,
  student_id text,
  programme text,
  department text,
  level text,
  academic_year text,
  semester text,
  phone text,
  address text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.courses (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  title text not null,
  credit_hours integer not null check (credit_hours > 0),
  lecturer_id uuid references public.users(id),
  department text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.course_registrations (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  academic_year text not null,
  semester text not null,
  status text not null default 'approved',
  created_at timestamptz not null default now(),
  unique (student_id, course_id, academic_year, semester)
);

create table public.results (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  score numeric(5,2) not null,
  grade text not null,
  semester text not null,
  created_at timestamptz not null default now()
);

create table public.fees (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  description text not null,
  amount numeric(12,2) not null check (amount >= 0),
  due_date date,
  status text not null default 'outstanding',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  fee_id uuid references public.fees(id),
  amount numeric(12,2) not null check (amount >= 0),
  payment_method text not null,
  reference text not null unique,
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  summary text not null,
  audience text not null,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  detail text not null,
  priority text not null default 'medium',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  type text not null,
  file_url text not null,
  status text not null default 'verified',
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index idx_profiles_student_id on public.profiles(student_id);
create index idx_course_registrations_student on public.course_registrations(student_id);
create index idx_results_student on public.results(student_id);
create index idx_fees_student on public.fees(student_id);
create index idx_payments_student on public.payments(student_id);
create index idx_notifications_user on public.notifications(user_id);

alter table public.roles enable row level security;
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_registrations enable row level security;
alter table public.results enable row level security;
alter table public.fees enable row level security;
alter table public.payments enable row level security;
alter table public.announcements enable row level security;
alter table public.notifications enable row level security;
alter table public.documents enable row level security;

create policy "Students can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Students can read own registrations" on public.course_registrations for select using (auth.uid() = student_id);
create policy "Students can read own results" on public.results for select using (auth.uid() = student_id);
create policy "Students can read own fees and payments" on public.fees for select using (auth.uid() = student_id);
create policy "Students can read own payments" on public.payments for select using (auth.uid() = student_id);
create policy "Students can read own documents" on public.documents for select using (auth.uid() = user_id);
create policy "Students can read own notifications" on public.notifications for select using (auth.uid() = user_id);

create policy "Staff can manage academic records" on public.results for all using (true) with check (true);
create policy "Staff can manage fees" on public.fees for all using (true) with check (true);
create policy "Staff can manage announcements" on public.announcements for all using (true) with check (true);
create policy "Authenticated users can read courses" on public.courses for select using (auth.role() = 'authenticated');
create policy "Authenticated users can read announcements" on public.announcements for select using (auth.role() = 'authenticated');
