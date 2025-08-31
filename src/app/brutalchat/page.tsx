'use client';

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatRoom from "@/components/ChatRoom";

function BrutalChatInner() {
  const searchParams = useSearchParams();
  const character = searchParams.get("character") || "All";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <ChatRoom character={character} />
    </main>
  );
}

export default function BrutalChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <BrutalChatInner />
    </Suspense>
  );
}

