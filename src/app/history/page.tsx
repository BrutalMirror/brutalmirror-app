'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

type Question = {
  id: string
  character: string
  question: string
  answer: string
  created_at: string
}

const supabase = createClient(
  'https://tfbjefthjcmhhabbocjm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmYmplZnRqaGNtaGhhYmJvY2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNDEwMjUsImV4cCI6MjA2OTYxNzAyNX0.FPu69B0nrkdtzl22RoUCwbTzV8k8rNhg5MadenXYVz4'
)

export default function HistoryPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('DATA:', data)
      console.log('ERROR:', error)

      if (error) {
        setErrorMessage('⚠ Σφάλμα κατά την ανάκτηση δεδομένων.')
        console.error('Error fetching data:', error)
      } else if (!data || data.length === 0) {
        setErrorMessage('📭 Δεν βρέθηκαν ερωτήσεις.')
      } else {
        setQuestions(data)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p className="p-4">⏳ Φόρτωση...</p>

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ιστορικό Ερωτήσεων</h1>

      {errorMessage && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4">
          {errorMessage}
        </p>
      )}

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="border p-4 rounded shadow">
            <div className="text-sm text-gray-500">
              <strong>Χαρακτήρας:</strong> {q.character} |{' '}
              <strong>Ημερομηνία:</strong>{' '}
              {new Date(q.created_at).toLocaleString()}
            </div>
            <div className="mt-2">
              <p className="font-semibold">❓ {q.question}</p>
              <p className="mt-1">💬 {q.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}