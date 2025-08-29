// src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";       // για το session
import { supabaseAdmin } from "@/utils/supabaseAdmin";   // για ασφαλή queries

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // 1) Προσπάθεια να βρούμε user από session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let userId: string | null = null;

  if (user && !userError) {
    userId = user.id; // από session
  } else {
    // 2) Αν δεν υπάρχει session → fallback σε query param
    userId = searchParams.get("userId");
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Χρειάζεται userId" },
      { status: 400 }
    );
  }

  // 3) Χρήση supabaseAdmin για να διαβάσουμε από το table
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Δεν βρέθηκε προφίλ" },
      { status: 404 }
    );
  }

  return NextResponse.json({ name: data.full_name });
}
