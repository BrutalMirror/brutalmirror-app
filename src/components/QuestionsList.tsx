'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Χρησιμοποιούμε σχετικό path

type QuestionItem = {
  id: number;
  question: string;
  answer: string;
  character: string;
  created_at: string;
};

export default function QuestionsList() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching questions:', error.message);
      } else {
        setQuestions(data || []);
      }

      setLoading(false);
    }

    fetchQuestions();
  }, []);

  if (loading) return <p>⏳ Φορτώνει...</p>;

  return (
    <div>
      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <p><strong>🤔 Ερώτηση:</strong> {q.question}</p>
          <p><strong>💬 Απάντηση:</strong> {q.answer}</p>
          <p><strong>🎭 Χαρακτήρας:</strong> {q.character}</p>
          <p><em>{new Date(q.created_at).toLocaleString()}</em></p>
        </div>
      ))}
    </div>
  );
}