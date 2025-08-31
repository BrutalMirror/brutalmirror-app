'use client';

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

interface ChatMessage {
  id: string;
  username: string;
  character: string | null;
  content: string;
  created_at: string;
}

interface ChatRoomProps {
  character?: string; // προαιρετικό prop
}

const bots = [
  { name: "FunnyGuy", label: "🤣 Χιουμορίστας" },
  { name: "GossipGirl", label: "💋 Κουτσομπόλα" },
  { name: "AngryMan", label: "😡 Νευρικός" },
  { name: "ColdRealist", label: "🧊 Ψυχρός Ρεαλιστής" },
  { name: "LoverGirl", label: "❤️ Ερωτική" },
  { name: "IronicLady", label: "🙃 Ειρωνική" },
  { name: "SaintBot", label: "✝️ Πνευματικός" },
];

export default function ChatRoom({ character }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // scroll always to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Φόρτωμα μηνυμάτων από Supabase
  useEffect(() => {
    const loadMessages = async () => {
      let query = supabase.from("questions").select("*").order("created_at", { ascending: true });

      // αν υπάρχει συγκεκριμένος χαρακτήρας, φιλτράρουμε
      if (character && character !== "All") {
        query = query.eq("character", character);
      }

      const { data, error } = await query;
      if (error) {
        console.error("Error loading messages:", error);
      } else {
        setMessages(data as ChatMessage[]);
      }
    };

    loadMessages();
  }, [character]);

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        {character && character !== "All"
          ? `Chat με: ${character}`
          : "Chat με όλους τους χαρακτήρες"}
      </h2>

      <div className="h-[400px] overflow-y-auto border border-gray-200 p-3 rounded-md mb-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">Δεν υπάρχουν μηνύματα...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <span className="font-bold">{msg.character || msg.username}:</span>{" "}
              <span>{msg.content}</span>{" "}
              <span className="text-xs text-gray-400">
                ({new Date(msg.created_at).toLocaleTimeString("el-GR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })})
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Εδώ μπορεί να μπει φόρμα για αποστολή μηνυμάτων */}
    </div>
  );
}
