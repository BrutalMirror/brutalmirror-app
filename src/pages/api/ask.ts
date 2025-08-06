import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { character, question } = req.body;

  if (!character || !question) {
    return res.status(400).json({ message: 'Λείπουν δεδομένα.' });
  }

  try {
    const n8nResponse = await fetch('https://brutalmirror.app.n8n.cloud/webhook/BrutalMirror', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ character, question }),
    });

    const data = await n8nResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Σφάλμα proxy:', error);
    return res.status(500).json({ message: 'Σφάλμα κατά την προώθηση στο n8n.' });
  }
}