'use client';

import { useSearchParams } from "next/navigation";
import ChatRoom from "@/components/ChatRoom";

export default function BrutalChatPage() {
  const searchParams = useSearchParams();
  const character = searchParams.get("character") || "All";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <ChatRoom character={character} />
    </main>
  );
}
