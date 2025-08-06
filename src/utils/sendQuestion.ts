export async function sendQuestion(character: string, question: string): Promise<{ message: string }> {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      character,
      question,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to fetch:', errorText);
    throw new Error('Failed to fetch answer from BrutalMirror');
  }

  const data = await response.json();

  return {
    message: data.message || '🤖 Δεν δόθηκε απάντηση.',
  };
}