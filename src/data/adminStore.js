import { supabase } from '../lib/supabase';

const PFX = 'trava_admin_';

// Sync read from localStorage cache (used by components during render)
export const loadContent = (key, defaultValue) => {
  try {
    const raw = localStorage.getItem(PFX + key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultValue;
};

// Write to localStorage + Supabase
export const saveContent = async (key, value) => {
  try { localStorage.setItem(PFX + key, JSON.stringify(value)); } catch {}
  await supabase.from('content').upsert({ key, value });
};

export const clearContent = async (key) => {
  localStorage.removeItem(PFX + key);
  await supabase.from('content').delete().eq('key', key);
};

// On app load: pull all rows from Supabase → populate localStorage cache
export const fetchAllFromSupabase = async () => {
  const { data, error } = await supabase.from('content').select('key, value');
  if (error || !data) return;
  for (const row of data) {
    try { localStorage.setItem(PFX + row.key, JSON.stringify(row.value)); } catch {}
  }
};
