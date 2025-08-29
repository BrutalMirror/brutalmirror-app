'use client';

import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: '4rem',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        backgroundColor: '#111',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        🤖 BrutalMirror
      </h1>

      <p style={{ fontSize: '1.2rem' }}>
        Η σελίδα ετοιμάζεται... <br />
        <span style={{ color: '#f00' }}>
          και θα πονέσει.{' '}
          <img
            src="/favicon.png"
            alt="BrutalMirror"
            style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
          />
        </span>
      </p>

      {/* κουμπί για το Chat (σε νέο tab) */}
      <div style={{ marginTop: '2rem' }}>
        <Link href="/chat" target="_blank" rel="noopener noreferrer">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f00',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            👉 Go to Chat
          </button>
        </Link>
      </div>

      <p style={{ marginTop: '2rem', fontStyle: 'italic', opacity: 0.6 }}>
        Stay tuned. Or don&apos;t. Δεν μας νοιάζει.
      </p>
    </main>
  );
}
