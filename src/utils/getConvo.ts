import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfbjeftjhcmhhabbocjm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmYmplZnRqaGNtaGhhYmJvY2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNDEwMjUsImV4cCI6MjA2OTYxNzAyNX0.FPu69B0nrkdtzl22RoUCwbTzV8k8rNhg5MadenXYVz4';

const supabase = createClient(supabaseUrl, supabaseKey);

export const getConvo = async (character: string) => {
  const { data, error } = await supabase
    .from('questions')
    .select('question, answer, created_at')
    .eq('character', character)
    .order('id', { ascending: true }); // ✅ μόνο id!

  if (error) {
    console.error('Error fetching convo:', error.message);
    return [];
  }

  return data;
};