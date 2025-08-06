'use client';

import { useState } from 'react';
import { sendQuestion } from '../utils/sendQuestion';

interface AskFormProps {
  selectedCharacter: string;
  onCharacterChange: (character: string) => void;
}

const characters = [
  { id: 'FunnyGuy', label: '🃏 Αστείος' },
  { id: 'GossipGirl', label: '🗣 Κουτσομπόλα' },
  { id: 'AngryMan', label: '😡 Νευρικός' },
  { id: 'ColdRealist', label: '🤖 Ψυχρός Ρεαλιστής' },
  { id: 'LoverGirl', label: '💋 Ερωτική' },
  { id: 'LazyDude', label: '😒 Τεμπέλης' },
  { id: 'IronicLady', label: '🧠 Ειρωνική' },
];

export default function AskForm({
  selectedCharacter,
  onCharacterChange,
}: AskFormProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);

    try {
      const response = await sendQuestion(selectedCharacter, question);
      setAnswer(response.message || '🤖 Δεν δόθηκε απάντηση.');
    } catch (error) {
      console.error('Σφάλμα:', error);
      setAnswer('⚠ Κάτι πήγε στραβά...');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Επιλογή χαρακτήρα:
        <select
          value={selectedCharacter}
          onChange={(e) => onCharacterChange(e.target.value)}
          className="block w-full p-2 border rounded"
        >
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Ερώτηση:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="block w-full p-2 border rounded"
          placeholder="Γράψε την ερώτησή σου..."
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Αποστολή...' : 'Αποστολή'}
      </button>

      {answer && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <strong>Απάντηση:</strong> {answer}
        </div>
      )}
    </form>
  );
}