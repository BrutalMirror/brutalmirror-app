'use client';

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

      <p style={{ marginTop: '2rem', fontStyle: 'italic', opacity: 0.6 }}>
        Stay tuned. Or don&apos;t. Δεν μας νοιάζει.
      </p>
    </main>
  );
}