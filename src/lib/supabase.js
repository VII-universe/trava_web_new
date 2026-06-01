import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://zwhzlziipzvmcfhpuycx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3aHpsemlpcHp2bWNmaHB1eWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4OTY3MTYsImV4cCI6MjA5MjQ3MjcxNn0.2fqQJuJqpGKlGOH9UQK36PaBTsfyh8mqgzyySbrF_VU'
);
