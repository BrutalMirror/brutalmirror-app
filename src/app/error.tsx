'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ padding: 40 }}>
      <h2>Κάτι πήγε στραβά.</h2>
      <button onClick={() => reset()}>Ξαναδοκίμασε</button>
    </div>
  )
}