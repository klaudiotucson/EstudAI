export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

export function getSupabasePublishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || "";
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}

export function assertSupabaseConfigured() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();

  if (!url || !key) {
    throw new Error("Supabase nao configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }

  return { url, key };
}
