import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const date = searchParams.get("date");

  // Αν δίνεται όνομα
  if (name) {
    const { data, error } = await supabase
      .from("namedays")
      .select("date, names")
      .contains("names", [name]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Σφάλμα Supabase" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: `Δεν βρέθηκε γιορτή για το όνομα ${name}` });
    }

    return NextResponse.json({
      name,
      date: data[0].date,
    });
  }

  // Αν δίνεται ημερομηνία
  if (date) {
    let targetDate = date;

    // Αν ζητήθηκε "today"
    if (date === "today") {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      targetDate = `${year}-${month}-${day}`;
    }

    const { data, error } = await supabase
      .from("namedays")
      .select("date, names")
      .eq("date", targetDate);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Σφάλμα Supabase" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: `Δεν βρέθηκε γιορτή για την ημερομηνία ${targetDate}` });
    }

    return NextResponse.json({
      date: targetDate,
      names: data[0].names,
    });
  }

  return NextResponse.json(
    { error: "Χρειάζεται όνομα (name) ή ημερομηνία (date)." },
    { status: 400 }
  );
}
