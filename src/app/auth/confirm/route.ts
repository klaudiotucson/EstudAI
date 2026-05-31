import { type EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

function safeNextPath(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(url.searchParams.get("next"));

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(new URL("/login?auth=not-configured", url.origin));
  }

  if (code) {
    return NextResponse.redirect(new URL(`/auth/callback?code=${encodeURIComponent(code)}&next=${encodeURIComponent(next)}`, url.origin));
  }

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });

    if (!error) {
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth-confirm", url.origin));
}
