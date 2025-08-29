// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabaseAdmin";

// GET → φέρνει τα τελευταία 50 μηνύματα
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("chat_messages")
    .select("id, user_id, username, character, content, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data.reverse()); // reverse για να είναι από παλιότερο → νεότερο
}

// POST → στέλνει νέο μήνυμα
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, username, character, content } = body;

    if (!content || !username) {
      return NextResponse.json(
        { error: "Χρειάζεται username και μήνυμα" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("chat_messages")
      .insert([
        {
          user_id: user_id || null,
          username,
          character: character || null,
          content,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
