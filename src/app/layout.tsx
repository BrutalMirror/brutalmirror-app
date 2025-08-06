import './globals.css';

export const metadata = {
  title: 'BrutalMirror 🤖 | Ρώτα, αλλά να αντέχεις...',
  description: 'Brutal honesty meets Supabase and Next.js. Το πιο ειλικρινές AI που γνώρισες ποτέ.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'BrutalMirror',
    description: 'Ρώτα. Θα πονέσει. Το πιο brutal AI που γνώρισες ποτέ.',
    url: 'https://brutalmirror.vercel.app',
    siteName: 'BrutalMirror',
    images: [
      {
        url: 'https://brutalmirror.vercel.app/favicon.png',
        width: 512,
        height: 512,
        alt: 'BrutalMirror Logo',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <head />
      <body>{children}</body>
    </html>
  );
}