// others/config/lib/supabase.ts
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // we handle deep links manually
  },
});

/**
 * Used by OAuth / Magic Link flows.
 * Make sure you have a screen at /auth/callback that calls exchangeCodeForSession.
 */
export function getRedirectTo() {
  return Linking.createURL('/auth/callback');
}
