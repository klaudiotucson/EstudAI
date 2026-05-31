import { createBrowserClient } from "@supabase/ssr";
import { assertSupabaseConfigured, isSupabaseConfigured } from "./config";

export { isSupabaseConfigured };

export function createClient() {
  const { url, key } = assertSupabaseConfigured();
  return createBrowserClient(url, key);
}
