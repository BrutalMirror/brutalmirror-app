import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfbjeftjhcmhhabbocjm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // βάλε όλο το anon key σου

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAnswers() {
  const { data, error } = await supabase
    .from('questions')
    .select('character, question, answer, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('❌ Σφάλμα στο getAnswers:', error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at).toLocaleString('el-GR', {
      timeZone: 'Europe/Athens',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));
}