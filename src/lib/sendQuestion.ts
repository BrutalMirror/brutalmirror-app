export async function sendQuestion(question: string, character: string) {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, character }),
  });

  if (!response.ok) {
    throw new Error('Failed to send question');
  }

  return await response.json();
}