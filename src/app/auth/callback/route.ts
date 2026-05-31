import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function safeNextPath(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNextPath(url.searchParams.get("next"));

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL("/login?auth=not-configured", url.origin));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=auth-code-missing", url.origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL("/login?error=auth-code-invalid", url.origin));
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
