'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

interface QuestionRow {
  id: string;
  character: string;
  question: string;
  answer: string | null;
  created_at: string;
}

export default function AskCharacterPage() {
  const { character } = useParams();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [qaList, setQaList] = useState<QuestionRow[]>([]);

  // φόρτωσε τις τελευταίες 5 ερωτήσεις/απαντήσεις
  const loadHistory = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("character", character)
      .order("created_at", { ascending: false })
      .limit(5);

    if (!error && data) {
      setQaList(data.reverse()); // τα βάζουμε με σωστή σειρά
    }
  };

  useEffect(() => {
    loadHistory();
  }, [character]);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("questions")
      .insert([{ character: character, question: question, answer: null }])
      .select()
      .single();

    if (error) {
      console.error("Error inserting question:", error);
      setLoading(false);
      return;
    }

    setQuestion("");

    // πρόσθεσε προσωρινά στο ιστορικό
    setQaList((prev) => [
      ...prev.slice(-4), // κρατάμε τα 4 τελευταία
      data, // προσθέτουμε το νέο
    ]);

    setLoading(false);
  };

  // realtime listener για updates
  useEffect(() => {
    const channel = supabase
      .channel("answers-listener")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "questions",
          filter: `character=eq.${character}`,
        },
        (payload) => {
          const updated = payload.new as QuestionRow;
          setQaList((prev) =>
            prev.map((q) => (q.id === updated.id ? updated : q))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [character]);

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", textAlign: "center" }}>
        BrutalMirror
      </h1>

      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Συνεδρία με: <span style={{ color: "#f00" }}>{character}</span>
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Γράψε την ερώτησή σου..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            padding: "0.75rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: "0.75rem",
            backgroundColor: "#000",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          {loading ? "Στέλνει..." : "Ρώτα"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {qaList.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            Δεν υπάρχουν ερωτήσεις ακόμα.
          </p>
        ) : (
          qaList.map((q) => (
            <div
              key={q.id}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <p>
                <strong>Ερώτηση:</strong> {q.question}
              </p>
              <p>
                <strong>Απάντηση:</strong>{" "}
                {q.answer ? q.answer : "⏳ Περιμένω απάντηση..."}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
