import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase environment variables not configured. Using placeholder values.');
}

// Ensure HTTPS protocol
const normalizedUrl = supabaseUrl.startsWith('http://') 
  ? supabaseUrl.replace('http://', 'https://') 
  : supabaseUrl;

export const supabase = createClient(normalizedUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Type for registration data
export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  education: string;
  message?: string;
  source: 'popup' | 'landing_page';
  created_at?: string;
}
