"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

interface ChatMessage {
  id: string;
  username: string;
  character: string | null;
  content: string;
  created_at: string;
}

const bots = [
  {
    name: "FunnyGuy",
    style: "😂",
    color: "text-yellow-400",
    phrases: [
      "Γιατί ο προγραμματιστής πήγε στο μπαρ; Για να κάνει refresh! 🤣",
      "Καλύτερα να γελάς μόνος σου, έχεις το τέλειο κοινό!",
      "Όλα δουλεύουν... μέχρι να τα αγγίξει ο χρήστης!",
    ],
    interval: 15000,
  },
  {
    name: "GossipGirl",
    style: "👄",
    color: "text-pink-400",
    phrases: [
      "Ακούσατε ποιος μίλησε με ποιον; 😏",
      "Λένε ότι κάποιος εδώ μέσα κρύβει κάτι...",
      "Η κουτσομπόλα σας είναι πάντα σε επιφυλακή 💋",
    ],
    interval: 25000,
  },
  {
    name: "AngryMan",
    style: "💢",
    color: "text-red-500",
    phrases: [
      "ΣΟΒΑΡΑ τώρα; Αυτό έγραψες;",
      "Άντε ρε! Δεν αντέχω άλλο το spam!",
      "Αν ήμουν mod, θα σας είχα κάνει kick ήδη.",
    ],
    interval: 30000,
  },
  {
    name: "ColdRealist",
    style: "❄️",
    color: "text-blue-400",
    phrases: [
      "Η ζωή είναι απλά μια σειρά από logs.",
      "Σε 5 λεπτά κανείς δεν θα θυμάται αυτό το μήνυμα.",
      "Ρεαλιστικά, ό,τι γράφετε είναι μάταιο.",
    ],
    interval: 40000,
  },
  {
    name: "LoverGirl",
    style: "💖",
    color: "text-rose-400",
    phrases: [
      "Αχ, τι γλυκούλης που είσαι όταν γράφεις! 😘",
      "Μήπως ψάχνεις λίγη αγάπη μέσα στο BrutalMirror; 💕",
      "Αν ήσουν μήνυμα, θα ήσουν pinned στην καρδιά μου.",
    ],
    interval: 35000,
  },
  {
    name: "IronicLady",
    style: "🙄",
    color: "text-purple-400",
    phrases: [
      "Ουάου... τι πρωτότυπο σχόλιο 🙃",
      "Συγχαρητήρια, έγραψες κάτι που κανείς δεν θα θυμάται.",
      "Ναι ναι, όλοι ενδιαφέρονται πάρα πολύ… όχι.",
    ],
    interval: 20000,
  },
  {
    name: "SaintBot",
    style: "✝️",
    color: "text-green-400",
    phrases: [
      "Τέκνον μου, η αλήθεια ελευθερώσει υμάς.",
      "Ο λόγος του Θεού είναι ζων και ενεργός.",
      "Αγάπα τον πλησίον σου όπως τον εαυτό σου.",
    ],
    interval: 45000,
  },
];

const botColors: Record<string, string> = Object.fromEntries(
  bots.map((b) => [b.name, b.color])
);

function getBotMessage(bot: typeof bots[number], latestMessages: ChatMessage[]) {
  let message =
    bot.phrases[Math.floor(Math.random() * bot.phrases.length)];

  if (latestMessages.length > 0 && Math.random() < 0.25) {
    const target =
      latestMessages[Math.floor(Math.random() * latestMessages.length)];
    message = `@${target.username} ${message}`;
  }

  return {
    username: bot.name,
    content: `${bot.style} ${message}`,
  };
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  async function fetchMessages() {
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100);
    if (data) setMessages(data);
  }

  async function sendMessage(username: string, content: string) {
    if (!content.trim()) return;
    await supabase.from("chat_messages").insert([{ username, content }]);
  }

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load αρχικά μηνύματα
  useEffect(() => {
    fetchMessages();

    // Realtime subscription
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Bot activity
  useEffect(() => {
    const intervals = bots.map((bot) =>
      setInterval(() => {
        const botMsg = getBotMessage(bot, messages);
        sendMessage(botMsg.username, botMsg.content);
      }, bot.interval)
    );
    return () => intervals.forEach(clearInterval);
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl mx-auto border rounded-lg shadow bg-black text-white font-mono">
      {/* Μηνύματα */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {messages.map((msg) => {
          const color = botColors[msg.username] || "text-gray-300";
          return (
            <div key={msg.id}>
              <span className={`${color} font-bold`}>{msg.username}</span>
              <span className="text-gray-400">
                {" "}
                [{new Date(msg.created_at).toLocaleTimeString("el-GR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}]
              </span>
              : <span className="text-white">{msg.content}</span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex space-x-2 border-t border-gray-700 p-2">
        <input
          type="text"
          className="flex-1 rounded bg-gray-900 text-white px-3 py-2 outline-none"
          placeholder="Γράψε μήνυμα..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage("Stergios", newMessage)
          }
        />
        <button
          onClick={() => sendMessage("Stergios", newMessage)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
