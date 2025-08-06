import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tfbjefthjcmhhabbocjm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmYmplZnRqaGNtaGhhYmJvY2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNDEwMjUsImV4cCI6MjA2OTYxNzAyNX0.FPu69B0nrkdtzl22RoUCwbTzV8k8rNhg5MadenXYVz4'
)

async function testFetch() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false })

  console.log('RESULT:', data)
  console.log('ERROR:', error)
}

testFetch()