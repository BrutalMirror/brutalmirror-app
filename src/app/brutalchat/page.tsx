'use client';

import dynamic from "next/dynamic";

const ChatRoom = dynamic(() => import("@/components/ChatRoom"), { ssr: false });

export default function BrutalChatPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <ChatRoom character="All" />
    </main>
  );
}
