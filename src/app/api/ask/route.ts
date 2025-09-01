// src/app/api/ask/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabaseAdmin";

type Body = { character?: string; question?: string };

export async function POST(req: Request) {
  try {
    const { character, question }: Body = await req.json();
    if (!character || !question) {
      return NextResponse.json(
        { error: "Character & question are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY missing" },
        { status: 500 }
      );
    }

    // Prompt ανάλογα τον χαρακτήρα
    const systemPrompt = `Είσαι ο χαρακτήρας ${character}. Απάντησε με το προσωπικό του στυλ.`;

    // Ζητάμε απάντηση από OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.9,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: "OpenAI error", details: errText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const answer: string =
      data?.choices?.[0]?.message?.content?.trim?.() ?? "—";

    // Αποθήκευση στο Supabase
    const { error } = await supabaseAdmin
      .from("questions")
      .insert({ character, question, answer });

    if (error) {
      return NextResponse.json(
        { error: "Supabase insert failed", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, answer });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
