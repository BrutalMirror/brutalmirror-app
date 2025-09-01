'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// φορτώνουμε ChatRoom μόνο στον client (καθόλου SSR/prerender)
const ChatRoom = dynamic(() => import("@/components/ChatRoom"), { ssr: false });

export default function BrutalChatPage() {
  const [character, setCharacter] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const charFromUrl = params.get("character");
      if (charFromUrl) {
        setCharacter(charFromUrl);
      }
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <ChatRoom character={character} />
    </main>
  );
}
