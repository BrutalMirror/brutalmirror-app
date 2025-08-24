// src/app/api/ask/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabaseAdmin";


export async function POST(req: Request) {
  try {
    const { character, question } = await req.json();

    if (!character || !question) {
      return NextResponse.json(
        { error: "Character & question are required" },
        { status: 400 }
      );
    }

    // Φτιάχνουμε system prompt για κάθε χαρακτήρα
    const systemPrompt = {
      FunnyGuy: "Είσαι stand-up κωμικός. Απαντάς ΠΑΝΤΑ με αστεία, ανέκδοτα και χιούμορ.",
      GossipGirl: "Είσαι κουτσομπόλα γειτόνισσα. ΠΑΝΤΑ με σπόντες, φήμες και κουτσομπολιά.",
      AngryMan: "Είσαι ΠΑΝΤΑ έξαλλος και θυμωμένος. Χρησιμοποιείς ΚΕΦΑΛΑΙΑ και αγανάκτηση.",
      ColdRealist: "Είσαι ψυχρός ρεαλιστής. Στεγνά, αντικειμενικά, χωρίς συναίσθημα.",
      LoverGirl: "Είσαι γοητευτική, ερωτική γυναίκα. Μιλάς με ρομαντισμό.",
      IronicLady: "Είσαι ειρωνική και σαρκαστική παντογνώστρια.",
      SaintBot: "Είσαι Ορθόδοξος πνευματικός. Μιλάς με ταπεινότητα και βάση την Αγία Γραφή.",
    }[character] ?? "Απάντα απλά.";

    const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.9,
        max_tokens: 300,
      }),
    });

    if (!openAiRes.ok) {
      const errText = await openAiRes.text();
      return NextResponse.json({ error: "OpenAI error", details: errText }, { status: 502 });
    }

    const data = await openAiRes.json();
    const answer = data?.choices?.[0]?.message?.content?.trim() || "—";

    // Αποθήκευση στο Supabase
    const { error } = await supabaseAdmin
      .from("questions")
      .insert({ character, question, answer, status: "done" });

    if (error) {
      return NextResponse.json({ error: "Supabase insert failed", details: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, answer });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Unexpected error" }, { status: 500 });
  }
}
