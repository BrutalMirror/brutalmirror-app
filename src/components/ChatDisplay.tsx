'use client';

import { useEffect, useState } from 'react';
import { getConvo } from '../utils/getConvo';

interface ChatDisplayProps {
  selectedCharacter: string;
}

interface Message {
  question: string;
  answer: string;
  created_at: string;
}

export const ChatDisplay = ({ selectedCharacter }: ChatDisplayProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getConvo(selectedCharacter);
      setMessages(data);
    };

    fetchMessages();
  }, [selectedCharacter]);

  return (
    <div style={{ padding: '1rem', maxHeight: '60vh', overflowY: 'auto' }}>
      {messages.map((msg, index) => {
        const time = new Date(msg.created_at).toLocaleTimeString('el-GR', {
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>🕒 {time}</p>
            <p><strong>Ερώτηση:</strong> {msg.question}</p>
            <p><strong>Απάντηση:</strong> {msg.answer}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};