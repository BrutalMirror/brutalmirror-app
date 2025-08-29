import { supabase } from "./supabaseClient";

export async function sendQuestion(
  question: string,
  character: string
): Promise<{ message: string }> {
  if (character === "SaintBot" && /γιορτάζει|γιορτή/i.test(question)) {
    const lowerQ = question.toLowerCase();

    // 1) "ποιος γιορτάζει σήμερα"
    if (lowerQ.includes("ποιος") && lowerQ.includes("σήμερα")) {
      try {
        const res = await fetch("/api/namedays?date=today");
        const data = await res.json();

        if (data.error || data.message) {
          return {
            message:
              "✝️ Τέκνον μου, σήμερα δεν φαίνεται να υπάρχει καταγεγραμμένη γιορτή.",
          };
        }

        return {
          message: `✝️ Τέκνον μου, σήμερα ${data.date} τιμώνται οι: ${data.names.join(
            ", "
          )}.`,
        };
      } catch {
        return {
          message: "⚠️ Σφάλμα κατά την αναζήτηση της σημερινής γιορτής.",
        };
      }
    }

    // 2) "πότε γιορτάζω εγώ"
    if (
      lowerQ.includes("γιορτάζω εγώ") ||
      lowerQ.includes("γιορτή μου") ||
      lowerQ.includes("πότε γιορτάζω")
    ) {
      try {
        // 👉 Παίρνουμε το userId από Supabase Auth
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          return {
            message:
              "✝️ Τέκνον μου, δεν σε αναγνώρισα. Συνδέσου για να ξέρω πότε γιορτάζεις.",
          };
        }

        const userId = user.id;

        // Παίρνουμε το όνομα από το profile
        const profileRes = await fetch(`/api/profile?userId=${userId}`);
        const profileData = await profileRes.json();

        if (profileData.error) {
          return {
            message:
              "✝️ Τέκνον μου, δεν βρήκα το όνομά σου στο προφίλ. Συμπλήρωσέ το.",
          };
        }

        const userName = profileData.name;

        // Παίρνουμε τη γιορτή
        const res = await fetch(`/api/namedays?name=${encodeURIComponent(userName)}`);
        const data = await res.json();

        if (data.error || data.message) {
          return {
            message: `✝️ Τέκνον μου, δεν βρήκα πότε γιορτάζεις (${userName}).`,
          };
        }

        return {
          message: `✝️ Τέκνον μου, εσύ (${userName}) γιορτάζεις στις ${data.date}.`,
        };
      } catch {
        return { message: "⚠️ Σφάλμα κατά την αναζήτηση της γιορτής σου." };
      }
    }

    // 3) "πότε γιορτάζει ο/η ..."
    let name = "";
    const cleanQ = question.replace(/[;,.!?]/g, "").toLowerCase();
    const words = cleanQ.split(" ");
    const idx = words.findIndex(
      (w) => w === "ο" || w === "η" || w === "της" || w === "του"
    );

    if (idx !== -1 && words[idx + 1]) {
      name = words[idx + 1];
    } else {
      name = words[words.length - 1];
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);

    try {
      const res = await fetch(`/api/namedays?name=${encodeURIComponent(name)}`);
      const data = await res.json();

      if (data.error || data.message) {
        return {
          message: `✝️ Τέκνον μου, δεν βρήκα γιορτή για το όνομα ${name}.`,
        };
      }

      return {
        message: `✝️ Τέκνον μου, ο/η ${data.name} γιορτάζει στις ${data.date}.`,
      };
    } catch {
      return { message: "⚠️ Σφάλμα κατά την αναζήτηση γιορτής." };
    }
  }

  // Default: για όλους τους άλλους χαρακτήρες
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, character }),
  });

  if (!response.ok) {
    throw new Error("Failed to send question");
  }

  const data = await response.json();
  return { message: data.message || "🤖 Δεν δόθηκε απάντηση." };
}
