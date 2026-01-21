import { createClient } from '@supabase/supabase-js';

// Helper to safely access environment variables from various sources (Vite, Process, or Fallback)
const getEnvVar = (key: string, fallback: string): string => {
  // 1. Try import.meta.env (Vite standard)
  try {
    const meta = import.meta as any;
    if (meta && meta.env && meta.env[key]) {
      return meta.env[key];
    }
  } catch (err) {
    // Ignore errors accessing import.meta
  }

  // 2. Try process.env (Node/Webpack standard)
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (err) {
    // Ignore errors accessing process
  }

  // 3. Return fallback (hardcoded from .env for robustness in demo envs)
  return fallback;
};

// Use provided .env values as fallbacks to ensure app runs even if env injection fails
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'https://zgkovghzfzrgpxjobq.supabase.co');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'sb_publishable_ICFao23PmLonXjt4MzDtxQ_GLgBc2Y1');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);