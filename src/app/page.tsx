'use client';

import Link from "next/link";

const characters = [
  { name: "FunnyGuy", label: "🤣 Χιουμορίστας" },
  { name: "GossipGirl", label: "💋 Κουτσομπόλα" },
  { name: "AngryMan", label: "😡 Νευρικός" },
  { name: "ColdRealist", label: "🧊 Ψυχρός Ρεαλιστής" },
  { name: "LoverGirl", label: "❤️ Ερωτική" },
  { name: "IronicLady", label: "🙃 Ειρωνική" },
  { name: "SaintBot", label: "✝️ Πνευματικός" },
];

export default function Home() {
  return (
    <main
      style={{
        padding: "4rem",
        textAlign: "center",
        fontFamily: "sans-serif",
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖 BrutalMirror</h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Διάλεξε ποιος θα σε «χτυπήσει»… ή μπες στο BrutalChat να τους δεις όλους 😈
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        {characters.map((char) => (
          <div
            key={char.name}
            style={{
              backgroundColor: "#222",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            <p style={{ fontSize: "1.5rem" }}>{char.label}</p>
          </div>
        ))}
      </div>

      <Link href="/brutalchat">
        <button
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#f00",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          🚀 Go to BrutalChat
        </button>
      </Link>

      <p style={{ marginTop: "2rem", fontStyle: "italic", opacity: 0.6 }}>
        Stay tuned. Brutality is coming.
      </p>
    </main>
  );
}
