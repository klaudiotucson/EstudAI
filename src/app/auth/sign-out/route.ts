import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const url = new URL(request.url);

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/login", url.origin), { status: 303 });
}
