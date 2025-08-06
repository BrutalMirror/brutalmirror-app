'use client';

import { useEffect, useState } from 'react';
import { getAnswers } from '../utils/getAnswers';

interface AnswerItem {
  character: string;
  question: string;
  answer: string;
  created_at: string;
}

export default function AnswersList() {
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAnswers();
      setAnswers(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <p style={{ padding: '1rem' }}>⏳ Φόρτωση απαντήσεων...</p>;
  if (answers.length === 0) return <p style={{ padding: '1rem' }}>Δεν υπάρχουν ακόμη απαντήσεις.</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>🧠 BrutalMirror Απαντήσεις</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {answers.map((item, index) => (
          <li
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '1rem',
              marginBottom: '1.2rem',
              backgroundColor: '#f9f9f9',
            }}
          >
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              👤 Χαρακτήρας: <span style={{ color: '#333' }}>{item.character}</span>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              ❓ <strong>Ερώτηση:</strong> {item.question}
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              💬 <strong>Απάντηση:</strong> {item.answer}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'right' }}>
              🕒 {item.created_at}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}